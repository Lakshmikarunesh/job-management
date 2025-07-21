from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from sqlalchemy import create_engine, Column, Integer, String, Text, DateTime, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from pydantic import BaseModel
from datetime import datetime, date
from typing import List, Optional
import uvicorn

# Database setup
SQLALCHEMY_DATABASE_URL = "sqlite:///./jobs.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Database Models
class JobDB(Base):
    __tablename__ = "jobs"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    company_name = Column(String, index=True)
    location = Column(String, index=True)
    job_type = Column(String, index=True)
    salary_min = Column(Integer)
    salary_max = Column(Integer)
    experience = Column(String)
    work_mode = Column(String)  # Onsite, Remote, Hybrid
    description = Column(Text)
    application_deadline = Column(DateTime)
    created_at = Column(DateTime, default=datetime.utcnow)
    is_published = Column(Boolean, default=False)
    company_logo = Column(String, default="")

# Pydantic Models
class JobCreate(BaseModel):
    title: str
    company_name: str
    location: str
    job_type: str
    salary_min: int
    salary_max: int
    experience: str = "1-3 yr Exp"
    work_mode: str = "Onsite"
    description: str
    application_deadline: Optional[date] = None
    is_published: bool = True
    company_logo: str = ""

class JobResponse(BaseModel):
    id: int
    title: str
    company_name: str
    location: str
    job_type: str
    salary_min: int
    salary_max: int
    experience: str
    work_mode: str
    description: str
    application_deadline: Optional[datetime] = None
    created_at: datetime
    is_published: bool
    company_logo: str
    time_posted: str

    class Config:
        from_attributes = True

class JobFilter(BaseModel):
    search: Optional[str] = None
    location: Optional[str] = None
    job_type: Optional[str] = None
    salary_min: Optional[int] = None
    salary_max: Optional[int] = None

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Job Management API")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Helper function to calculate time posted
def get_time_posted(created_at: datetime) -> str:
    now = datetime.utcnow()
    diff = now - created_at
    
    if diff.days > 0:
        return f"{diff.days}d Ago"
    elif diff.seconds > 3600:
        hours = diff.seconds // 3600
        return f"{hours}h Ago"
    else:
        return "Just now"

# API Routes
@app.post("/jobs/", response_model=JobResponse)
async def create_job(job: JobCreate, db: Session = Depends(get_db)):
    # Set company logo based on company name
    company_logos = {
        "Amazon": "🅰️",
        "Tesla": "🏎️", 
        "Microsoft": "Ⓜ️",
        "Google": "🌟",
        "Apple": "🍎",
        "Meta": "📘",
        "Netflix": "🎬"
    }
    
    db_job = JobDB(
        **job.dict(),
        company_logo=company_logos.get(job.company_name, "🏢")
    )
    
    db.add(db_job)
    db.commit()
    db.refresh(db_job)
    
    job_response = JobResponse.from_orm(db_job)
    job_response.time_posted = get_time_posted(db_job.created_at)
    
    return job_response

@app.get("/jobs/", response_model=List[JobResponse])
async def get_jobs(
    search: Optional[str] = None,
    location: Optional[str] = None,
    job_type: Optional[str] = None,
    salary_min: Optional[int] = None,
    salary_max: Optional[int] = None,
    db: Session = Depends(get_db)
):
    query = db.query(JobDB).filter(JobDB.is_published == True)
    
    if search:
        query = query.filter(JobDB.title.contains(search))
    
    if location and location != "Preferred Location":
        query = query.filter(JobDB.location == location)
        
    if job_type and job_type != "Job type":
        query = query.filter(JobDB.job_type == job_type)
        
    if salary_min:
        query = query.filter(JobDB.salary_max >= salary_min * 1000)
        
    if salary_max:
        query = query.filter(JobDB.salary_min <= salary_max * 1000)
    
    jobs = query.order_by(JobDB.created_at.desc()).all()
    
    job_responses = []
    for job in jobs:
        job_response = JobResponse.from_orm(job)
        job_response.time_posted = get_time_posted(job.created_at)
        job_responses.append(job_response)
    
    return job_responses

@app.get("/jobs/{job_id}", response_model=JobResponse)
async def get_job(job_id: int, db: Session = Depends(get_db)):
    job = db.query(JobDB).filter(JobDB.id == job_id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    
    job_response = JobResponse.from_orm(job)
    job_response.time_posted = get_time_posted(job.created_at)
    
    return job_response

@app.put("/jobs/{job_id}", response_model=JobResponse)
async def update_job(job_id: int, job: JobCreate, db: Session = Depends(get_db)):
    db_job = db.query(JobDB).filter(JobDB.id == job_id).first()
    if not db_job:
        raise HTTPException(status_code=404, detail="Job not found")
    
    for field, value in job.dict().items():
        setattr(db_job, field, value)
    
    db.commit()
    db.refresh(db_job)
    
    job_response = JobResponse.from_orm(db_job)
    job_response.time_posted = get_time_posted(db_job.created_at)
    
    return job_response

@app.delete("/jobs/{job_id}")
async def delete_job(job_id: int, db: Session = Depends(get_db)):
    job = db.query(JobDB).filter(JobDB.id == job_id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    
    db.delete(job)
    db.commit()
    
    return {"message": "Job deleted successfully"}

@app.get("/locations/")
async def get_locations(db: Session = Depends(get_db)):
    locations = db.query(JobDB.location).distinct().all()
    return [loc[0] for loc in locations if loc[0]]

@app.get("/job-types/")
async def get_job_types(db: Session = Depends(get_db)):
    job_types = db.query(JobDB.job_type).distinct().all()
    return [jt[0] for jt in job_types if jt[0]]

# Seed some initial data
@app.on_event("startup")
async def startup_event():
    db = SessionLocal()
    
    # Check if we already have data
    existing_jobs = db.query(JobDB).first()
    if existing_jobs:
        db.close()
        return
        
    # Seed data
    sample_jobs = [
        {
            "title": "Full Stack Developer",
            "company_name": "Amazon",
            "location": "Bangalore",
            "job_type": "Full-time",
            "salary_min": 800000,
            "salary_max": 1200000,
            "experience": "1-3 yr Exp",
            "work_mode": "Onsite",
            "description": "A user-friendly interface lets you browse stunning photos and videos. Filter destinations based on interests and travel style, and create personalized",
            "is_published": True,
            "company_logo": "🅰️"
        },
        {
            "title": "Node Js Developer",
            "company_name": "Tesla",
            "location": "Mumbai",
            "job_type": "Full-time",
            "salary_min": 1000000,
            "salary_max": 1500000,
            "experience": "1-3 yr Exp",
            "work_mode": "Onsite",
            "description": "A user-friendly interface lets you browse stunning photos and videos. Filter destinations based on interests and travel style, and create personalized",
            "is_published": True,
            "company_logo": "🏎️"
        },
        {
            "title": "UX/UI Designer",
            "company_name": "Google",
            "location": "Delhi",
            "job_type": "Full-time",
            "salary_min": 600000,
            "salary_max": 1000000,
            "experience": "1-3 yr Exp",
            "work_mode": "Onsite",
            "description": "A user-friendly interface lets you browse stunning photos and videos. Filter destinations based on interests and travel style, and create personalized",
            "is_published": True,
            "company_logo": "🌟"
        },
        {
            "title": "Full Stack Developer",
            "company_name": "Microsoft",
            "location": "Hyderabad",
            "job_type": "Full-time",
            "salary_min": 900000,
            "salary_max": 1300000,
            "experience": "1-3 yr Exp",
            "work_mode": "Onsite",
            "description": "A user-friendly interface lets you browse stunning photos and videos. Filter destinations based on interests and travel style, and create personalized",
            "is_published": True,
            "company_logo": "Ⓜ️"
        },
        {
            "title": "UX/UI Designer",
            "company_name": "Apple",
            "location": "Pune",
            "job_type": "Full-time",
            "salary_min": 700000,
            "salary_max": 1100000,
            "experience": "1-3 yr Exp",
            "work_mode": "Onsite",
            "description": "A user-friendly interface lets you browse stunning photos and videos. Filter destinations based on interests and travel style, and create personalized",
            "is_published": True,
            "company_logo": "🍎"
        },
        {
            "title": "Node Js Developer",
            "company_name": "Meta",
            "location": "Bangalore",
            "job_type": "Full-time",
            "salary_min": 1100000,
            "salary_max": 1600000,
            "experience": "1-3 yr Exp",
            "work_mode": "Onsite",
            "description": "A user-friendly interface lets you browse stunning photos and videos. Filter destinations based on interests and travel style, and create personalized",
            "is_published": True,
            "company_logo": "📘"
        },
        {
            "title": "Full Stack Developer",
            "company_name": "Netflix",
            "location": "Mumbai",
            "job_type": "Full-time",
            "salary_min": 950000,
            "salary_max": 1400000,
            "experience": "1-3 yr Exp",
            "work_mode": "Onsite",
            "description": "A user-friendly interface lets you browse stunning photos and videos. Filter destinations based on interests and travel style, and create personalized",
            "is_published": True,
            "company_logo": "🎬"
        },
        {
            "title": "UX/UI Designer",
            "company_name": "Swiggy",
            "location": "Delhi",
            "job_type": "Full-time",
            "salary_min": 650000,
            "salary_max": 950000,
            "experience": "1-3 yr Exp",
            "work_mode": "Onsite",
            "description": "A user-friendly interface lets you browse stunning photos and videos. Filter destinations based on interests and travel style, and create personalized",
            "is_published": True,
            "company_logo": "🍔"
        }
    ]
    
    for job_data in sample_jobs:
        db_job = JobDB(**job_data)
        db.add(db_job)
    
    db.commit()
    db.close()

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
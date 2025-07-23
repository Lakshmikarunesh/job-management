import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import JobGrid from './components/JobGrid';
import CreateJobModal from './components/CreateJobModal';
import { Job } from './types/job';

// Mock data to display initially
const mockJobs: Job[] = [
  {
    id: 1,
    title: "Full Stack Developer",
    company_name: "Amazon",
    location: "Bangalore",
    job_type: "Full-time",
    salary_min: 800000,
    salary_max: 1200000,
    experience: "1-3 yr Exp",
    work_mode: "Onsite",
    description: "A user-friendly interface lets you browse stunning photos and videos. Filter destinations based on interests and travel style, and create personalized",
    created_at: "2024-01-20T10:00:00Z",
    is_published: true,
    company_logo: "https://res.cloudinary.com/dmip7daqc/image/upload/v1753261737/Amazon-logo-meaning_jddazp.jpg",
    time_posted: "24h Ago"
  },
  {
    id: 2,
    title: "Node Js Developer",
    company_name: "Tesla",
    location: "Mumbai",
    job_type: "Full-time",
    salary_min: 1000000,
    salary_max: 1500000,
    experience: "1-3 yr Exp",
    work_mode: "Onsite",
    description: "A user-friendly interface lets you browse stunning photos and videos. Filter destinations based on interests and travel style, and create personalized",
    created_at: "2024-01-20T10:00:00Z",
    is_published: true,
    company_logo: "https://res.cloudinary.com/dmip7daqc/image/upload/v1753261737/images_2_piylmf.png",
    time_posted: "24h Ago"
  },
  {
    id: 3,
    title: "UX/UI Designer",
    company_name: "Swiggy",
    location: "Delhi",
    job_type: "Full-time",
    salary_min: 600000,
    salary_max: 1000000,
    experience: "1-3 yr Exp",
    work_mode: "Onsite",
    description: "A user-friendly interface lets you browse stunning photos and videos. Filter destinations based on interests and travel style, and create personalized",
    created_at: "2024-01-20T10:00:00Z",
    is_published: true,
    company_logo: "https://res.cloudinary.com/dmip7daqc/image/upload/v1753261738/Swiggy_logo_cgi4un.png",
    time_posted: "24h Ago"
  },
  {
    id: 4,
    title: "Full Stack Developer",
    company_name: "Amazon",
    location: "Hyderabad",
    job_type: "Full-time",
    salary_min: 900000,
    salary_max: 1300000,
    experience: "1-3 yr Exp",
    work_mode: "Onsite",
    description: "A user-friendly interface lets you browse stunning photos and videos. Filter destinations based on interests and travel style, and create personalized",
    created_at: "2024-01-20T10:00:00Z",
    is_published: true,
    company_logo: "https://res.cloudinary.com/dmip7daqc/image/upload/v1753261737/Amazon-logo-meaning_jddazp.jpg",
    time_posted: "24h Ago"
  },
  {
    id: 5,
    title: "Node Js Developer",
    company_name: "Tesla",
    location: "Bangalore",
    job_type: "Full-time",
    salary_min: 1100000,
    salary_max: 1600000,
    experience: "1-3 yr Exp",
    work_mode: "Onsite",
    description: "A user-friendly interface lets you browse stunning photos and videos. Filter destinations based on interests and travel style, and create personalized",
    created_at: "2024-01-20T10:00:00Z",
    is_published: true,
    company_logo: "https://res.cloudinary.com/dmip7daqc/image/upload/v1753261737/images_2_piylmf.png",
    time_posted: "24h Ago"
  },
  {
    id: 6,
    title: "UX/UI Designer",
    company_name: "Swiggy",
    location: "Pune",
    job_type: "Full-time",
    salary_min: 700000,
    salary_max: 1100000,
    experience: "1-3 yr Exp",
    work_mode: "Onsite",
    description: "A user-friendly interface lets you browse stunning photos and videos. Filter destinations based on interests and travel style, and create personalized",
    created_at: "2024-01-20T10:00:00Z",
    is_published: true,
    company_logo: "https://res.cloudinary.com/dmip7daqc/image/upload/v1753261738/Swiggy_logo_cgi4un.png",
    time_posted: "24h Ago"
  },
  {
    id: 7,
    title: "Full Stack Developer",
    company_name: "Amazon",
    location: "Mumbai",
    job_type: "Full-time",
    salary_min: 950000,
    salary_max: 1400000,
    experience: "1-3 yr Exp",
    work_mode: "Onsite",
    description: "A user-friendly interface lets you browse stunning photos and videos. Filter destinations based on interests and travel style, and create personalized",
    created_at: "2024-01-20T10:00:00Z",
    is_published: true,
    company_logo: "https://res.cloudinary.com/dmip7daqc/image/upload/v1753261737/Amazon-logo-meaning_jddazp.jpg",
    time_posted: "24h Ago"
  },
  {
    id: 8,
    title: "Node Js Developer",
    company_name: "Tesla",
    location: "Delhi",
    job_type: "Full-time",
    salary_min: 650000,
    salary_max: 950000,
    experience: "1-3 yr Exp",
    work_mode: "Onsite",
    description: "A user-friendly interface lets you browse stunning photos and videos. Filter destinations based on interests and travel style, and create personalized",
    created_at: "2024-01-20T10:00:00Z",
    is_published: true,
    company_logo: "https://res.cloudinary.com/dmip7daqc/image/upload/v1753261737/images_2_piylmf.png",
    time_posted: "24h Ago"
  }
];
function App() {
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(mockJobs);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('Preferred Location');
  const [selectedJobType, setSelectedJobType] = useState('Job type');
  const [salaryRange, setSalaryRange] = useState([5, 80]);
  const [locations, setLocations] = useState<string[]>(['Bangalore', 'Mumbai', 'Delhi', 'Pune', 'Hyderabad']);
  const [jobTypes, setJobTypes] = useState<string[]>(['Full-time', 'Part-time', 'Contract', 'Freelance']);

  // Fetch jobs from API
  const fetchJobs = async () => {
    try {
      const response = await fetch('http://localhost:8000/jobs/');
      if (response.ok) {
        const data = await response.json();
        setJobs(data);
        setFilteredJobs(data);
      } else {
        // If API fails, keep using mock data
        console.log('API not available, using mock data');
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
      // Keep using mock data if API fails
    }
  };

  // Fetch filter options
  const fetchFilterOptions = async () => {
    try {
      const [locationsRes, jobTypesRes] = await Promise.all([
        fetch('http://localhost:8000/locations/'),
        fetch('http://localhost:8000/job-types/')
      ]);
      
      if (locationsRes.ok) {
        const locationsData = await locationsRes.json();
        if (locationsData.length > 0) {
          setLocations(locationsData);
        }
      }
      
      if (jobTypesRes.ok) {
        const jobTypesData = await jobTypesRes.json();
        if (jobTypesData.length > 0) {
          setJobTypes(jobTypesData);
        }
      }
    } catch (error) {
      console.error('Error fetching filter options:', error);
      // Keep using default options if API fails
    }
  };

  useEffect(() => {
    fetchJobs();
    fetchFilterOptions();
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = jobs;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Location filter
    if (selectedLocation && selectedLocation !== 'Preferred Location') {
      filtered = filtered.filter(job => job.location === selectedLocation);
    }

    // Job type filter
    if (selectedJobType && selectedJobType !== 'Job type') {
      filtered = filtered.filter(job => job.job_type === selectedJobType);
    }

    // Salary range filter
    filtered = filtered.filter(job => {
      const jobSalaryMax = job.salary_max / 10000; // Convert to 10k units
      const jobSalaryMin = job.salary_min / 10000; // Convert to 10k units
      return jobSalaryMax >= salaryRange[0] && jobSalaryMin <= salaryRange[1];
    });

    setFilteredJobs(filtered);
  }, [jobs, searchTerm, selectedLocation, selectedJobType, salaryRange]);

  const handleCreateJob = async (jobData: any) => {
    try {
      const response = await fetch('http://localhost:8000/jobs/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...jobData,
          salary_min: parseInt(jobData.salary_min) * 100000, // Convert to rupees
          salary_max: parseInt(jobData.salary_max) * 100000, // Convert to rupees
        }),
      });

      if (response.ok) {
        setIsCreateModalOpen(false);
        fetchJobs(); // Refresh jobs list
      }
    } catch (error) {
      console.error('Error creating job:', error);
    }
  };

  const handleApply = (jobId: number) => {
    // Handle job application logic
    console.log('Applied to job:', jobId);
    alert('Application submitted successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onCreateJob={() => setIsCreateModalOpen(true)}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedLocation={selectedLocation}
        onLocationChange={setSelectedLocation}
        selectedJobType={selectedJobType}
        onJobTypeChange={setSelectedJobType}
        salaryRange={salaryRange}
        onSalaryRangeChange={setSalaryRange}
        locations={locations}
        jobTypes={jobTypes}
      />
      
      <main className="container mx-auto px-4 py-8">
        <JobGrid jobs={filteredJobs} onApply={handleApply} />
      </main>
       <main className="container mx-auto px-4 py-8">
        <JobGrid jobs={filteredJobs} onApply={handleApply} />
      </main>

      {isCreateModalOpen && (
        <CreateJobModal
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleCreateJob}
          locations={locations}
          jobTypes={jobTypes}
        />
      )}
    </div>
  );
}

export default App;
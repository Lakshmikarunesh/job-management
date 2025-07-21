export interface Job {
  id: number;
  title: string;
  company_name: string;
  location: string;
  job_type: string;
  salary_min: number;
  salary_max: number;
  experience: string;
  work_mode: string;
  description: string;
  application_deadline?: string;
  created_at: string;
  is_published: boolean;
  company_logo: string;
  time_posted: string;
}

export interface JobCreate {
  title: string;
  company_name: string;
  location: string;
  job_type: string;
  salary_min: string;
  salary_max: string;
  description: string;
  application_deadline?: string;
  is_published: boolean;
}
import React from 'react';
import JobCard from './JobCard';
import { Job } from '../types/job';

interface JobGridProps {
  jobs: Job[];
  onApply: (jobId: number) => void;
}

const JobGrid: React.FC<JobGridProps> = ({ jobs, onApply }) => {
  if (jobs.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-lg">No jobs found matching your criteria</div>
        <div className="text-gray-500 mt-2">Try adjusting your search filters</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} onApply={() => onApply(job.id)} />
      ))}
    </div>
  );
};

export default JobGrid;
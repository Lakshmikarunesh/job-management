import React from 'react';
import { MapPin, Clock, Users, Banknote } from 'lucide-react';
import { Job } from '../types/job';

interface JobCardProps {
  job: Job;
  onApply: () => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onApply }) => {
  const formatSalary = (min: number, max: number) => {
    const avgSalary = ((min + max) / 2 / 100000).toFixed(0);
    return `${avgSalary}LPA`;
  };

  const getCompanyIcon = (companyName: string, logo: string) => {
    return (
      <img 
        src={logo || "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=48&h=48&fit=crop"} 
        alt={`${companyName} logo`}
        className="w-12 h-12 rounded-full object-cover"
      />
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6 border border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          {getCompanyIcon(job.company_name, job.company_logo)}
        </div>
        <div className="bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded-full font-medium">
          {job.time_posted}
        </div>
      </div>

      {/* Job Title */}
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{job.title}</h3>

      {/* Job Details */}
      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
        <div className="flex items-center space-x-1">
          <Users className="w-4 h-4" />
          <span>{job.experience}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Clock className="w-4 h-4" />
          <span>{job.work_mode}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Banknote className="w-4 h-4" />
          <span>{formatSalary(job.salary_min, job.salary_max)}</span>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 mb-4 line-clamp-3">
        {job.description}
      </p>

      {/* Apply Button */}
      <button
        onClick={onApply}
        className="w-full bg-blue-500 text-white py-2.5 px-4 rounded-lg font-medium hover:bg-blue-600 transition-colors duration-200"
      >
        Apply Now
      </button>
    </div>
  );
};

export default JobCard;
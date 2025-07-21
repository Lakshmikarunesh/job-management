import React from 'react';
import { MapPin, Clock, Users, DollarSign } from 'lucide-react';
import { Job } from '../types/job';

interface JobCardProps {
  job: Job;
  onApply: () => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onApply }) => {
  const formatSalary = (min: number, max: number) => {
    const minLakhs = (min / 100000).toFixed(1);
    const maxLakhs = (max / 100000).toFixed(1);
    return `${minLakhs}LPA - ${maxLakhs}LPA`;
  };

  const getCompanyIcon = (companyName: string, logo: string) => {
    const iconMap: { [key: string]: string } = {
      'Amazon': 'bg-orange-500',
      'Tesla': 'bg-red-500',
      'Google': 'bg-blue-500',
      'Microsoft': 'bg-blue-600',
      'Apple': 'bg-gray-800',
      'Meta': 'bg-blue-700',
      'Netflix': 'bg-red-600',
      'Swiggy': 'bg-orange-400'
    };

    return (
      <div className={`w-12 h-12 rounded-full ${iconMap[companyName] || 'bg-gray-600'} flex items-center justify-center text-white text-xl font-bold`}>
        {logo || companyName.charAt(0)}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6 border border-gray-100">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          {getCompanyIcon(job.company_name, job.company_logo)}
          <div className="bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded-full font-medium">
            {job.time_posted}
          </div>
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
          <MapPin className="w-4 h-4" />
          <span>{job.work_mode}</span>
        </div>
        <div className="flex items-center space-x-1">
          <DollarSign className="w-4 h-4" />
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
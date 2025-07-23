import React from 'react';
import { Search, MapPin, Briefcase } from 'lucide-react';

interface HeaderProps {
  onCreateJob: () => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedLocation: string;
  onLocationChange: (location: string) => void;
  selectedJobType: string;
  onJobTypeChange: (type: string) => void;
  salaryRange: number[];
  onSalaryRangeChange: (range: number[]) => void;
  locations: string[];
  jobTypes: string[];
}

const Header: React.FC<HeaderProps> = ({
  onCreateJob,
  searchTerm,
  onSearchChange,
  selectedLocation,
  onLocationChange,
  selectedJobType,
  onJobTypeChange,
  salaryRange,
  onSalaryRangeChange,
  locations,
  jobTypes
}) => {
  const handleSalaryChange = (index: number, value: number) => {
    const newRange = [...salaryRange];
    newRange[index] = value;
    onSalaryRangeChange(newRange);
  };

  return (
    <div className="bg-gray-50 py-6">
      {/* Navigation */}
      <div className="container mx-auto px-4 mb-8">
        <div className="bg-white rounded-full shadow-sm px-8 py-4 flex items-center justify-between max-w-5xl mx-auto">
          <div className="flex items-center space-x-2">
            <img
              src="https://res.cloudinary.com/dmip7daqc/image/upload/v1753261738/Clip_path_group_vibbgx.png"
              alt="Company Logo"
              className="w-8 h-8 rounded-lg object-cover"
            />
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="px-5 py-2 text-black font-medium rounded-full transition-all duration-200 ease-in-out hover:shadow-lg hover:translate-y-1 hover:translate-x-1">Home</a>
            <a href="#" className="px-5 py-2 text-black font-medium rounded-full transition-all duration-200 ease-in-out hover:shadow-lg hover:translate-y-1 hover:translate-x-1">Find Jobs</a>
            <a href="#" className="px-5 py-2 text-black font-medium rounded-full transition-all duration-200 ease-in-out hover:shadow-lg hover:translate-y-1 hover:translate-x-1">Find Talents</a>
            <a href="#" className="px-5 py-2 text-black font-medium rounded-full transition-all duration-200 ease-in-out hover:shadow-lg hover:translate-y-1 hover:translate-x-1">About us</a>
            <a href="#" className="px-5 py-2 text-black font-medium rounded-full transition-all duration-200 ease-in-out hover:shadow-lg hover:translate-y-1 hover:translate-x-1">Testimonials</a>
          </div>

        <button
  onClick={onCreateJob}
  className="relative group bg-purple-600 text-white px-6 py-2.5 rounded-full font-medium text-sm overflow-hidden h-10 w-32 flex items-center justify-center"
>
  {/* Create Jobs - default text */}
  <span className="absolute transition-transform duration-300 group-hover:-translate-y-10">
    Create Jobs
  </span>

  {/* Login - hover text */}
  <span className="absolute transition-transform duration-300 translate-y-10 group-hover:translate-y-0">
    Login
  </span>
</button>

        </div>
      </div>

      {/* Search and Filters */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 max-w-6xl mx-auto">
          {/* Search Input */}
          <div className="relative h-14">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search By Job Title, Role"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full h-full pl-12 pr-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white text-sm placeholder-gray-500"
            />
          </div>

          {/* Location Dropdown */}
          <div className="relative h-14">
            <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <svg className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
            <select
              value={selectedLocation}
              onChange={(e) => onLocationChange(e.target.value)}
              className="w-full h-full pl-12 pr-12 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white text-sm text-gray-700"
            >
              <option value="Preferred Location">Preferred Location</option>
              {locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>

          {/* Job Type Dropdown */}
          <div className="relative h-14">
            <Briefcase className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <svg className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
            <select
              value={selectedJobType}
              onChange={(e) => onJobTypeChange(e.target.value)}
              className="w-full h-full pl-12 pr-12 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white text-sm text-gray-700"
            >
              <option value="Job type">Job type</option>
              {jobTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Salary Range */}
          <div className="bg-white border border-gray-200 rounded-lg px-4 py-2 h-14 flex flex-col justify-center">
            <div className="flex items-center justify-between text-sm font-medium text-gray-700 mb-1">
              <span>Salary Per Month</span>
              <span className="text-gray-600 font-normal">
                ₹{salaryRange[0] * 10}k - ₹{salaryRange[1] * 10}k
              </span>
            </div>

            <div className="relative h-3">
              {/* Track background */}
              <div className="absolute top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-200 rounded" />

              {/* Active track */}
              <div
                className="absolute top-1/2 transform -translate-y-1/2 h-1 bg-black rounded"
                style={{
                  left: `${(salaryRange[0] - 5) / (80 - 5) * 100}%`,
                  width: `${(salaryRange[1] - salaryRange[0]) / (80 - 5) * 100}%`,
                }}
              />

              {/* Range inputs */}
              <input
                type="range"
                min="5"
                max="80"
                value={salaryRange[0]}
                onChange={(e) => handleSalaryChange(0, parseInt(e.target.value))}
                className="slider-thumb absolute top-0 w-full h-3 bg-transparent appearance-none"
              />
              <input
                type="range"
                min="5"
                max="80"
                value={salaryRange[1]}
                onChange={(e) => handleSalaryChange(1, parseInt(e.target.value))}
                className="slider-thumb absolute top-0 w-full h-3 bg-transparent appearance-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

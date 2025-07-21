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
              src="/public/Clip_path_group.png" 
              alt="Company Logo" 
              className="w-8 h-8 rounded-lg object-cover"
            />
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-purple-600 font-medium text-sm">Home</a>
            <a href="#" className="text-gray-700 hover:text-purple-600 font-medium text-sm">Find Jobs</a>
            <a href="#" className="text-gray-700 hover:text-purple-600 font-medium text-sm">Find Talents</a>
            <a href="#" className="text-gray-700 hover:text-purple-600 font-medium text-sm">About us</a>
            <a href="#" className="text-gray-700 hover:text-purple-600 font-medium text-sm">Testimonials</a>
          </div>
          
          <button
            onClick={onCreateJob}
            className="bg-purple-600 text-white px-6 py-2.5 rounded-full font-medium hover:bg-purple-700 transition-colors text-sm"
          >
            Create Jobs
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-4 max-w-6xl mx-auto">
          {/* Search Input */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search By Job Title, Role"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white text-sm placeholder-gray-500"
            />
          </div>

          {/* Location Dropdown */}
          <div className="relative min-w-[200px]">
            <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <svg className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
            <select
              value={selectedLocation}
              onChange={(e) => onLocationChange(e.target.value)}
              className="w-full pl-12 pr-12 py-3.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white text-sm text-gray-700"
            >
              <option value="Preferred Location">Preferred Location</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Delhi">Delhi</option>
              <option value="Pune">Pune</option>
              <option value="Hyderabad">Hyderabad</option>
              {locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>

          {/* Job Type Dropdown */}
          <div className="relative min-w-[150px]">
            <Briefcase className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <svg className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
            <select
              value={selectedJobType}
              onChange={(e) => onJobTypeChange(e.target.value)}
              className="w-full pl-12 pr-12 py-3.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white text-sm text-gray-700"
            >
              <option value="Job type">Job type</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Freelance">Freelance</option>
              {jobTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Salary Range */}
          <div className="min-w-[300px]">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-700">Salary Per Month</span>
                <span className="text-sm text-gray-600">₹{salaryRange[0] * 10}k - ₹{salaryRange[1] * 10}k</span>
              </div>
              <div className="relative">
                <div className="relative">
                  <div className="relative">
                    {/* Track background */}
                    <div className="h-1 bg-gray-200 rounded-lg"></div>
                    {/* Active track */}
                    <div 
                      className="absolute top-0 h-1 bg-black rounded-lg"
                      style={{
                        left: `${(salaryRange[0] - 5) / (80 - 5) * 100}%`,
                        width: `${(salaryRange[1] - salaryRange[0]) / (80 - 5) * 100}%`
                      }}
                    ></div>
                    {/* Min range slider */}
                    <input
                      type="range"
                      min="5"
                      max="80"
                      value={salaryRange[0]}
                      onChange={(e) => handleSalaryChange(0, parseInt(e.target.value))}
                      className="absolute top-0 w-full h-1 bg-transparent rounded-lg appearance-none cursor-pointer slider-thumb"
                    />
                    {/* Max range slider */}
                    <input
                      type="range"
                      min="5"
                      max="80"
                      value={salaryRange[1]}
                      onChange={(e) => handleSalaryChange(1, parseInt(e.target.value))}
                      className="absolute top-0 w-full h-1 bg-transparent rounded-lg appearance-none cursor-pointer slider-thumb"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
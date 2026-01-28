import React from 'react';
import { Job } from '../types';
import { MapPin, Building2, Banknote, Clock } from 'lucide-react';

interface JobCardProps {
  job: Job;
  onApply?: (job: Job) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onApply }) => {
  return (
    <div className={`bg-white rounded-3xl p-6 transition-all duration-300 hover:shadow-hover border border-transparent hover:border-gray-100 group relative overflow-hidden flex flex-col h-full ${job.isFeatured ? 'shadow-lg ring-1 ring-secondary/20' : 'shadow-soft'}`}>
      
      {job.isFeatured && (
          <div className="absolute top-0 right-0 bg-secondary text-white text-[10px] font-bold px-3 py-1 rounded-bl-2xl uppercase tracking-wider">
              Featured
          </div>
      )}

      <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
               <span className="bg-primary/5 text-primary text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wide border border-primary/10">
                {job.type}
              </span>
              <span className="text-xs text-gray-400 font-medium">
                  {job.category}
              </span>
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors mb-1 line-clamp-2">{job.title}</h3>
          
          <div className="flex items-center text-gray-600 mb-5">
            <Building2 size={16} className="mr-2 text-gray-400" />
            <span className="font-medium truncate">{job.companyName}</span>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-6">
             <div className="flex items-center bg-gray-50 px-3 py-1.5 rounded-lg">
                <MapPin size={14} className="mr-2 text-gray-400" />
                {job.location}
             </div>
             <div className="flex items-center bg-gray-50 px-3 py-1.5 rounded-lg text-gray-700 font-semibold">
                <Banknote size={14} className="mr-2 text-primary" />
                {job.salaryRange}
             </div>
          </div>
      </div>

      <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-50">
           <div className="flex items-center text-xs text-gray-400">
                <Clock size={12} className="mr-1.5" />
                {job.postedDate}
             </div>
           <button 
            onClick={() => onApply && onApply(job)}
            className="bg-gray-900 hover:bg-primary text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95"
           >
             Apply Now
           </button>
      </div>
    </div>
  );
};

export default JobCard;
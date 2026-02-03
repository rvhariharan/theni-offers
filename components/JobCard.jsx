import React from 'react';
import { MapPin, Building2, Banknote, Clock } from 'lucide-react';

const JobCard = ({ job, onApply }) => {
    return (
        <div className={`bg-white rounded-3xl p-6 transition-all duration-300 hover:shadow-hover border border-transparent hover:border-gray-100 group relative overflow-hidden flex flex-col h-full ${job.isFeatured ? 'shadow-lg ring-1 ring-secondary/20' : 'shadow-soft'}`}>

            {job.isFeatured && (
                <div className="absolute top-0 right-0 bg-secondary text-white text-[10px] uppercase font-bold px-3 py-1 rounded-bl-xl shadow-sm z-10">
                    Featured
                </div>
            )}

            <div className="mb-4">
                <div className="flex justify-between items-start mb-2">
                    <span className="inline-block px-2.5 py-1 rounded-lg text-[10px] font-bold bg-gray-100 text-gray-600 uppercase tracking-wide">
                        {job.type}
                    </span>
                    <span className="text-[10px] font-bold text-gray-400">
                        {new Date(job.postedDate).toLocaleDateString()}
                    </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 leading-tight mb-1 group-hover:text-primary transition-colors">{job.title}</h3>
                <p className="text-sm font-semibold text-secondary flex items-center gap-1">
                    <Building2 size={12} /> {job.companyName}
                </p>
            </div>

            <div className="space-y-3 mb-6 flex-1">
                <div className="flex items-center gap-3 bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                    <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-green-600 shadow-sm">
                        <Banknote size={16} />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase">Salary</p>
                        <p className="text-xs font-bold text-gray-900">{job.salaryRange}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3 bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                    <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-blue-600 shadow-sm">
                        <MapPin size={16} />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase">Location</p>
                        <p className="text-xs font-bold text-gray-900">{job.location}</p>
                    </div>
                </div>
            </div>

            <button
                onClick={() => onApply && onApply(job)}
                className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-secondary transition-colors shadow-lg shadow-primary/20 hover:shadow-secondary/30 active:scale-95"
            >
                View Details & Apply
            </button>
        </div>
    );
};

export default JobCard;

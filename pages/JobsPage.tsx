import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api } from '../services/api';
import { Job, FilterState } from '../types';
import JobCard from '../components/JobCard';
import JobModal from '../components/JobModal';
import CategoryFilter from '../components/CategoryFilter';
import { AREAS } from '../services/mockData';
import { Search, MapPin, Briefcase, Sparkles, RotateCcw, ChevronRight } from 'lucide-react';

const JobsPage: React.FC = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);

    const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
    const [tempLocation, setTempLocation] = useState(searchParams.get('location') || '');

    const filters: FilterState = {
        location: searchParams.get('location') || '',
        type: searchParams.get('type') || '',
        search: searchParams.get('search') || '',
        category: searchParams.get('category') || '',
        subCategory: searchParams.get('subCategory') || ''
    };

    useEffect(() => {
        setSearchTerm(searchParams.get('search') || '');
        setTempLocation(searchParams.get('location') || '');
    }, [searchParams]);

    useEffect(() => {
        const fetchJobs = async () => {
            setLoading(true);
            const data = await api.getJobs(filters);
            setJobs(data);
            setLoading(false);
        };
        fetchJobs();
    }, [searchParams]);

    const updateFilter = (key: keyof FilterState, value: string) => {
        const newParams = new URLSearchParams(searchParams);
        if (value && value !== 'All') newParams.set(key, value);
        else newParams.delete(key);

        if (key === 'category') newParams.delete('subCategory');
        setSearchParams(newParams);
    };

    const handleMainSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const newParams = new URLSearchParams(searchParams);
        if (searchTerm.trim()) newParams.set('search', searchTerm.trim());
        else newParams.delete('search');

        if (tempLocation) newParams.set('location', tempLocation);
        else newParams.delete('location');

        setSearchParams(newParams);
    };

    const clearAllFilters = () => {
        setSearchParams(new URLSearchParams());
        setSearchTerm('');
        setTempLocation('');
    };

    return (
        <div className="min-h-screen bg-slate-50 pb-12">
            {/* Hero Section */}
            <div className="bg-white border-b border-slate-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
                    <div className="max-w-3xl mx-auto text-center mb-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider mb-6">
                            <Sparkles size={14} className="text-secondary" />
                            <span>#1 Job Board in Theni</span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4 leading-tight">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-teal-600 to-secondary">Find the perfect job</span> <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-teal-600 to-secondary">in your neighborhood</span>
                        </h1>
                        <p className="text-lg text-slate-500 font-medium">Connecting local talent with the best opportunities in Theni.</p>
                    </div>

                    {/* Search Bar */}
                    <form onSubmit={handleMainSearch} className="max-w-4xl mx-auto">
                        {/* Mobile Layout: Modern & Glassmorphic */}
                        <div className="md:hidden bg-white p-3 rounded-[2rem] shadow-xl shadow-slate-200/50 flex flex-col gap-2 animate-slideUp">
                            {/* Search Query */}
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Search className="text-slate-400 group-focus-within:text-primary transition-colors" size={22} />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Job title, skills, or company..."
                                    className="w-full pl-12 pr-4 py-3.5 bg-transparent border-none outline-none focus:outline-none focus:ring-0 focus:border-transparent focus:shadow-none ring-0 rounded-xl text-slate-900 font-semibold placeholder:text-slate-400 caret-primary appearance-none text-base"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className="h-px bg-slate-100 mx-2"></div>
                            {/* Location */}
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <MapPin className="text-slate-400 group-focus-within:text-secondary transition-colors" size={22} />
                                </div>
                                <select
                                    className="w-full pl-12 pr-10 py-3.5 bg-transparent border-none outline-none focus:outline-none focus:ring-0 focus:border-transparent ring-0 rounded-xl text-slate-900 font-bold appearance-none text-base"
                                    value={tempLocation}
                                    onChange={(e) => setTempLocation(e.target.value)}
                                >
                                    <option value="">Select Location</option>
                                    {AREAS.map(area => (
                                        <option key={area} value={area}>{area}</option>
                                    ))}
                                </select>
                                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                                    <ChevronRight className="text-slate-400 rotate-90" size={16} />
                                </div>
                            </div>

                            {/* Search Button - Full Width for Mobile */}
                            <button
                                type="submit"
                                className="w-full py-4 mt-1 bg-primary hover:bg-primary/90 text-white rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-primary/25 active:scale-[0.98] transition-all font-bold text-lg"
                            >
                                <Search size={20} />
                                Search Jobs
                            </button>
                        </div>

                        {/* Desktop Layout: Horizontal Bar */}
                        <div className="hidden md:flex bg-white p-2 rounded-[2rem] shadow-hover flex-row gap-2 transform transition-all hover:scale-[1.01]">
                            <div className="flex-1 flex items-center px-6 h-14 bg-transparent rounded-[1.5rem] group focus-within:bg-slate-50 transition-colors">
                                <Search className="text-slate-400 mr-3 group-focus-within:text-primary transition-colors flex-shrink-0" />
                                <input
                                    type="text"
                                    placeholder="Job title, skills, or company..."
                                    className="bg-transparent border-none focus:ring-0 focus:outline-none focus:border-transparent outline-none ring-0 w-full text-slate-900 font-bold placeholder:text-slate-400 text-lg caret-primary appearance-none"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className="w-px bg-slate-200 my-2"></div>
                            <div className="flex-1 flex items-center px-6 h-14 bg-transparent rounded-[1.5rem] group focus-within:bg-slate-50 transition-colors">
                                <MapPin className="text-slate-400 mr-3 group-focus-within:text-primary transition-colors flex-shrink-0" />
                                <select
                                    className="bg-transparent border-none focus:ring-0 focus:outline-none focus:border-transparent outline-none ring-0 w-full text-slate-900 font-bold cursor-pointer text-lg appearance-none"
                                    value={tempLocation}
                                    onChange={(e) => setTempLocation(e.target.value)}
                                >
                                    <option value="">All Locations</option>
                                    {AREAS.map(area => (
                                        <option key={area} value={area}>{area}</option>
                                    ))}
                                </select>
                            </div>
                            <button type="submit" className="bg-primary hover:bg-primary/90 text-white px-8 h-14 rounded-[1.5rem] font-bold text-lg transition-all shadow-lg hover:shadow-primary/30 active:scale-95">
                                Search
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Horizontal Filter Bar */}
            <div className="sticky top-20 z-30 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm transition-all">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">

                        <div className="w-full flex-1 space-y-3">
                            {/* Job Type + Category Slider */}
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
                                    {['Full-time', 'Part-time', 'Contract'].map(type => (
                                        <button
                                            key={type}
                                            onClick={() => updateFilter('type', filters.type === type ? '' : type)}
                                            className={`px-4 py-2.5 rounded-xl text-sm font-bold border transition-all whitespace-nowrap flex-shrink-0 flex items-center gap-2 ${filters.type === type ? 'bg-primary border-primary text-white shadow-md' : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'}`}
                                        >
                                            <Briefcase size={14} />
                                            {type}
                                        </button>
                                    ))}
                                </div>
                                <div className="w-px h-6 bg-gray-200 flex-shrink-0"></div>
                                <div className="flex-1 overflow-hidden">
                                    <CategoryFilter
                                        selectedCategory={filters.category}
                                        selectedSubCategory={filters.subCategory}
                                        onCategorySelect={(cat) => updateFilter('category', cat)}
                                        onSubCategorySelect={(sub) => updateFilter('subCategory', sub)}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Reset */}
                        {(filters.type || filters.category || filters.search || filters.location) && (
                            <button
                                onClick={clearAllFilters}
                                className="text-sm font-bold text-red-500 hover:text-red-700 whitespace-nowrap flex items-center gap-1 mt-2 px-3 py-1 rounded-lg hover:bg-red-50 transition-colors self-start md:self-center"
                            >
                                <RotateCcw size={14} /> Reset
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-xl font-bold text-slate-900">
                            {loading ? 'Searching...' : `${jobs.length} Jobs Found`}
                        </h2>
                    </div>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="bg-white rounded-3xl h-48 p-6 shadow-soft flex flex-col justify-center space-y-4">
                                <div className="h-6 bg-gray-100 rounded-full w-2/3 animate-shimmer bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 bg-[length:1000px_100%]"></div>
                                <div className="h-4 bg-gray-100 rounded-full w-1/3 animate-pulse"></div>
                                <div className="h-4 bg-gray-100 rounded-full w-1/2 animate-pulse"></div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="space-y-6">
                        {jobs.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
                                {jobs.map(job => (
                                    <JobCard
                                        key={job.id}
                                        job={job}
                                        onApply={setSelectedJob}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white rounded-3xl p-12 text-center shadow-soft border border-slate-100">
                                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Search size={32} className="text-slate-300" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">No jobs found</h3>
                                <p className="text-slate-500 max-w-sm mx-auto mb-8">
                                    We couldn't find any positions matching your current filters. Try broadening your search.
                                </p>
                                <button
                                    onClick={clearAllFilters}
                                    className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-primary transition-colors"
                                >
                                    Clear All Filters
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {selectedJob && (
                <JobModal job={selectedJob} onClose={() => setSelectedJob(null)} />
            )}
        </div>
    );
};

export default JobsPage;
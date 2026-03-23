import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api } from '../services/api';
import { CATEGORIES, mockJobs } from '../services/mockData'; 
import JobCard from '../components/JobCard';
import JobModal from '../components/JobModal'; 
import axios from 'axios';
import { API_BASE_URL } from '../services/apiConfig';
import { Search, MapPin, Briefcase, Filter, RotateCcw, ChevronRight, Clock, GraduationCap, Layers } from 'lucide-react';


const JobsPage = () => {
    const [displayData, setDisplayData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();
    const [selectedJob, setSelectedJob] = useState(null);

    // Filter states
    const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
    const [jobType, setJobType] = useState(searchParams.get('type') || 'All');
    const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');

    const filters = {
        type: searchParams.get('type') || '',
        category: searchParams.get('category') || '',
        search: searchParams.get('search') || '',
    };

    useEffect(() => {
        setSearchTerm(searchParams.get('search') || '');
        setJobType(searchParams.get('type') || 'All');
        setSelectedCategory(searchParams.get('category') || 'All');
    }, [searchParams]);

    useEffect(() => {
        const fetchJobs = async () => {
            setLoading(true);
            try {
                let dummyData = [...mockJobs];
                if (filters.category && filters.category !== 'All') dummyData = dummyData.filter(j => j.category === filters.category);
                if (filters.type && filters.type !== 'All') dummyData = dummyData.filter(j => j.type === filters.type);
                if (filters.search) {
                    const term = filters.search.toLowerCase();
                    dummyData = dummyData.filter(j => j.title.toLowerCase().includes(term) || j.companyName.toLowerCase().includes(term));
                }

                setDisplayData(dummyData);

                const query = new URLSearchParams();
                if (filters.category && filters.category !== 'All') query.append('category', filters.category);
                if (filters.type && filters.type !== 'All') query.append('type', filters.type);
                if (filters.search) query.append('search', filters.search);
                const queryString = query.toString() ? `?${query.toString()}` : '';

                const res = await axios.get(`${API_BASE_URL}/jobs${queryString}`);
                let fetchedData = Array.isArray(res.data) ? res.data : [];

                const normalizeJob = (j) => ({
                    id: j.id || j._id || String(j._id || j.id || ''),
                    title: j.title || j.jobTitle || j.name || '',
                    companyName: j.companyName || j.company || j.shopName || '',
                    type: j.type || j.employmentType || '',
                    location: j.location || j.area || j.city || '',
                    category: j.category || j.jobCategory || '',
                    subCategory: j.subCategory || j.sub_category || j.subcategory || '',
                    contactPhone: j.contactPhone || j.contactPhoneNumber || j.phone || '',
                    contactEmail: j.contactEmail || j.email || j.contactEmail || '',
                    ...j
                });

                fetchedData = fetchedData.map(normalizeJob);

                // Case-insensitive filter application for fetched jobs
                const norm = (v) => (v || '').toString().trim().toLowerCase();
                let filteredFetched = [...fetchedData];
                if (filters.category && filters.category !== 'All') filteredFetched = filteredFetched.filter(j => norm(j.category) === norm(filters.category));
                if (filters.type && filters.type !== 'All') filteredFetched = filteredFetched.filter(j => norm(j.type) === norm(filters.type));
                if (filters.search) {
                    const term = filters.search.toLowerCase();
                    filteredFetched = filteredFetched.filter(j => (j.title || '').toLowerCase().includes(term) || (j.companyName || '').toLowerCase().includes(term));
                }

                const combined = [...dummyData, ...filteredFetched];
                console.log('Fetched jobs from API (normalized + filtered):', filteredFetched);
                console.log('Combined displayData (dummy + db):', combined);
                setDisplayData(combined);
            } catch (err) {
                console.error("Error fetching jobs:", err);
            }
            setLoading(false);
        };
        fetchJobs();
    }, [searchParams]);

    const handleSearch = (e) => {
        e.preventDefault();
        const newParams = new URLSearchParams(searchParams);
        if (searchTerm.trim()) newParams.set('search', searchTerm.trim());
        else newParams.delete('search');
        setSearchParams(newParams);
    };

    const handleTypeFilter = (type) => {
        setJobType(type);
        const newParams = new URLSearchParams(searchParams);
        if (type !== 'All') newParams.set('type', type);
        else newParams.delete('type');
        setSearchParams(newParams);
    };

    const handleCategoryFilter = (category) => {
        setSelectedCategory(category);
        const newParams = new URLSearchParams(searchParams);
        if (category !== 'All') newParams.set('category', category);
        else newParams.delete('category');
        setSearchParams(newParams);
    };

    const clearFilters = () => {
        setSearchParams(new URLSearchParams());
        setSearchTerm('');
        setJobType('All');
        setSelectedCategory('All');
    };

    return (
        <div className="min-h-screen bg-slate-50 pb-12">
            {/* Hero */}
            <div className="bg-primary text-white relative overflow-hidden py-16 md:py-20">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/80 text-xs font-bold uppercase tracking-wider mb-6 animate-fadeIn border border-white/10">
                        <Briefcase size={14} className="text-secondary" />
                        <span>Career Opportunities</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight">
                        Find Your Dream Job in <span className="text-secondary">Theni</span>
                    </h1>
                    <p className="text-lg text-white/60 mb-10 max-w-2xl mx-auto font-medium">
                        Connect with top local employers looking for talent like you.
                    </p>

                    <form onSubmit={handleSearch} className="max-w-2xl mx-auto relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Search className="text-white/40 group-focus-within:text-secondary transition-colors" size={20} />
                        </div>
                        <input
                            type="text"

                            placeholder="Search by job title or company..."
                            className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:bg-white/20 transition-all font-bold"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button type="submit" className="absolute right-2 top-2 bottom-2 bg-secondary text-white px-6 rounded-xl font-bold shadow-lg hover:bg-white hover:text-primary transition-all">
                            Find
                        </button>
                    </form>
                </div>
            </div>

            {/* Sticky Filter Bar */}
            <div className="sticky top-[105px] z-30 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm transition-all">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between gap-4 overflow-x-auto scrollbar-hide">
                        <div className="flex items-center gap-3">
                            {[
                                { id: 'All', label: 'All Jobs', icon: Layers },
                                { id: 'Full-time', label: 'Full-time', icon: Briefcase },
                                { id: 'Part-time', label: 'Part-time', icon: Clock },
                                { id: 'Internship', label: 'Internship', icon: GraduationCap }
                            ].map((type) => (
                                <button
                                    key={type.id}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        handleTypeFilter(type.id)
                                    }}
                                    className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold whitespace-nowrap transition-all border ${jobType === type.id
                                        ? 'bg-secondary border-secondary text-white shadow-md'
                                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                                        }`}
                                >
                                    <type.icon size={18} className={jobType === type.id ? 'opacity-100' : 'opacity-60'} />
                                    <span>{type.label}</span>
                                </button>
                            ))}
                        </div>


                        {/* Vertical Divider */}
                        <div className="w-px h-8 bg-slate-200 mx-2 flex-shrink-0 hidden md:block"></div>

                        {/* Job Categories Carousel */}
                        <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide flex-1">
                            {['All', ...CATEGORIES].map((category) => (
                                <button
                                    key={category}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        handleCategoryFilter(category === 'All' ? 'All' : category)
                                    }}
                                    className={`px-4 py-3 rounded-xl text-sm font-bold whitespace-nowrap transition-all border ${selectedCategory === (category === 'All' ? 'All' : category)
                                        ? 'bg-slate-900 border-slate-900 text-white shadow-md'
                                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                                        }`}
                                >
                                    {category === 'All' ? 'All Categories' : category}
                                </button>
                            ))}
                        </div>

                        {(filters.search || (filters.type && filters.type !== 'All') || (filters.category && filters.category !== 'All')) && (
                            <button
                                onClick={clearFilters}
                                className="text-sm font-bold text-red-500 hover:text-red-700 whitespace-nowrap flex items-center gap-1 px-3 py-1 rounded-lg hover:bg-red-50 transition-colors"
                            >
                                <RotateCcw size={14} /> Reset
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">



                <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    Latest Openings
                    <span className="bg-slate-100 text-slate-500 text-xs py-0.5 px-2 rounded-md">{displayData.length}</span>
                </h2>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map(n => (
                            <div key={n} className="h-64 bg-white rounded-3xl shadow-soft animate-pulse p-6">
                                <div className="h-4 bg-slate-100 rounded w-1/4 mb-4"></div>
                                <div className="h-8 bg-slate-100 rounded w-3/4 mb-2"></div>
                                <div className="h-4 bg-slate-100 rounded w-1/2 mb-8"></div>
                                <div className="h-10 bg-slate-100 rounded w-full mt-auto"></div>
                            </div>
                        ))}
                    </div>
                ) : displayData.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-slideUp">
                        {console.log('jobs (displayData):', displayData) || displayData.map(job => (
                            <JobCard key={job.id} job={job} onApply={setSelectedJob} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                            <Briefcase size={32} />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900">No jobs found</h3>
                        <p className="text-slate-500 text-sm mb-4">Try adjusting your search criteria.</p>
                        <button onClick={clearFilters} className="text-secondary font-bold hover:underline">Reset Filters</button>
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

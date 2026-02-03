import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api } from '../services/api';
import ShopCard from '../components/ShopCard';
import CategoryFilter from '../components/CategoryFilter';
import { AREAS } from '../services/mockData';
import { Search, MapPin, Store, BadgeCheck, RotateCcw, ChevronRight, Tag } from 'lucide-react';
import AdBanner from '../components/AdBanner';

const ShopsPage = () => {
    const [shops, setShops] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();

    // Search states
    const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
    const [tempLocation, setTempLocation] = useState(searchParams.get('location') || '');

    // Extra local filter for UI
    const [verifiedOnly, setVerifiedOnly] = useState(false);

    const filters = {
        category: searchParams.get('category') || '',
        subCategory: searchParams.get('subCategory') || '',
        location: searchParams.get('location') || '',
        search: searchParams.get('search') || '',
    };

    useEffect(() => {
        setSearchTerm(searchParams.get('search') || '');
        setTempLocation(searchParams.get('location') || '');
    }, [searchParams]);

    useEffect(() => {
        const fetchShops = async () => {
            setLoading(true);
            const data = await api.getShops(filters);
            // Client-side filtering for 'verified' as API mock might not handle it via query
            const filteredData = verifiedOnly ? data.filter(s => s.isVerified) : data;
            setShops(filteredData);
            setLoading(false);
        };
        fetchShops();
    }, [searchParams, verifiedOnly]);

    const updateFilter = (key, value) => {
        const newParams = new URLSearchParams(searchParams);
        if (value && value !== 'All') newParams.set(key, value);
        else newParams.delete(key);

        if (key === 'category') newParams.delete('subCategory');
        setSearchParams(newParams);
    };

    const handleMainSearch = (e) => {
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
        setVerifiedOnly(false);
    };

    // Split shops for ad insertion
    const firstHalf = shops.slice(0, 6);
    const secondHalf = shops.slice(6);

    return (
        <div className="min-h-screen bg-slate-50 pb-12">
            {/* Hero */}
            <div className="bg-primary text-white relative overflow-hidden py-16 md:py-20">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>

                <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
                    <div className="max-w-3xl mx-auto text-center mb-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/80 text-xs font-bold uppercase tracking-wider mb-6 animate-fadeIn border border-white/10">
                            <Tag size={14} className="text-secondary" />
                            <span>Exclusive Deals & Offers</span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight">
                            Save Big on <span className="text-secondary">Products You Love</span>
                        </h1>
                        <p className="text-lg text-white/60 font-medium">From top-rated restaurants to trusted service providers.</p>
                    </div>

                    {/* Search Bar */}
                    <form onSubmit={handleMainSearch} className="max-w-4xl mx-auto relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Search className="text-white/40 group-focus-within:text-secondary transition-colors" size={20} />
                        </div>
                        <div className="flex flex-col md:flex-row gap-4">
                            <input
                                type="text"
                                placeholder="Search shops..."
                                className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:bg-white/20 transition-all font-bold"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />

                            <div className="relative md:w-1/3">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <MapPin className="text-white/40 group-focus-within:text-secondary transition-colors" size={20} />
                                </div>
                                <select
                                    className="w-full pl-12 pr-10 py-4 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl text-white font-bold cursor-pointer appearance-none focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:bg-white/20 [&>option]:text-slate-900"
                                    value={tempLocation}
                                    onChange={(e) => setTempLocation(e.target.value)}
                                >
                                    <option value="">All Locations</option>
                                    {AREAS.map(area => (
                                        <option key={area} value={area}>{area}</option>
                                    ))}
                                </select>
                                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                                    <ChevronRight className="text-white/40 rotate-90" size={16} />
                                </div>
                            </div>

                            <button type="submit" className="bg-secondary text-white px-8 py-4 rounded-2xl font-bold shadow-lg hover:bg-white hover:text-primary transition-all md:w-auto w-full">
                                Search
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Horizontal Filter Bar */}
            <div className="sticky top-[105px] z-30 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm transition-all">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">

                        <div className="w-full flex-1 space-y-3">
                            {/* Top Row: Verification + Category Slider */}
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setVerifiedOnly(!verifiedOnly)}
                                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold border transition-all whitespace-nowrap flex-shrink-0 ${verifiedOnly ? 'bg-blue-50 border-blue-200 text-blue-700 shadow-sm' : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'}`}
                                >
                                    <BadgeCheck size={16} className={verifiedOnly ? "fill-blue-200" : ""} />
                                    Verified
                                </button>
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
                        {(filters.category || verifiedOnly || filters.search || filters.location) && (
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
                    <h2 className="text-xl font-bold text-slate-900">
                        {loading ? 'Loading...' : `${shops.length} Businesses Found`}
                    </h2>
                    <span className="text-sm text-slate-500 font-medium hidden md:block">Top Rated First</span>
                </div>

                <div className="mb-8">
                    <AdBanner placement="category_banner" className="rounded-3xl shadow-soft" />
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="bg-white rounded-3xl h-80 shadow-soft p-4 flex flex-col">
                                <div className="h-40 bg-gray-100 rounded-2xl animate-shimmer mb-4 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 bg-[length:1000px_100%]"></div>
                                <div className="space-y-3 flex-1">
                                    <div className="h-4 bg-gray-100 rounded-full w-2/3 animate-pulse"></div>
                                    <div className="h-4 bg-gray-100 rounded-full w-1/2 animate-pulse"></div>
                                </div>
                                <div className="h-10 bg-gray-100 rounded-xl mt-4 animate-pulse"></div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <>
                        {shops.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
                                {/* First Half */}
                                {firstHalf.map(shop => (
                                    <ShopCard key={shop.id} shop={shop} />
                                ))}

                                {/* In-feed Ad Banner */}
                                {shops.length > 0 && (
                                    <div className="col-span-1 md:col-span-2 lg:col-span-3">
                                        <AdBanner placement="list_insert" adIndex={0} className="rounded-3xl shadow-soft" />
                                    </div>
                                )}

                                {/* Second Half */}
                                {secondHalf.map(shop => (
                                    <ShopCard key={shop.id} shop={shop} />
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white rounded-3xl p-12 text-center shadow-soft border border-slate-100">
                                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Store size={32} className="text-slate-300" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">No businesses found</h3>
                                <p className="text-slate-500 max-w-sm mx-auto mb-8">
                                    We couldn't find any shops matching your criteria. Try adjusting your filters or location.
                                </p>
                                <button
                                    onClick={clearAllFilters}
                                    className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-primary transition-colors"
                                >
                                    Clear All Filters
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default ShopsPage;

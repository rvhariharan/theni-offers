import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api } from '../services/api';
import OfferCard from '../components/OfferCard';
import OfferModal from '../components/OfferModal';
import CategoryFilter from '../components/CategoryFilter';
import { AREAS } from '../services/mockData';
import { Search, MapPin, Tag, SlidersHorizontal, RotateCcw, ChevronRight } from 'lucide-react';
import AdBanner from '../components/AdBanner';

const OffersPage = () => {
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();
    const [selectedOffer, setSelectedOffer] = useState(null);

    const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
    const [tempLocation, setTempLocation] = useState(searchParams.get('location') || '');

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
        const fetchOffers = async () => {
            setLoading(true);
            const data = await api.getOffers(filters);
            setOffers(data);
            setLoading(false);
        };
        fetchOffers();
    }, [searchParams]);

    const updateFilter = (key, value) => {
        const newParams = new URLSearchParams(searchParams);
        if (value && value !== 'All') {
            newParams.set(key, value);
        } else {
            newParams.delete(key);
        }
        // If changing main category, reset subcategory
        if (key === 'category') {
            newParams.delete('subCategory');
        }
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
    };

    // Split offers for ad insertion
    const firstHalf = offers.slice(0, 6);
    const secondHalf = offers.slice(6);

    return (
        <div className="min-h-screen bg-slate-50 pb-12">
            {/* Hero Section */}
            <div className="bg-primary text-white relative overflow-hidden py-16 md:py-20">
                {/* Decorative Blobs */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="max-w-3xl mx-auto text-center mb-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/80 text-xs font-bold uppercase tracking-wider mb-6 animate-fadeIn border border-white/10">
                            <Tag size={14} className="text-secondary" />
                            <span>Exclusive Deals & Offers</span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight">
                            Save Big on <span className="text-secondary">Products You Love</span>
                        </h1>
                        <p className="text-lg text-white/60 font-medium">Browse thousands of active offers from local businesses.</p>
                    </div>

                    {/* Search Bar */}
                    <form onSubmit={handleMainSearch} className="max-w-4xl mx-auto relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Search className="text-white/40 group-focus-within:text-secondary transition-colors" size={20} />
                        </div>
                        <div className="flex flex-col md:flex-row gap-4">
                            <input
                                type="text"
                                placeholder="Search offers..."
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

                        <div className="w-full flex-1">
                            <CategoryFilter
                                selectedCategory={filters.category}
                                selectedSubCategory={filters.subCategory}
                                onCategorySelect={(cat) => updateFilter('category', cat)}
                                onSubCategorySelect={(sub) => updateFilter('subCategory', sub)}
                            />
                        </div>

                        {/* Reset */}
                        {(filters.category || filters.search || filters.location) && (
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
                    <h1 className="text-xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
                        {filters.subCategory && filters.subCategory !== 'All' ? filters.subCategory : filters.category ? filters.category : 'All'} Offers
                        <span className="text-gray-400 font-medium text-sm">({offers.length})</span>
                    </h1>
                </div>

                <AdBanner placement="category_banner" className="rounded-2xl shadow-soft mb-8" />

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="bg-white rounded-3xl h-96 shadow-soft p-4 space-y-4">
                                <div className="h-52 bg-gray-100 rounded-2xl animate-shimmer bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 bg-[length:1000px_100%]"></div>
                                <div className="h-4 bg-gray-100 rounded-full w-3/4 animate-pulse"></div>
                                <div className="h-4 bg-gray-100 rounded-full w-1/2 animate-pulse"></div>
                                <div className="h-10 bg-gray-100 rounded-xl mt-auto animate-pulse"></div>
                            </div>
                        ))}
                    </div>
                ) : offers.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-fadeIn">
                        {/* First Half of Offers */}
                        {firstHalf.map(offer => (
                            <OfferCard key={offer.id} offer={offer} onViewClick={setSelectedOffer} />
                        ))}



                        {/* Second Half of Offers */}
                        {secondHalf.map(offer => (
                            <OfferCard key={offer.id} offer={offer} onViewClick={setSelectedOffer} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-24 bg-white rounded-3xl shadow-sm border border-gray-100 text-center px-4">
                        <div className="bg-gray-50 p-6 rounded-full mb-4">
                            <Search size={40} className="text-gray-300" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No offers found</h3>
                        <p className="text-gray-500 max-w-sm mx-auto mb-8">We couldn't find any offers matching your current filters. Try adjusting your search or category.</p>
                        <button
                            onClick={clearAllFilters}
                            className="bg-primary text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 transition-all"
                        >
                            Clear All Filters
                        </button>
                    </div>
                )}
            </div>

            {selectedOffer && (
                <OfferModal offer={selectedOffer} onClose={() => setSelectedOffer(null)} />
            )}
        </div>
    );
};

export default OffersPage;

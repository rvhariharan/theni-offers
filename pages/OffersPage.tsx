import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api } from '../services/api';
import { Offer, FilterState } from '../types';
import OfferCard from '../components/OfferCard';
import OfferModal from '../components/OfferModal';
import CategoryFilter from '../components/CategoryFilter';
import { AREAS } from '../services/mockData';
import { Search, MapPin, Tag, SlidersHorizontal, RotateCcw, ChevronRight } from 'lucide-react';
import AdBanner from '../components/AdBanner';

const OffersPage: React.FC = () => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);

  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [tempLocation, setTempLocation] = useState(searchParams.get('location') || '');

  const filters: FilterState = {
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

  const updateFilter = (key: keyof FilterState, value: string) => {
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

  // Split offers for ad insertion
  const firstHalf = offers.slice(0, 6);
  const secondHalf = offers.slice(6);

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      {/* Hero Section */}
      <div className="bg-white border-b border-slate-100 relative overflow-hidden">
        {/* Decorative Blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider mb-6 animate-fadeIn">
              <Tag size={14} className="text-primary" />
              <span>Exclusive Deals & Offers</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4 leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-teal-600 to-secondary">Save big on</span> <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-teal-600 to-secondary">products you love</span>
            </h1>
            <p className="text-lg text-slate-500 font-medium">Browse thousands of active offers from local businesses.</p>
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
                  placeholder="Search offers..."
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
                Search Now
              </button>
            </div>

            {/* Desktop Layout: Horizontal Bar */}
            <div className="hidden md:flex bg-white p-2 rounded-[2rem] shadow-hover flex-row gap-2 transform transition-all hover:scale-[1.01]">
              <div className="flex-1 flex items-center px-6 h-14 bg-transparent rounded-[1.5rem] group focus-within:bg-slate-50 transition-colors">
                <Search className="text-slate-400 mr-3 group-focus-within:text-primary transition-colors flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search offers..."
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

        <div className="mb-8">
          <AdBanner placement="category_banner" className="rounded-2xl shadow-soft" />
        </div>

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

            {/* In-feed Ad Banner */}
            {offers.length > 0 && (
              <div className="col-span-1 sm:col-span-2 lg:col-span-3">
                <AdBanner placement="list_insert" adIndex={2} className="rounded-2xl shadow-soft" />
              </div>
            )}

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
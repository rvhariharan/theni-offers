import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api } from '../services/api';
import { Shop, FilterState } from '../types';
import ShopCard from '../components/ShopCard';
import CategoryFilter from '../components/CategoryFilter';
import { AREAS } from '../services/mockData';
import { Search, MapPin, Store, BadgeCheck, RotateCcw } from 'lucide-react';
import AdBanner from '../components/AdBanner';

const ShopsPage: React.FC = () => {
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Search states
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [tempLocation, setTempLocation] = useState(searchParams.get('location') || '');

  // Extra local filter for UI
  const [verifiedOnly, setVerifiedOnly] = useState(false);

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
      setVerifiedOnly(false);
  };

  // Split shops for ad insertion
  const firstHalf = shops.slice(0, 6);
  const secondHalf = shops.slice(6);

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
                    <Store size={14} className="text-primary" />
                    <span>Local Business Directory</span>
                 </div>
                 <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4 leading-tight">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-teal-600 to-secondary">Explore Theni's</span> <br className="hidden md:block"/> 
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-teal-600 to-secondary">Best Businesses</span>
                 </h1>
                 <p className="text-lg text-slate-500 font-medium">From top-rated restaurants to trusted service providers.</p>
             </div>

             {/* Search Bar */}
             <form onSubmit={handleMainSearch} className="max-w-4xl mx-auto">
                 <div className="bg-white p-2 rounded-[2rem] shadow-hover border border-slate-200 flex flex-col md:flex-row gap-2 transition-all focus-within:ring-4 focus-within:ring-slate-100">
                     <div className="flex-1 flex items-center px-4 h-14 bg-slate-50 md:bg-transparent rounded-2xl">
                         <Search className="text-slate-400 mr-3 flex-shrink-0" />
                         <input 
                            type="text" 
                            placeholder="Search for shops, services..." 
                            className="bg-transparent border-0 focus:ring-0 w-full text-slate-900 font-medium placeholder:text-slate-400"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                         />
                     </div>
                     <div className="w-px bg-slate-200 my-2 hidden md:block"></div>
                     <div className="flex-1 flex items-center px-4 h-14 bg-slate-50 md:bg-transparent rounded-2xl">
                         <MapPin className="text-slate-400 mr-3 flex-shrink-0" />
                         <select 
                            className="bg-transparent border-0 focus:ring-0 w-full text-slate-900 font-medium cursor-pointer"
                            value={tempLocation}
                            onChange={(e) => setTempLocation(e.target.value)}
                         >
                             <option value="">All Locations</option>
                             {AREAS.map(area => (
                                 <option key={area} value={area}>{area}</option>
                             ))}
                         </select>
                     </div>
                     <button type="submit" className="bg-gray-900 hover:bg-primary text-white px-8 h-14 rounded-2xl font-bold transition-all shadow-lg hover:shadow-primary/30 active:scale-95 flex items-center justify-center gap-2">
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
                    {[1,2,3,4,5,6].map(i => (
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
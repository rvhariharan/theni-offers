import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Offer, Shop, Job, Ad } from '../types';
import OfferCard from '../components/OfferCard';
import ShopCard from '../components/ShopCard';
import JobCard from '../components/JobCard';
import AdBanner from '../components/AdBanner';
import FAQSubscribe from '../components/FAQSubscribe';
import OfferModal from '../components/OfferModal';
import JobModal from '../components/JobModal';
import CategoryFilter from '../components/CategoryFilter';
import { 
    ArrowRight, ShoppingBag, Smartphone, Shirt, Utensils, Zap, Car, 
    Heart, BookOpen, Diamond, Home as HomeIcon, Search, MapPin, 
    Sparkles, TrendingUp, Store, Briefcase, ChevronLeft, ChevronRight, ExternalLink, Crown
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { CATEGORIES, AREAS } from '../services/mockData';

// Map icons to categories
const getCategoryIcon = (category: string) => {
    switch (category) {
        case 'Electronics': return <Smartphone size={24} />;
        case 'Fashion': return <Shirt size={24} />;
        case 'Food & Dining': return <Utensils size={24} />;
        case 'Services': return <Zap size={24} />;
        case 'Automotive': return <Car size={24} />;
        case 'Health': return <Heart size={24} />;
        case 'Education': return <BookOpen size={24} />;
        case 'Jewellery': return <Diamond size={24} />;
        case 'Real Estate': return <HomeIcon size={24} />;
        default: return <ShoppingBag size={24} />;
    }
};

const getCategoryColor = (index: number) => {
    const colors = [
        'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white',
        'bg-rose-50 text-rose-600 group-hover:bg-rose-600 group-hover:text-white',
        'bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white',
        'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white',
        'bg-violet-50 text-violet-600 group-hover:bg-violet-600 group-hover:text-white',
        'bg-cyan-50 text-cyan-600 group-hover:bg-cyan-600 group-hover:text-white',
    ];
    return colors[index % colors.length];
};

const Home: React.FC = () => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [shops, setShops] = useState<Shop[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  
  // Hero Carousel State
  const [heroAds, setHeroAds] = useState<Ad[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Hero Search State
  const [heroSearch, setHeroSearch] = useState('');
  const [heroLocation, setHeroLocation] = useState('');

  // Section filters
  const [offerFilter, setOfferFilter] = useState('All');
  const [shopFilter, setShopFilter] = useState('All');
  const [jobFilter, setJobFilter] = useState('All');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const offersData = await api.getOffers();
      const shopsData = await api.getShops();
      const jobsData = await api.getJobs();
      const adsData = await api.getAds('home_banner');
      
      setOffers(offersData);
      setShops(shopsData);
      setJobs(jobsData);
      setHeroAds(adsData);
    };
    fetchData();
  }, []);

  // Total slides = 1 (Search Interface) + Number of Ads
  const totalSlides = 1 + heroAds.length;

  useEffect(() => {
    if (isPaused || totalSlides <= 1) return;
    const interval = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % totalSlides);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, totalSlides]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % totalSlides);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);

  const handleHeroSearch = (e: React.FormEvent) => {
      e.preventDefault();
      const params = new URLSearchParams();
      if(heroSearch) params.set('search', heroSearch);
      if(heroLocation) params.set('location', heroLocation);
      navigate(`/offers?${params.toString()}`);
  };

  const getFilteredOffers = () => {
    let filtered = offers;
    if (offerFilter !== 'All') filtered = filtered.filter(o => o.category === offerFilter);
    // Show 8 items (2 rows of 4 on large screens)
    return filtered.slice(0, 8);
  };

  const getFilteredShops = () => {
      let filtered = shops.filter(s => s.isPremium);
      if (shopFilter !== 'All') filtered = filtered.filter(s => s.category === shopFilter);
      // Show 6 items (2 rows of 3 on large screens)
      return filtered.slice(0, 6);
  };

  const getFilteredJobs = () => {
      let filtered = jobs;
      if (jobFilter !== 'All') filtered = filtered.filter(j => j.type === jobFilter);
      // Show 6 items (2 rows of 3 on large screens)
      return filtered.slice(0, 6);
  };

  const SectionHeader = ({ title, subtitle, link, linkText, icon: Icon }: any) => (
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 relative border-b border-gray-100 pb-4">
        <div className="w-full md:w-auto">
            <div className="flex items-center gap-2 mb-1">
                {Icon && <Icon className="text-primary" size={20} />}
                <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">{title}</h2>
            </div>
            <p className="text-gray-500 font-medium ml-0 md:ml-7">{subtitle}</p>
        </div>
        {link && (
            <Link to={link} className="hidden md:flex group items-center text-gray-900 font-bold text-sm hover:text-primary transition-colors bg-gray-50 px-5 py-2.5 rounded-full">
            {linkText} <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
        )}
      </div>
  );

  const PillFilter = ({ options, active, onSelect }: { options: string[], active: string, onSelect: (val: string) => void }) => (
      <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide mb-6 snap-x">
          <button 
            onClick={() => onSelect('All')}
            className={`px-5 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all duration-300 snap-start ${active === 'All' ? 'bg-gray-900 text-white shadow-md' : 'bg-white text-gray-500 hover:bg-gray-100 border border-gray-100'}`}
          >
              All
          </button>
          {options.map(opt => (
              <button 
                key={opt}
                onClick={() => onSelect(opt)}
                className={`px-5 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all duration-300 snap-start ${active === opt ? 'bg-gray-900 text-white shadow-md' : 'bg-white text-gray-500 hover:bg-gray-100 border border-gray-100'}`}
              >
                  {opt}
              </button>
          ))}
      </div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      
      {/* --- HERO SLIDESHOW SECTION --- */}
      <div 
        className="relative bg-white overflow-hidden group/hero"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
          {/* Main Grid for Slides Stacking */}
          <div className="grid grid-cols-1 grid-rows-1 relative min-h-[500px] lg:min-h-[600px]">
              
              {/* SLIDE 0: Main Search Interface */}
              <div 
                className={`col-start-1 row-start-1 transition-all duration-700 ease-in-out w-full h-full flex items-center justify-center ${currentSlide === 0 ? 'opacity-100 z-20 translate-x-0' : 'opacity-0 z-0 translate-x-8 pointer-events-none'}`}
              >
                 <div className="absolute inset-0">
                     {/* Background Blobs for Slide 0 */}
                     <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10"></div>
                     <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -z-10"></div>
                 </div>

                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-12 lg:py-0">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider mb-6 animate-fadeIn">
                            <Sparkles size={14} className="text-secondary" />
                            <span>The #1 Local Marketplace</span>
                        </div>
                        {/* Responsive Text Size */}
                        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-6 leading-[1.1]">
                            Discover the best of <br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-teal-600 to-secondary">Theni District</span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-500 mb-10 max-w-2xl mx-auto font-medium">
                            Your one-stop destination for exclusive offers, premium local businesses, and job opportunities right in your neighborhood.
                        </p>

                        {/* Hero Search Bar */}
                        <form onSubmit={handleHeroSearch} className="max-w-3xl mx-auto">
                            
                           {/* Mobile Layout: Modern & Glassmorphic */}
                            <div className="md:hidden bg-white/60 backdrop-blur-xl p-4 rounded-[2.5rem] shadow-xl border border-white/50 flex flex-col gap-3 animate-slideUp">
                                {/* Row 1: Search Query */}
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Search className="text-slate-400 group-focus-within:text-primary transition-colors" size={20} />
                                    </div>
                                    <input 
                                        type="text" 
                                        placeholder="Search for offers, shops..." 
                                        className="w-full pl-11 pr-4 py-4 bg-white/80 border border-slate-100 rounded-2xl text-slate-900 font-bold placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/20 focus:bg-white transition-all text-base shadow-sm"
                                        value={heroSearch}
                                        onChange={(e) => setHeroSearch(e.target.value)}
                                    />
                                </div>

                                {/* Row 2: Location + Button */}
                                <div className="flex gap-3">
                                    <div className="relative flex-1 group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <MapPin className="text-slate-400 group-focus-within:text-secondary transition-colors" size={20} />
                                        </div>
                                        <select 
                                            className="w-full pl-11 pr-10 py-4 bg-white/80 border border-slate-100 rounded-2xl text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/20 focus:bg-white transition-all appearance-none text-base shadow-sm"
                                            value={heroLocation}
                                            onChange={(e) => setHeroLocation(e.target.value)}
                                        >
                                            <option value="">Location</option>
                                            {AREAS.map(area => (
                                                <option key={area} value={area}>{area}</option>
                                            ))}
                                        </select>
                                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                                            <ChevronRight className="text-slate-400 rotate-90" size={16} />
                                        </div>
                                    </div>

                                    <button 
                                        type="submit" 
                                        className="aspect-square h-auto bg-slate-900 hover:bg-primary text-white rounded-2xl flex items-center justify-center shadow-lg shadow-slate-900/20 active:scale-95 transition-all"
                                        aria-label="Search"
                                    >
                                        <Search size={22} />
                                    </button>
                                </div>
                            </div>

                            {/* Desktop Layout: Horizontal Bar */}
                            <div className="hidden md:flex bg-white p-2 rounded-[2rem] shadow-hover border border-slate-200 flex-row gap-2 transform transition-all hover:scale-[1.01]">
                                <div className="flex-1 flex items-center px-6 h-14 bg-transparent rounded-[1.5rem] group focus-within:bg-slate-50 transition-colors">
                                    <Search className="text-slate-400 mr-3 group-focus-within:text-primary transition-colors flex-shrink-0" />
                                    <input 
                                        type="text" 
                                        placeholder="What are you looking for?" 
                                        className="bg-transparent border-0 focus:ring-0 w-full text-slate-900 font-bold placeholder:text-slate-400 text-lg"
                                        value={heroSearch}
                                        onChange={(e) => setHeroSearch(e.target.value)}
                                    />
                                </div>
                                <div className="w-px bg-slate-200 my-2"></div>
                                <div className="flex-1 flex items-center px-6 h-14 bg-transparent rounded-[1.5rem] group focus-within:bg-slate-50 transition-colors">
                                    <MapPin className="text-slate-400 mr-3 group-focus-within:text-primary transition-colors flex-shrink-0" />
                                    <select 
                                        className="bg-transparent border-0 focus:ring-0 w-full text-slate-900 font-bold cursor-pointer text-lg"
                                        value={heroLocation}
                                        onChange={(e) => setHeroLocation(e.target.value)}
                                    >
                                        <option value="">All Locations</option>
                                        {AREAS.map(area => (
                                            <option key={area} value={area}>{area}</option>
                                        ))}
                                    </select>
                                </div>
                                <button type="submit" className="bg-gray-900 hover:bg-primary text-white px-8 h-14 rounded-[1.5rem] font-bold text-lg transition-all shadow-lg hover:shadow-primary/30 active:scale-95">
                                    Search
                                </button>
                            </div>
                        </form>

                        {/* Stats Strip */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto mt-12 md:mt-16 pt-8 border-t border-slate-100">
                            <div className="text-center">
                                <div className="text-2xl md:text-3xl font-extrabold text-gray-900">{offers.length}+</div>
                                <div className="text-xs md:text-sm font-bold text-gray-500 uppercase tracking-wide mt-1">Active Offers</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl md:text-3xl font-extrabold text-gray-900">{shops.length}+</div>
                                <div className="text-xs md:text-sm font-bold text-gray-500 uppercase tracking-wide mt-1">Verified Shops</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl md:text-3xl font-extrabold text-gray-900">{jobs.length}+</div>
                                <div className="text-xs md:text-sm font-bold text-gray-500 uppercase tracking-wide mt-1">Local Jobs</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl md:text-3xl font-extrabold text-gray-900">8+</div>
                                <div className="text-xs md:text-sm font-bold text-gray-500 uppercase tracking-wide mt-1">Locations</div>
                            </div>
                        </div>
                    </div>
                 </div>
              </div>

              {/* ADS SLIDES (Index 1 to N) */}
              {heroAds.map((ad, index) => (
                  <div 
                    key={ad.id}
                    className={`col-start-1 row-start-1 w-full h-full relative transition-all duration-1000 ease-in-out ${currentSlide === index + 1 ? 'opacity-100 z-20 scale-100' : 'opacity-0 z-0 scale-105 pointer-events-none'}`}
                  >
                      {/* Background Image or Video */}
                      <div className="absolute inset-0 bg-slate-900">
                           {ad.type === 'video' && ad.videoUrl ? (
                                <video 
                                    src={ad.videoUrl}
                                    poster={ad.imageUrl}
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    className="w-full h-full object-cover opacity-60"
                                />
                           ) : (
                                <img 
                                    src={ad.imageUrl} 
                                    alt={ad.title} 
                                    className="w-full h-full object-cover opacity-60"
                                />
                           )}
                           <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
                      </div>

                      {/* Content Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center p-4">
                          <div className="max-w-4xl text-center text-white space-y-6 transform transition-transform duration-700 delay-100 translate-y-0">
                               <div className="inline-block px-3 py-1 border border-white/30 rounded-full text-xs font-bold uppercase tracking-wider bg-black/20 backdrop-blur-md mb-2">
                                   Featured Promotion
                               </div>
                               <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold drop-shadow-2xl leading-tight">
                                   {ad.title}
                               </h2>
                               <div className="pt-4">
                                   <a 
                                    href={ad.redirectUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-primary hover:text-white transition-all shadow-xl hover:shadow-primary/50 hover:-translate-y-1"
                                   >
                                       View Offer <ExternalLink size={20} />
                                   </a>
                               </div>
                          </div>
                      </div>
                  </div>
              ))}
          </div>

          {/* Carousel Navigation */}
          {totalSlides > 1 && (
              <>
                <button 
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 hover:bg-white/90 text-white hover:text-slate-900 backdrop-blur-md border border-white/20 transition-all opacity-0 group-hover/hero:opacity-100 focus:opacity-100"
                >
                    <ChevronLeft size={24} />
                </button>
                <button 
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 hover:bg-white/90 text-white hover:text-slate-900 backdrop-blur-md border border-white/20 transition-all opacity-0 group-hover/hero:opacity-100 focus:opacity-100"
                >
                    <ChevronRight size={24} />
                </button>

                <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-2 z-30">
                    {Array.from({ length: totalSlides }).map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentSlide(idx)}
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                                currentSlide === idx 
                                ? 'w-8 bg-primary shadow-lg' 
                                : `w-1.5 ${currentSlide === 0 ? 'bg-slate-300' : 'bg-white/40 hover:bg-white'}`
                            }`}
                        />
                    ))}
                </div>
              </>
          )}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        
        {/* --- OFFERS SECTION --- */}
        <section>
          <SectionHeader 
            title="Trending Offers" 
            subtitle="Handpicked deals just for you" 
            link="/offers" 
            linkText="View All Offers" 
            icon={TrendingUp}
          />
          {/* Note: Home page keeps simpler filters, but uses the sliding CategoryFilter without subcategories for cleaner UI */}
          <div className="mb-6">
            <CategoryFilter 
                selectedCategory={offerFilter}
                onCategorySelect={setOfferFilter}
                showSubCategories={false}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {getFilteredOffers().map(offer => (
              <OfferCard 
                key={offer.id} 
                offer={offer} 
                onViewClick={setSelectedOffer}
              />
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Link to="/offers" className="inline-block w-full bg-white border border-gray-200 text-gray-900 font-bold py-3 rounded-xl shadow-sm">View All Offers</Link>
          </div>
        </section>

        {/* --- SHOPS SECTION --- */}
        <section>
          <SectionHeader 
            title="Featured Businesses" 
            subtitle="Verified premium partners in Theni" 
            link="/shops" 
            linkText="View Directory" 
            icon={Store}
          />
          <div className="mb-6">
            <CategoryFilter 
                selectedCategory={shopFilter}
                onCategorySelect={setShopFilter}
                showSubCategories={false}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {getFilteredShops().map(shop => (
              <ShopCard key={shop.id} shop={shop} />
            ))}
          </div>
           <div className="mt-8 text-center md:hidden">
            <Link to="/shops" className="inline-block w-full bg-white border border-gray-200 text-gray-900 font-bold py-3 rounded-xl shadow-sm">View Directory</Link>
          </div>
        </section>

        {/* --- MID-PAGE AD 2 (Kept as spacer) --- */}
        <AdBanner placement="list_insert" adIndex={1} className="md:h-64" />

        {/* --- JOBS SECTION --- */}
        <section>
           <SectionHeader 
            title="Local Jobs" 
            subtitle="Latest opportunities near you" 
            link="/jobs" 
            linkText="Browse Jobs" 
            icon={Briefcase}
           />
           <PillFilter 
            options={['Full-time', 'Part-time']} 
            active={jobFilter} 
            onSelect={setJobFilter} 
          />
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
               {getFilteredJobs().map(job => (
                   <JobCard key={job.id} job={job} onApply={setSelectedJob} />
               ))}
           </div>
            <div className="mt-8 text-center md:hidden">
            <Link to="/jobs" className="inline-block w-full bg-white border border-gray-200 text-gray-900 font-bold py-3 rounded-xl shadow-sm">Browse Jobs</Link>
          </div>
        </section>

        {/* --- MOVED: CATEGORIES GRID --- */}
        <section>
             <div className="flex items-center justify-between mb-8 px-1">
                 <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                     <Sparkles size={20} className="text-primary" />
                     Explore by Category
                 </h2>
             </div>
             <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
                {CATEGORIES.slice(0, 10).map((cat, idx) => (
                    <Link to={`/offers?category=${cat}`} key={cat} className="group flex flex-col items-center gap-3 p-4 rounded-3xl hover:bg-white hover:shadow-lg transition-all duration-300 border border-transparent hover:border-gray-100">
                        <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl ${getCategoryColor(idx)} flex items-center justify-center transition-all duration-300 shadow-sm`}>
                            <div className="transform transition-transform group-hover:scale-110 duration-300">
                                {getCategoryIcon(cat)}
                            </div>
                        </div>
                        <span className="text-xs md:text-sm font-bold text-gray-600 group-hover:text-gray-900 transition-colors text-center">{cat}</span>
                    </Link>
                ))}
            </div>
        </section>

        {/* --- MOVED: AD BANNER 1 --- */}
        <AdBanner placement="list_insert" adIndex={0} className="md:h-64" />

        {/* --- NEW SECTION: PREMIUM BRANDS --- */}
        <section>
            <SectionHeader 
                title="Our Premium Brands" 
                subtitle="Trusted top-rated businesses" 
                icon={Crown}
            />
            <div className="flex flex-wrap justify-center gap-6 md:gap-10 py-4">
               {shops.filter(s => s.isPremium).map(shop => (
                   <Link to={`/shops/${shop.id}`} key={shop.id} className="group flex flex-col items-center gap-3">
                       <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white p-1.5 shadow-soft border border-gray-100 group-hover:shadow-lg group-hover:-translate-y-1 group-hover:border-primary/30 transition-all duration-300 flex items-center justify-center overflow-hidden">
                           <img src={shop.logo} alt={shop.name} className="w-full h-full object-cover rounded-full" />
                       </div>
                       <span className="text-xs font-bold text-gray-500 group-hover:text-primary transition-colors max-w-[100px] text-center truncate">{shop.name}</span>
                   </Link>
               ))}
            </div>
        </section>

        {/* --- FAQ SECTION --- */}
        <section>
            <FAQSubscribe />
        </section>

      </div>
      
      {/* Modals */}
      {selectedOffer && (
          <OfferModal offer={selectedOffer} onClose={() => setSelectedOffer(null)} />
      )}
      {selectedJob && (
          <JobModal job={selectedJob} onClose={() => setSelectedJob(null)} />
      )}
    </div>
  );
};

export default Home;
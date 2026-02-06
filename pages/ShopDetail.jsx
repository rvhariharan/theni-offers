import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import OfferCard from '../components/OfferCard';
import OfferModal from '../components/OfferModal';
import {
    MapPin, Phone, Globe, Facebook, Instagram, Star, BadgeCheck,
    Share2, MessageCircle, ArrowLeft, LayoutGrid, Info, Clock, Navigation, Building2
} from 'lucide-react';

const ShopDetail = () => {
    const { id } = useParams();
    const [shop, setShop] = useState(null);
    const [offers, setOffers] = useState([]);
    const [selectedOffer, setSelectedOffer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('offers');

    useEffect(() => {
        const fetchData = async () => {
            if (!id) return;
            setLoading(true);
            const shopData = await api.getShopById(id);
            const offersData = await api.getOffersByShopId(id);
            setShop(shopData);
            setOffers(offersData);
            setLoading(false);
        };
        fetchData();
        window.scrollTo(0, 0);
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                    <p className="text-slate-400 font-bold animate-pulse">Loading Store Profile...</p>
                </div>
            </div>
        );
    }

    if (!shop) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-center px-4">
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Shop Not Found</h2>
                <p className="text-slate-500 mb-6">The business you are looking for might have been removed or does not exist.</p>
                <Link to="/shops" className="bg-primary text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all">
                    Back to Directory
                </Link>
            </div>
        );
    }

    // --- Dynamic Data Preparation ---

    // 1. Social Media (Global for the Shop)
    const hasSocialMedia = shop.socialMedia && Object.values(shop.socialMedia).some(val => val);

    // Check if specific contact methods exist
    const hasAddress = Boolean(shop.address || shop.area);
    const hasPhone = Boolean(shop.contactNumber);
    const hasHours = Boolean(shop.openingHours);

    return (
        <div className="bg-slate-50 min-h-screen">
            {/* Header / Cover Image */}
            <div className="relative h-[450px] md:h-[500px] w-full group">
                <img
                    src={shop.image}
                    alt={shop.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-slate-900/10 opacity-90"></div>

                {/* Back Button */}
                <div className="absolute top-6 left-6 z-20">
                    <Link to="/shops" className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white p-3 rounded-full transition-all border border-white/10 flex items-center justify-center group/back" title="Back to Shops">
                        <ArrowLeft size={22} className="group-hover/back:-translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* Share Button */}
                <div className="absolute top-6 right-6 z-20">
                    <button className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white p-3 rounded-full transition-all border border-white/10" title="Share Profile">
                        <Share2 size={22} />
                    </button>
                </div>

                {/* Shop Info Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 z-10 text-white">
                    <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-end">
                        {/* Logo Box */}
                        <div className="w-32 h-32 md:w-36 md:h-36 rounded-2xl bg-white p-1.5 shadow-2xl shrink-0 overflow-hidden border-2 border-white/20 backdrop-blur-sm -mb-2 md:mb-0">
                            <img src={shop.logo} alt="Logo" className="w-full h-full object-cover rounded-xl" />
                        </div>

                        {/* Text Info */}
                        <div className="flex-1 space-y-3 mb-2 w-full">
                            {/* Badges */}
                            <div className="flex flex-wrap gap-2">
                                <span className="bg-teal-500/20 backdrop-blur-md border border-teal-500/30 text-teal-300 font-bold px-3 py-1 rounded-lg text-xs tracking-wider uppercase">
                                    {shop.category}
                                </span>
                                {shop.isVerified && (
                                    <span className="bg-blue-500 text-white px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 border border-blue-400 shadow-lg shadow-blue-500/20">
                                        <BadgeCheck size={14} fill="currentColor" className="text-white" />
                                        Verified
                                    </span>
                                )}
                            </div>

                            {/* Name */}
                            <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                                {shop.name}
                            </h1>

                            {/* Location & Rating */}
                            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-slate-300 font-medium text-sm md:text-base">
                                {hasAddress && (
                                    <span className="flex items-center gap-1.5">
                                        <MapPin size={18} className="text-white" /> {shop.area || shop.address}
                                    </span>
                                )}
                                <span className="flex items-center gap-1.5 text-yellow-400">
                                    <Star size={18} fill="currentColor" /> {shop.rating} <span className="text-slate-400 font-normal">({shop.reviewCount || '100+'} Reviews)</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-20 pb-12">
                <div className="bg-white rounded-t-[2rem] rounded-b-[2rem] md:rounded-b-none min-h-[500px] shadow-2xl shadow-slate-200/50 overflow-hidden border border-slate-100">

                    {/* Tabs Navigation */}
                    <div className="flex border-b border-slate-100 bg-white sticky top-0 z-30">
                        <button
                            onClick={() => setActiveTab('offers')}
                            className={`flex-1 py-5 md:py-6 flex items-center justify-center gap-2.5 text-sm md:text-base font-bold tracking-wide border-b-[3px] transition-all hover:bg-slate-50 ${activeTab === 'offers'
                                ? 'border-primary text-primary bg-primary/5'
                                : 'border-transparent text-slate-400 hover:text-slate-600'
                                }`}
                        >
                            <LayoutGrid size={20} />
                            ACTIVE OFFERS ({offers.length})
                        </button>
                        <button
                            onClick={() => setActiveTab('about')}
                            className={`flex-1 py-5 md:py-6 flex items-center justify-center gap-2.5 text-sm md:text-base font-bold tracking-wide border-b-[3px] transition-all hover:bg-slate-50 ${activeTab === 'about'
                                ? 'border-primary text-primary bg-primary/5'
                                : 'border-transparent text-slate-400 hover:text-slate-600'
                                }`}
                        >
                            <Info size={20} />
                            ABOUT & CONTACT
                        </button>
                    </div>

                    {/* Tab Content */}
                    <div className="p-6 md:p-8 bg-slate-50/50 min-h-[400px]">
                        {activeTab === 'offers' && (
                            <div className="animate-fadeIn">
                                {offers.length > 0 ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                        {offers.map((offer) => (
                                            <OfferCard
                                                key={offer.id}
                                                offer={offer}
                                                shopName={shop.name}
                                                onViewClick={setSelectedOffer}
                                                showVisitShop={false}
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-24 flex flex-col items-center">
                                        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6 text-slate-300">
                                            <LayoutGrid size={32} />
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900 mb-2">No Active Offers</h3>
                                        <p className="text-slate-500 max-w-md mx-auto">This shop hasn't posted any offers at the moment. Check back later or contact them directly.</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'about' && (
                            <div className="animate-fadeIn max-w-7xl mx-auto">
                                <div className={`grid grid-cols-1 ${hasSocialMedia ? 'lg:grid-cols-3' : 'lg:grid-cols-3 lg:gap-8'} gap-8`}>

                                    {/* Left Column (Details including Branches) */}
                                    <div className={`${hasSocialMedia ? 'lg:col-span-2' : 'lg:col-span-3'} space-y-8`}>

                                        {/* Contact & Location Card */}
                                        <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
                                            <div className="flex justify-between items-start mb-8">
                                                <h3 className="text-xl font-bold text-slate-900">Contact & Location</h3>
                                                {hasAddress && (
                                                    <a
                                                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${shop.address} ${shop.area}`)}`}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="flex items-center gap-2 text-secondary font-bold text-sm hover:underline"
                                                    >
                                                        <Navigation size={16} /> Get Directions
                                                    </a>
                                                )}
                                            </div>

                                            <div className="grid md:grid-cols-2 gap-8 mb-8">
                                                {/* Address */}
                                                {hasAddress && (
                                                    <div className="flex gap-4">
                                                        <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center shrink-0 text-secondary">
                                                            <MapPin size={24} />
                                                        </div>
                                                        <div>
                                                            <h4 className="font-bold text-xs text-slate-400 uppercase tracking-wider mb-1">Address</h4>
                                                            <p className="font-medium text-slate-900 leading-snug">{shop.address}{shop.area ? `, ${shop.area}` : ''}, Theni</p>
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Phone */}
                                                {hasPhone && (
                                                    <div className="flex gap-4">
                                                        <a href={`tel:${shop.contactNumber}`} className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 text-primary hover:bg-primary hover:text-white transition-colors">
                                                            <Phone size={24} />
                                                        </a>
                                                        <div>
                                                            <h4 className="font-bold text-xs text-slate-400 uppercase tracking-wider mb-1">Phone</h4>
                                                            <a href={`tel:${shop.contactNumber}`} className="font-medium text-slate-900 leading-snug hover:text-primary transition-colors">
                                                                {shop.contactNumber}
                                                            </a>
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Hours - Only show if data exists */}
                                                {hasHours && (
                                                    <div className="flex gap-4 md:col-span-2">
                                                        <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0 text-blue-500">
                                                            <Clock size={24} />
                                                        </div>
                                                        <div>
                                                            <h4 className="font-bold text-xs text-slate-400 uppercase tracking-wider mb-1">Opening Hours</h4>
                                                            <p className="font-medium text-slate-900 leading-snug whitespace-pre-line">
                                                                {shop.openingHours}
                                                            </p>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Map Embed - Only if address exists */}
                                            {hasAddress && (
                                                <div className="w-full h-64 bg-slate-100 rounded-3xl overflow-hidden border border-slate-200">
                                                    <iframe
                                                        title="Map"
                                                        width="100%"
                                                        height="100%"
                                                        frameBorder="0"
                                                        style={{ border: 0 }}
                                                        src={`https://maps.google.com/maps?q=${encodeURIComponent(`${shop.address} ${shop.area}, Theni`)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                                                        allowFullScreen
                                                    ></iframe>
                                                </div>
                                            )}
                                        </div>

                                    </div>

                                    {/* Right Column (Connect Online - Global) */}
                                    {hasSocialMedia && (
                                        <div className="space-y-8">
                                            <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm sticky top-24">
                                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-6">Connect Online</h3>

                                                <div className="space-y-4">
                                                    {/* WhatsApp */}
                                                    {shop.socialMedia?.whatsapp && (
                                                        <a
                                                            href={`https://wa.me/${shop.socialMedia.whatsapp.replace(/\D/g, '')}`}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="flex items-center gap-4 p-4 rounded-2xl bg-[#effbf5] hover:bg-[#e2f7eb] transition-colors group"
                                                        >
                                                            <div className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center">
                                                                <MessageCircle size={18} />
                                                            </div>
                                                            <span className="font-bold text-[#145a32]">Chat on WhatsApp</span>
                                                        </a>
                                                    )}

                                                    {/* Website */}
                                                    {shop.socialMedia?.website && (
                                                        <a href={shop.socialMedia.website} target="_blank" rel="noreferrer" className="flex items-center gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-colors text-slate-600 hover:text-slate-900">
                                                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                                                                <Globe size={18} />
                                                            </div>
                                                            <span className="font-bold">Visit Website</span>
                                                        </a>
                                                    )}

                                                    {/* Instagram */}
                                                    {shop.socialMedia?.instagram && (
                                                        <a href={shop.socialMedia.instagram} target="_blank" rel="noreferrer" className="flex items-center gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-colors text-slate-600 hover:text-slate-900">
                                                            <div className="w-8 h-8 rounded-full bg-pink-50 flex items-center justify-center text-[#E1306C]">
                                                                <Instagram size={18} />
                                                            </div>
                                                            <span className="font-bold">Instagram</span>
                                                        </a>
                                                    )}

                                                    {/* Facebook */}
                                                    {shop.socialMedia?.facebook && (
                                                        <a href={shop.socialMedia.facebook} target="_blank" rel="noreferrer" className="flex items-center gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-colors text-slate-600 hover:text-slate-900">
                                                            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-[#1877F2]">
                                                                <Facebook size={18} />
                                                            </div>
                                                            <span className="font-bold">Facebook</span>
                                                        </a>
                                                    )}

                                                    {/* LinkedIn / Other */}
                                                    {shop.socialMedia?.linkedin && (
                                                        <a href={shop.socialMedia.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-colors text-slate-600 hover:text-slate-900">
                                                            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-[#0A66C2]">
                                                                <Globe size={18} /> {/* Using Globe for LinkedIn, could be a specific LinkedIn icon if available */}
                                                            </div>
                                                            <span className="font-bold">LinkedIn</span>
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Offer Modal */}
            {selectedOffer && (
                <OfferModal
                    offer={selectedOffer}
                    onClose={() => setSelectedOffer(null)}
                    showVisitShop={false}
                />
            )}
        </div>
    );
};

export default ShopDetail;

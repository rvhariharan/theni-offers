import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import OfferCard from '../components/OfferCard';
import JobCard from '../components/JobCard'; // Assuming reuse, though design differs slightly
import OfferModal from '../components/OfferModal';
import { MapPin, Phone, Globe, Facebook, Instagram, Linkedin, Star, BadgeCheck, Clock, Share2, MessageCircle, ArrowLeft } from 'lucide-react';

const ShopDetail = () => {
    const { id } = useParams();
    const [shop, setShop] = useState(null);
    const [offers, setOffers] = useState([]);
    const [selectedOffer, setSelectedOffer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('offers'); // 'offers', 'about', 'reviews'

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

    return (
        <div className="bg-slate-50 min-h-screen pb-12">
            {/* Header / Cover Image */}
            <div className="relative h-64 md:h-80 lg:h-96 w-full overflow-hidden">
                <img src={shop.image} alt={shop.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>

                <div className="absolute top-4 left-4 z-20">
                    <Link to="/shops" className="bg-white/20 backdrop-blur-md hover:bg-white text-white hover:text-slate-900 p-2.5 rounded-full transition-all flex items-center gap-2 group border border-white/10">
                        <ArrowLeft size={20} />
                        <span className="font-bold text-sm pr-2 hidden group-hover:block animate-fadeIn">Back</span>
                    </Link>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative -mt-32 md:-mt-40 z-10">
                {/* Shop Info Card */}
                <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 p-6 md:p-10 mb-8 animate-slideUp">
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        {/* Logo */}
                        <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl bg-white p-2 shadow-lg border-4 border-white shrink-0 mx-auto md:mx-0 -mt-16 md:-mt-20 overflow-hidden relative group">
                            <img src={shop.logo} alt="Logo" className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500" />
                            {shop.isVerified && (
                                <div className="absolute bottom-2 right-2 bg-blue-500 text-white p-1 rounded-full border-2 border-white" title="Verified Business">
                                    <BadgeCheck size={16} fill="currentColor" className="text-white" />
                                </div>
                            )}
                        </div>

                        {/* Details */}
                        <div className="flex-1 text-center md:text-left space-y-4 w-full">
                            <div>
                                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-2 justify-center md:justify-start">
                                    <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">{shop.name}</h1>
                                    <div className="flex items-center gap-1 bg-green-50 text-green-700 px-2 py-1 rounded-lg text-sm font-bold border border-green-100 self-center md:self-auto">
                                        <span>{shop.rating}</span> <Star size={12} fill="currentColor" />
                                    </div>
                                </div>
                                <div className="flex flex-wrap items-center justify-center md:justify-start gap-y-2 gap-x-4 text-slate-500 font-medium text-sm">
                                    <span className="text-primary bg-primary/5 px-2 py-0.5 rounded-md font-bold uppercase text-xs tracking-wide">{shop.category}</span>
                                    <span className="flex items-center gap-1"><MapPin size={14} /> {shop.area}, Theni</span>
                                    {shop.isPremium && <span className="flex items-center gap-1 text-amber-500 font-bold"><Star size={14} fill="currentColor" /> Premium Partner</span>}
                                </div>
                            </div>

                            <p className="text-slate-600 leading-relaxed max-w-3xl mx-auto md:mx-0">{shop.description}</p>

                            {/* Actions & Socials */}
                            <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-4 border-t border-slate-100">
                                <div className="flex gap-3">
                                    <a href={`tel:${shop.contactNumber}`} className="bg-slate-900 text-white hover:bg-primary px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-slate-200">
                                        <Phone size={18} /> <span className="hidden sm:inline">Call Now</span>
                                    </a>
                                    <a href={`https://wa.me/91${shop.contactNumber}`} target="_blank" rel="noreferrer" className="bg-[#25D366] text-white hover:bg-[#20bd5a] px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-green-100">
                                        <MessageCircle size={18} /> <span className="hidden sm:inline">WhatsApp</span>
                                    </a>
                                    <button className="bg-slate-100 text-slate-600 hover:bg-slate-200 p-3 rounded-xl transition-colors" title="Share Profile">
                                        <Share2 size={20} />
                                    </button>
                                </div>

                                <div className="flex gap-4">
                                    {shop.socialMedia?.website && (
                                        <a href={shop.socialMedia.website} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-50 text-slate-400 hover:bg-primary hover:text-white flex items-center justify-center transition-all">
                                            <Globe size={18} />
                                        </a>
                                    )}
                                    {shop.socialMedia?.facebook && (
                                        <a href={shop.socialMedia.facebook} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-50 text-slate-400 hover:bg-[#1877F2] hover:text-white flex items-center justify-center transition-all">
                                            <Facebook size={18} />
                                        </a>
                                    )}
                                    {shop.socialMedia?.instagram && (
                                        <a href={shop.socialMedia.instagram} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-50 text-slate-400 hover:bg-[#E1306C] hover:text-white flex items-center justify-center transition-all">
                                            <Instagram size={18} />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="border-b border-slate-200 mb-8 flex gap-8 overflow-x-auto scrollbar-hide">
                    {['Offers', 'About', 'Photos', 'Reviews'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab.toLowerCase())}
                            className={`pb-4 px-2 text-sm font-bold uppercase tracking-wider border-b-2 transition-colors whitespace-nowrap ${activeTab === tab.toLowerCase() ? 'border-primary text-primary' : 'border-transparent text-slate-400 hover:text-slate-600'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Content: Active Tab - Offers */}
                {activeTab === 'offers' && (
                    <div className="animate-fadeIn">
                        <div className="flex justify-between items-end mb-6">
                            <h2 className="text-xl font-bold text-slate-900">Active Offers ({offers.length})</h2>
                        </div>
                        {offers.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {offers.map((offer) => (
                                    <OfferCard
                                        key={offer.id}
                                        offer={offer}
                                        shopName={shop.name} // Pass shop name if needed inside card, though typically redundant on shop page
                                        onViewClick={setSelectedOffer}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
                                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                                    <BadgeCheck size={32} />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900">No Active Offers</h3>
                                <p className="text-slate-500 text-sm">This shop hasn't posted any offers yet.</p>
                            </div>
                        )}
                    </div>
                )}

                {/* Mock Content for other tabs */}
                {activeTab === 'about' && (
                    <div className="bg-white rounded-3xl p-8 border border-slate-100 animate-fadeIn">
                        <h3 className="text-xl font-bold mb-4">About {shop.name}</h3>
                        <div className="space-y-4 text-slate-600 leading-relaxed">
                            <p>{shop.description}</p>
                            <p>Located in the heart of {shop.area}, we have been serving the Theni community for over 5 years. We pride ourselves on quality and customer satisfaction.</p>

                            <div className="grid md:grid-cols-2 gap-6 mt-6">
                                <div className="bg-slate-50 p-4 rounded-xl">
                                    <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2"><Clock size={16} /> Opening Hours</h4>
                                    <ul className="text-sm space-y-1">
                                        <li className="flex justify-between"><span>Mon - Sat</span> <span className="font-bold">9:00 AM - 9:00 PM</span></li>
                                        <li className="flex justify-between text-red-500"><span>Sunday</span> <span className="font-bold">Closed</span></li>
                                    </ul>
                                </div>
                                <div className="bg-slate-50 p-4 rounded-xl">
                                    <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2"><MapPin size={16} /> Address</h4>
                                    <p className="text-sm">{shop.address}</p>
                                    <p className="text-sm">{shop.area}, Theni - 625531</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {selectedOffer && (
                <OfferModal offer={selectedOffer} onClose={() => setSelectedOffer(null)} />
            )}
        </div>
    );
};

export default ShopDetail;

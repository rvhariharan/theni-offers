import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import { Shop, Offer } from '../types';
import OfferCard from '../components/OfferCard';
import OfferModal from '../components/OfferModal';
import { MapPin, Phone, Star, BadgeCheck, Facebook, Instagram, Linkedin, MessageCircle, Globe, Clock, ChevronLeft, Share2, Grid, Info, Navigation, Map } from 'lucide-react';
import AdBanner from '../components/AdBanner';

const ShopDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [shop, setShop] = useState<Shop | null>(null);
    const [relatedOffers, setRelatedOffers] = useState<Offer[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
    const [activeTab, setActiveTab] = useState<'offers' | 'about'>('offers');

    useEffect(() => {
        window.scrollTo(0, 0); // Ensure page starts at top
        const fetchShopData = async () => {
            if (!id) return;
            setLoading(true);
            const shopData = await api.getShopById(id);
            if (shopData) {
                setShop(shopData);
                const allOffers = await api.getOffers();
                setRelatedOffers(allOffers.filter(o => o.shopId === id));
            }
            setLoading(false);
        };
        fetchShopData();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-white">
                <div className="h-80 bg-gray-100 animate-shimmer"></div>
                <div className="max-w-7xl mx-auto px-4 -mt-20 relative z-10">
                    <div className="bg-white h-40 rounded-3xl shadow-sm animate-pulse mb-8"></div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="h-80 bg-gray-50 rounded-2xl animate-pulse"></div>
                        <div className="h-80 bg-gray-50 rounded-2xl animate-pulse"></div>
                        <div className="h-80 bg-gray-50 rounded-2xl animate-pulse"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (!shop) return <div className="min-h-screen flex items-center justify-center font-bold text-xl text-gray-500">Shop not found</div>;

    const mapQuery = encodeURIComponent(`${shop.name}, ${shop.address}, ${shop.area}`);

    return (
        <div className="min-h-screen bg-white pb-20">

            {/* 1. Immersive Header */}
            <div className="relative h-[40vh] md:h-[50vh] w-full overflow-hidden">
                <div className="absolute top-4 left-4 z-20">
                    <Link to="/shops" className="bg-white/20 backdrop-blur-md hover:bg-white/40 text-white p-3 rounded-full transition-colors flex items-center justify-center">
                        <ChevronLeft size={24} />
                    </Link>
                </div>
                <div className="absolute top-4 right-4 z-20">
                    <button className="bg-white/20 backdrop-blur-md hover:bg-white/40 text-white p-3 rounded-full transition-colors flex items-center justify-center">
                        <Share2 size={24} />
                    </button>
                </div>

                <img src={shop.image} alt={shop.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent"></div>

                <div className="absolute bottom-0 left-0 w-full p-4 md:p-8 pb-24 md:pb-28">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-end gap-6">
                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-white p-1 shadow-2xl overflow-hidden shrink-0">
                            <img src={shop.logo} alt="Logo" className="w-full h-full object-cover rounded-xl" />
                        </div>
                        <div className="flex-1 text-white pb-2">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wide border border-white/20">{shop.category}</span>
                                {shop.isVerified && (
                                    <span className="flex items-center gap-1 bg-secondary backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold border border-white/20 text-white">
                                        <BadgeCheck size={12} fill="currentColor" className="text-white" /> Verified
                                    </span>
                                )}
                            </div>
                            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight drop-shadow-lg mb-2">{shop.name}</h1>
                            <div className="flex items-center gap-4 text-sm md:text-base font-medium text-white/80">
                                <div className="flex items-center gap-1">
                                    <MapPin size={16} /> {shop.area}
                                </div>
                                <div className="flex items-center gap-1 text-secondary">
                                    <Star size={16} fill="currentColor" /> {shop.rating} (120+ Reviews)
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. Main Content Card */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
                <div className="bg-white rounded-3xl shadow-xl border border-primary/10 overflow-hidden min-h-[500px]">

                    {/* Tabs */}
                    <div className="flex border-b border-primary/10">
                        <button
                            onClick={() => setActiveTab('offers')}
                            className={`flex-1 py-5 text-center font-bold text-sm uppercase tracking-wider transition-colors border-b-2 ${activeTab === 'offers' ? 'border-primary text-primary' : 'border-transparent text-primary/40 hover:text-primary/70'}`}
                        >
                            <span className="flex items-center justify-center gap-2"><Grid size={18} /> Active Offers ({relatedOffers.length})</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('about')}
                            className={`flex-1 py-5 text-center font-bold text-sm uppercase tracking-wider transition-colors border-b-2 ${activeTab === 'about' ? 'border-primary text-primary' : 'border-transparent text-primary/40 hover:text-primary/70'}`}
                        >
                            <span className="flex items-center justify-center gap-2"><Info size={18} /> About & Contact</span>
                        </button>
                    </div>

                    <div className="p-6 md:p-10 bg-primary/5 min-h-[60vh]">
                        {activeTab === 'offers' && (
                            <div className="animate-fadeIn">
                                {relatedOffers.length > 0 ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                                        {relatedOffers.map(offer => (
                                            <OfferCard
                                                key={offer.id}
                                                offer={offer}
                                                onViewClick={setSelectedOffer}
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-20 text-center">
                                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4">
                                            <Grid size={32} className="text-primary/30" />
                                        </div>
                                        <h3 className="text-xl font-bold text-primary mb-2">No active offers</h3>
                                        <p className="text-primary/60">This shop hasn't posted any offers yet. Check back later!</p>
                                    </div>
                                )}
                                <div className="mt-12">
                                    <AdBanner placement="detail_page" className="rounded-2xl shadow-sm" />
                                </div>
                            </div>
                        )}

                        {activeTab === 'about' && (
                            <div className="animate-fadeIn grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
                                <div className="lg:col-span-2 space-y-8">
                                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-primary/10">
                                        <h3 className="text-xl font-bold text-primary mb-4">About {shop.name}</h3>
                                        <p className="text-primary/70 leading-relaxed text-lg">{shop.description}</p>
                                    </div>

                                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-primary/10">
                                        <div className="flex justify-between items-center mb-6">
                                            <h3 className="text-xl font-bold text-primary">Contact & Location</h3>
                                            <a
                                                href={`https://www.google.com/maps/dir/?api=1&destination=${mapQuery}`}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="flex items-center gap-2 text-sm font-bold text-secondary hover:underline"
                                            >
                                                <Navigation size={16} /> Get Directions
                                            </a>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                                            <div className="flex items-start gap-4">
                                                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                                    <MapPin size={20} />
                                                </div>
                                                <div>
                                                    <p className="text-xs font-bold text-primary/40 uppercase mb-1">Address</p>
                                                    <p className="font-medium text-primary/80 leading-snug">{shop.address}, {shop.area}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-4">
                                                <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                                                    <Phone size={20} />
                                                </div>
                                                <div>
                                                    <p className="text-xs font-bold text-primary/40 uppercase mb-1">Phone</p>
                                                    <p className="font-medium text-primary/80">{shop.contactNumber}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-4">
                                                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                                    <Clock size={20} />
                                                </div>
                                                <div>
                                                    <p className="text-xs font-bold text-primary/40 uppercase mb-1">Opening Hours</p>
                                                    <p className="font-medium text-primary/80">Mon - Sat: 9:00 AM - 9:00 PM</p>
                                                    <p className="text-sm text-red-500 font-medium">Sun: Closed</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Map Embed */}
                                        <div className="w-full h-64 bg-primary/5 rounded-xl overflow-hidden border border-primary/10 relative group">
                                            <iframe
                                                width="100%"
                                                height="100%"
                                                frameBorder="0"
                                                scrolling="no"
                                                src={`https://maps.google.com/maps?q=${mapQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                                                title="Shop Location"
                                                className="filter grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
                                            ></iframe>
                                            <a
                                                href={`https://www.google.com/maps/dir/?api=1&destination=${mapQuery}`}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="absolute bottom-3 right-3 bg-white text-primary text-xs font-bold px-3 py-2 rounded-lg shadow-md hover:bg-primary hover:text-white transition-colors flex items-center gap-1 opacity-90 hover:opacity-100"
                                            >
                                                <Map size={14} /> Open Map
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div className="lg:col-span-1 space-y-6">
                                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-primary/10">
                                        <h3 className="text-sm font-bold text-primary/40 uppercase mb-4 tracking-wider">Connect Online</h3>
                                        <div className="flex flex-col gap-3">
                                            {shop.socialMedia?.whatsapp && (
                                                <a href={`https://wa.me/${shop.socialMedia.whatsapp}`} target="_blank" rel="noreferrer" className="flex items-center gap-3 p-3 rounded-xl bg-green-50 text-green-700 hover:bg-green-100 transition-colors group">
                                                    <div className="w-8 h-8 rounded-full bg-green-200 flex items-center justify-center text-green-700 group-hover:scale-110 transition-transform"><MessageCircle size={16} /></div>
                                                    <span className="font-bold">Chat on WhatsApp</span>
                                                </a>
                                            )}
                                            {shop.socialMedia?.website && (
                                                <a href={shop.socialMedia.website} target="_blank" rel="noreferrer" className="flex items-center gap-3 p-3 rounded-xl hover:bg-primary/5 transition-colors group">
                                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors"><Globe size={16} /></div>
                                                    <span className="font-medium text-primary">Visit Website</span>
                                                </a>
                                            )}
                                            {shop.socialMedia?.instagram && (
                                                <a href={shop.socialMedia.instagram} target="_blank" rel="noreferrer" className="flex items-center gap-3 p-3 rounded-xl hover:bg-primary/5 transition-colors group">
                                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors"><Instagram size={16} /></div>
                                                    <span className="font-medium text-primary">Instagram</span>
                                                </a>
                                            )}
                                            {shop.socialMedia?.facebook && (
                                                <a href={shop.socialMedia.facebook} target="_blank" rel="noreferrer" className="flex items-center gap-3 p-3 rounded-xl hover:bg-primary/5 transition-colors group">
                                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors"><Facebook size={16} /></div>
                                                    <span className="font-medium text-primary">Facebook</span>
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                    <AdBanner placement="sidebar" className="rounded-2xl shadow-sm" />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Sticky Mobile Call Bar with WhatsApp */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-primary/10 md:hidden z-40 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
                <div className={`grid ${shop.socialMedia?.whatsapp ? 'grid-cols-2' : 'grid-cols-1'} gap-3`}>
                    <a
                        href={`tel:${shop.contactNumber}`}
                        className="flex items-center justify-center gap-2 bg-primary text-white font-bold py-3.5 rounded-xl shadow-lg shadow-primary/20 active:scale-95 transition-transform"
                    >
                        <Phone size={20} /> Call Now
                    </a>

                    {shop.socialMedia?.whatsapp && (
                        <a
                            href={`https://wa.me/${shop.socialMedia.whatsapp}`}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold py-3.5 rounded-xl shadow-lg shadow-green-500/20 active:scale-95 transition-transform"
                        >
                            <MessageCircle size={20} /> WhatsApp
                        </a>
                    )}
                </div>
            </div>

            {selectedOffer && (
                <OfferModal offer={selectedOffer} onClose={() => setSelectedOffer(null)} />
            )}
        </div>
    );
};

export default ShopDetail;
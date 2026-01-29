import React, { useEffect, useState, useRef } from 'react';
import { Offer, Shop } from '../types';
import { X, Download, MapPin, Phone, Calendar, BadgeCheck, QrCode, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import html2canvas from 'html2canvas';

interface OfferModalProps {
    offer: Offer;
    onClose: () => void;
}

const OfferModal: React.FC<OfferModalProps> = ({ offer, onClose }) => {
    const [shop, setShop] = useState<Shop | undefined>();
    const ticketRef = useRef<HTMLDivElement>(null);
    const [isDownloading, setIsDownloading] = useState(false);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        const fetchShop = async () => {
            const data = await api.getShopById(offer.shopId);
            setShop(data);
        };
        fetchShop();
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [offer.shopId]);

    const handleDownload = async () => {
        if (!ticketRef.current) return;
        setIsDownloading(true);

        try {
            const canvas = await html2canvas(ticketRef.current, {
                useCORS: true, // Crucial for loading external images
                scale: 2, // Higher resolution
                backgroundColor: null, // Transparent background if rounded corners
            });

            const image = canvas.toDataURL("image/png");
            const link = document.createElement("a");
            link.href = image;
            link.download = `TheniOffers_${offer.title.substring(0, 10).replace(/\s/g, '')}.png`;
            link.click();
        } catch (error) {
            console.error("Download failed:", error);
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-end md:items-center justify-center animate-fadeIn p-0 md:p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-primary/95 backdrop-blur-sm" onClick={onClose} />

            {/* Scrollable Container for Mobile */}
            <div className="relative z-10 w-full max-h-screen overflow-y-auto flex justify-center py-4 md:py-0">

                {/* Close Button Mobile (Floating) */}
                <button
                    onClick={onClose}
                    className="md:hidden fixed top-4 right-4 z-50 bg-black/50 text-white p-2 rounded-full"
                >
                    <X size={24} />
                </button>

                {/* TICKET CONTAINER */}
                <div
                    className="w-full max-w-sm md:max-w-md bg-transparent relative animate-slideUp my-auto"
                    onClick={e => e.stopPropagation()}
                >
                    {/* The Actual Capture Area */}
                    <div ref={ticketRef} className="bg-white rounded-[2rem] overflow-hidden shadow-2xl relative">

                        {/* 1. Header Image Section */}
                        <div className="relative h-64">
                            <img
                                src={offer.image}
                                alt={offer.title}
                                className="w-full h-full object-cover"
                                crossOrigin="anonymous" // Important for html2canvas
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                            {/* Top Content */}
                            <div className="absolute top-0 left-0 right-0 p-5 flex justify-between items-start">
                                <div className="bg-white/20 backdrop-blur-md border border-white/20 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                    {offer.category}
                                </div>
                                <div className="w-12 h-12 bg-white rounded-xl p-1 shadow-lg">
                                    {shop?.logo && <img src={shop.logo} alt="Logo" className="w-full h-full object-cover rounded-lg" crossOrigin="anonymous" />}
                                </div>
                            </div>

                            {/* Offer Title & Shop */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                <h2 className="text-2xl font-bold leading-tight mb-2 drop-shadow-md">{offer.title}</h2>
                                <div className="flex items-center gap-2 text-white/80 text-sm font-medium">
                                    <span>by {shop?.name}</span>
                                    {shop?.isVerified && <BadgeCheck size={14} className="text-secondary fill-white/10" />}
                                </div>
                            </div>
                        </div>

                        {/* 2. Middle Section (Perforated) */}
                        <div className="relative bg-white px-6 py-6">
                            {/* Perforation Circles */}
                            <div className="absolute -top-3 left-0 w-6 h-6 bg-primary/95 rounded-full translate-x-[-50%]"></div>
                            <div className="absolute -top-3 right-0 w-6 h-6 bg-primary/95 rounded-full translate-x-[50%]"></div>
                            {/* Dashed Line */}
                            <div className="absolute top-0 left-4 right-4 border-t-2 border-dashed border-primary/20"></div>

                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <p className="text-xs font-bold text-primary/50 uppercase mb-1">Discount</p>
                                    <p className="text-4xl font-extrabold text-primary">{offer.discountPercentage}% OFF</p>
                                </div>
                                <div className="text-right">
                                    {offer.offerPrice && (
                                        <>
                                            <p className="text-xs font-bold text-primary/50 uppercase mb-1">Price</p>
                                            <div className="flex flex-col items-end">
                                                <span className="text-xl font-bold text-primary">₹{offer.offerPrice}</span>
                                                {offer.originalPrice && (
                                                    <span className="text-sm text-primary/40 line-through">₹{offer.originalPrice}</span>
                                                )}
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-3 mb-6">
                                <div className="flex items-center gap-3 bg-primary/5 p-3 rounded-xl border border-primary/10">
                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                        <Calendar size={16} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-primary/50 uppercase">Valid Until</p>
                                        <p className="text-sm font-bold text-primary">{new Date(offer.validUntil).toLocaleDateString()}</p>
                                    </div>
                                </div>

                                {offer.code && (
                                    <div className="flex items-center gap-3 bg-secondary/10 p-3 rounded-xl border border-secondary/20">
                                        <div className="w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center">
                                            <QrCode size={16} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-secondary uppercase">Coupon Code</p>
                                            <p className="text-lg font-mono font-bold text-secondary tracking-wide">{offer.code}</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="text-xs text-center text-primary/40 border-t border-primary/10 pt-4">
                                <p className="mb-2">Show this ticket at the counter to redeem</p>
                                <div className="flex justify-center gap-4 text-[10px] font-medium text-primary/30">
                                    <span>#{offer.id.toUpperCase()}</span>
                                    <span>•</span>
                                    <span>TERMS APPLY</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ACTION BUTTONS (Outside Capture Ref) */}
                    <div className="mt-6 flex flex-col gap-3 px-4 pb-8 md:pb-0">
                        <button
                            onClick={handleDownload}
                            disabled={isDownloading}
                            className="w-full bg-secondary text-white font-bold py-4 rounded-xl shadow-xl flex items-center justify-center gap-2 hover:bg-secondary/90 transition-colors active:scale-95"
                        >
                            {isDownloading ? (
                                <span>Generating Ticket...</span>
                            ) : (
                                <>
                                    <Download size={20} /> Download Ticket
                                </>
                            )}
                        </button>

                        <div className="grid grid-cols-2 gap-3">
                            <Link
                                to={`/shops/${offer.shopId}`}
                                className="bg-primary text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 text-sm hover:bg-white hover:text-primary border border-transparent hover:border-primary transition-colors"
                            >
                                Visit Shop
                            </Link>
                            <a
                                href={`tel:${shop?.contactNumber}`}
                                className="bg-primary text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 text-sm hover:bg-white hover:text-primary border border-transparent hover:border-primary transition-colors"
                            >
                                <Phone size={18} /> Call Now
                            </a>
                        </div>

                        <button onClick={onClose} className="mt-2 text-white/50 text-sm font-medium hover:text-white transition-colors">
                            Close Preview
                        </button>
                    </div>

                    {/* Close Button Desktop */}
                    <button
                        onClick={onClose}
                        className="hidden md:block absolute -top-2 -right-12 text-white/60 hover:text-white p-2 transition-colors"
                    >
                        <X size={32} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OfferModal;
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Eye, Percent, Clock } from 'lucide-react';

const OfferCard = ({ offer, shopName, onViewClick }) => {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    return (
        <div
            className="group bg-white rounded-3xl shadow-soft hover:shadow-hover transition-all duration-500 ease-out overflow-hidden flex flex-col h-full relative backface-hidden"
        >
            {/* Image Area */}
            <div
                className="relative overflow-hidden h-52 cursor-pointer"
                onClick={() => onViewClick && onViewClick(offer)}
            >
                <img
                    src={offer.image}
                    alt={offer.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />

                {/* Discount Badge */}
                <div className="absolute bottom-4 left-4 flex items-center bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg z-10 transform transition-transform group-hover:scale-105">
                    <div className="bg-secondary rounded-full p-0.5 mr-1.5">
                        <Percent className="h-3 w-3 text-white" />
                    </div>
                    <span className="font-extrabold text-sm text-primary">{offer.discountPercentage}% OFF</span>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 flex-1 flex flex-col">
                {/* Category Pill and Expiry */}
                <div className="mb-3 flex justify-between items-center">
                    <span className="inline-block px-2.5 py-1 rounded-lg text-[10px] font-bold bg-primary/5 text-primary uppercase tracking-wide group-hover:bg-primary/10 transition-colors">
                        {offer.category}
                    </span>
                    <div className="flex items-center text-[10px] font-bold text-secondary bg-secondary/10 px-2.5 py-1 rounded-lg border border-secondary/20">
                        <Clock size={12} className="mr-1.5" />
                        <span>Exp: {formatDate(offer.validUntil)}</span>
                    </div>
                </div>

                <h3
                    className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 leading-snug cursor-pointer hover:text-secondary transition-colors duration-300"
                    onClick={() => onViewClick && onViewClick(offer)}
                >
                    {offer.title}
                </h3>

                <p className="text-gray-500 text-sm mb-5 line-clamp-2 flex-1 leading-relaxed">{offer.description}</p>

                <div className="pt-4 border-t border-primary/10 mt-auto flex justify-between items-end">
                    <div className="space-y-1.5 flex-1 mr-4">
                        {shopName && (
                            <div className="font-bold text-gray-900 text-sm">{shopName}</div>
                        )}
                        <div className="flex items-center text-gray-500 text-xs font-medium">
                            <MapPin size={12} className="mr-1" />
                            <span className="truncate max-w-[120px]">{offer.location}</span>
                        </div>
                        {offer.offerPrice && (
                            <div className="flex items-center gap-2 mt-1">
                                <span className="font-bold text-lg text-primary">₹{offer.offerPrice}</span>
                                {offer.originalPrice && (
                                    <span className="text-xs text-gray-400 line-through decoration-gray-300">₹{offer.originalPrice}</span>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-2">
                        <Link
                            to={`/shops/${offer.shopId}`}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white border border-gray-200 hover:bg-primary hover:text-white text-gray-900 text-xs font-bold px-3 py-2 rounded-full transition-colors whitespace-nowrap shadow-sm"
                        >
                            Visit Shop
                        </Link>
                        <button
                            onClick={(e) => { e.stopPropagation(); onViewClick && onViewClick(offer); }}
                            className="w-10 h-10 rounded-full bg-primary/5 hover:bg-secondary hover:text-white text-primary flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1 group/btn"
                            aria-label="View Offer"
                        >
                            <Eye size={20} className="transform group-hover/btn:scale-110 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OfferCard;

import React from 'react';
import { MapPin, Star, Phone, ArrowRight, BadgeCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const ShopCard = ({ shop }) => {
    return (
        <div className="group bg-white rounded-3xl shadow-soft hover:shadow-hover transition-all duration-500 flex flex-col h-full relative overflow-visible">

            {/* Image Section with rounded top */}
            <div className="h-48 overflow-hidden relative rounded-t-3xl">
                <img src={shop.image} alt={shop.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />

                {/* Gradient Overlay for Text Visibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-90"></div>

                <div className="absolute bottom-4 left-4 right-4 flex items-end gap-3 z-20">
                    {/* Logo Container */}
                    <div className="w-16 h-16 rounded-xl border-[3px] border-white shadow-lg overflow-hidden bg-white shrink-0 group-hover:scale-105 transition-transform duration-300">
                        <img src={shop.logo} alt={shop.name} className="w-full h-full object-cover" />
                    </div>

                    <div className="flex-1 pb-1">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-secondary mb-1">
                            {shop.category}
                        </div>
                        <h3 className="text-lg font-bold text-white leading-tight drop-shadow-md flex items-center gap-1">
                            {shop.name}
                            {shop.isVerified && <BadgeCheck size={16} className="text-secondary fill-secondary/20 inline shrink-0" />}
                        </h3>
                    </div>
                </div>
            </div>

            <div className="p-6 flex-1 flex flex-col bg-white rounded-b-3xl -mt-0.5 relative z-10 border-t border-transparent">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center bg-gray-50 px-2.5 py-1 rounded-lg text-gray-700 text-xs font-bold border border-gray-100">
                        {shop.rating} <Star size={10} className="ml-1 fill-yellow-400 text-yellow-400" />
                    </div>
                    <span className="text-xs text-gray-400 font-medium">4.2 km away</span>
                </div>

                <div className="text-sm text-gray-500 space-y-3 mb-6 flex-1">
                    <div className="flex items-start">
                        <MapPin size={16} className="mt-0.5 mr-3 text-primary flex-shrink-0" />
                        <span className="line-clamp-2 leading-relaxed text-gray-600">{shop.address}, {shop.area}</span>
                    </div>
                    <div className="flex items-center">
                        <Phone size={16} className="mr-3 text-primary" />
                        <span className="text-gray-600">{shop.contactNumber}</span>
                    </div>
                </div>

                <Link
                    to={`/shops/${shop.id}`}
                    className="group/btn flex items-center justify-center w-full bg-primary hover:bg-secondary text-white py-3.5 rounded-2xl text-sm font-bold transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1"
                >
                    <span>Visit Store Profile</span>
                    <ArrowRight size={16} className="ml-2 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </Link>
            </div>
        </div>
    );
};

export default ShopCard;

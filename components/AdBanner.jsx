import React, { useEffect, useState } from 'react';
import { api } from '../services/api';

const AdBanner = ({ placement, className = '', adIndex }) => {
    const [ads, setAds] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchAds = async () => {
            const data = await api.getAds(placement);
            setAds(data);
        };
        fetchAds();
    }, [placement]);

    useEffect(() => {
        if (ads.length <= 1) return;

        // Auto-rotate every 5 seconds if multiple ads exist in this placement
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % ads.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [ads]);

    if (ads.length === 0) return null;

    // Use adIndex if provided to pick a specific ad from the fetched list
    // Otherwise, rotate through them
    const currentAd = adIndex !== undefined ? ads[adIndex % ads.length] : ads[currentIndex];

    if (!currentAd) return null;

    return (
        <div className={`relative overflow-hidden group w-full my-6 rounded-2xl shadow-lg border border-gray-100 ${className}`}>
            {currentAd.type === 'video' && currentAd.videoUrl ? (
                <video
                    src={currentAd.videoUrl}
                    poster={currentAd.imageUrl}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover relative z-10"
                />
            ) : (
                <img
                    src={currentAd.imageUrl}
                    alt={currentAd.title}
                    className="w-full h-full object-cover relative z-10 transition-transform duration-700 group-hover:scale-105"
                />
            )}

            {/* Overlay Text */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex items-end p-6">
                <div className="text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h4 className="font-bold text-lg mb-1">{currentAd.title}</h4>
                    <span className="text-xs font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md px-2 py-1 rounded">Sponsored</span>
                </div>
            </div>

            <a
                href={currentAd.redirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 z-30"
                aria-label={currentAd.title}
            />
        </div>
    );
};

export default AdBanner;

import React, { useEffect, useState } from 'react';
import { Ad } from '../types';
import { api } from '../services/api';

interface AdBannerProps {
  placement: Ad['placement'];
  className?: string;
  adIndex?: number; // Optional index to pick a specific ad from the list
}

const AdBanner: React.FC<AdBannerProps> = ({ placement, className = '', adIndex }) => {
  const [ads, setAds] = useState<Ad[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchAds = async () => {
      const data = await api.getAds(placement);
      setAds(data);
    };
    fetchAds();
  }, [placement]);

  useEffect(() => {
    if (ads.length > 1 && placement === 'home_banner') {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % ads.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [ads.length, placement]);

  if (ads.length === 0) return null;

  // Determine which ad to show:
  // 1. If adIndex is provided and valid, use it.
  // 2. If placement is home_banner, use the cycling currentIndex.
  // 3. Otherwise, default to the first ad (or you could randomize here).
  let displayAd = ads[0];
  
  if (adIndex !== undefined && ads[adIndex]) {
      displayAd = ads[adIndex];
  } else if (placement === 'home_banner') {
      displayAd = ads[currentIndex];
  } else if (placement === 'list_insert' && ads.length > 1) {
      // For list inserts without explicit index, maybe random or first? 
      // Let's default to first, but components can pass index for variety.
      displayAd = ads[0];
  }

  return (
    <div className={`w-full overflow-hidden rounded-2xl shadow-soft my-6 relative group ${className}`}>
      <a href={displayAd.redirectUrl} target="_blank" rel="noopener noreferrer" className="block relative h-full w-full">
        {/* Badge */}
        <div className="absolute top-4 right-4 bg-white/30 backdrop-blur-md border border-white/20 text-white text-[10px] px-3 py-1 rounded-full uppercase font-bold tracking-wider z-10 shadow-sm">
          Sponsored
        </div>
        
        {/* Media Container */}
        <div className="relative overflow-hidden aspect-[21/9] sm:aspect-[21/9] md:aspect-[3/1] max-h-80 w-full">
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10"></div>
            
            {displayAd.type === 'video' && displayAd.videoUrl ? (
                <video
                    src={displayAd.videoUrl}
                    poster={displayAd.imageUrl}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                />
            ) : (
                <img 
                    src={displayAd.imageUrl} 
                    alt={displayAd.title} 
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                />
            )}
        </div>

        {/* Content (Optional overlay text if needed) */}
        {(placement === 'home_banner' || placement === 'list_insert' || placement === 'detail_page') && (
            <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 hidden md:block">
                <h3 className="text-xl font-bold drop-shadow-md opacity-0 group-hover:opacity-100 transition-opacity delay-100">{displayAd.title}</h3>
            </div>
        )}

        {/* Dots for Carousel (Home Only) */}
        {placement === 'home_banner' && ads.length > 1 && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-20">
                {ads.map((_, idx) => (
                    <div 
                        key={idx} 
                        className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-6 bg-white shadow-lg' : 'w-1.5 bg-white/50'}`} 
                    />
                ))}
            </div>
        )}
      </a>
    </div>
  );
};

export default AdBanner;
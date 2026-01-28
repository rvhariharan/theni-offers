import React, { useRef, useEffect } from 'react';
import { CATEGORIES, CATEGORY_HIERARCHY } from '../services/mockData';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface CategoryFilterProps {
  selectedCategory: string;
  selectedSubCategory?: string;
  onCategorySelect: (category: string) => void;
  onSubCategorySelect?: (subCategory: string) => void;
  showSubCategories?: boolean;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  selectedSubCategory,
  onCategorySelect,
  onSubCategorySelect,
  showSubCategories = true
}) => {
  const categoryScrollRef = useRef<HTMLDivElement>(null);
  const subCategoryScrollRef = useRef<HTMLDivElement>(null);

  // Helper to scroll
  const scroll = (ref: React.RefObject<HTMLDivElement>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = 200;
      ref.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const getSubCategories = () => {
    if (selectedCategory && selectedCategory !== 'All' && CATEGORY_HIERARCHY[selectedCategory]) {
      return ['All', ...CATEGORY_HIERARCHY[selectedCategory]];
    }
    return [];
  };

  const subCategories = getSubCategories();

  // Reset subcategory if main category changes (handled by parent usually, but safer to check)
  useEffect(() => {
    if (onSubCategorySelect && selectedCategory === 'All') {
      onSubCategorySelect('');
    }
  }, [selectedCategory]);

  return (
    <div className="w-full space-y-4">
      {/* Main Categories Slider */}
      <div className="relative group">
        <button 
            onClick={() => scroll(categoryScrollRef, 'left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm p-1.5 rounded-full shadow-md text-gray-600 hover:text-primary opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0"
        >
            <ChevronLeft size={20} />
        </button>
        
        <div 
            ref={categoryScrollRef}
            className="flex items-center gap-3 overflow-x-auto scrollbar-hide px-1 py-2 snap-x"
        >
            <button
                onClick={() => onCategorySelect('All')}
                className={`flex-shrink-0 px-5 py-2.5 rounded-xl text-sm font-bold border transition-all whitespace-nowrap snap-start ${
                    selectedCategory === 'All' || !selectedCategory
                    ? 'bg-gray-900 text-white border-gray-900 shadow-md transform scale-105' 
                    : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                }`}
            >
                All Categories
            </button>
            {CATEGORIES.map((cat) => (
                <button
                    key={cat}
                    onClick={() => onCategorySelect(cat)}
                    className={`flex-shrink-0 px-5 py-2.5 rounded-xl text-sm font-bold border transition-all whitespace-nowrap snap-start ${
                        selectedCategory === cat 
                        ? 'bg-gray-900 text-white border-gray-900 shadow-md transform scale-105' 
                        : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                >
                    {cat}
                </button>
            ))}
        </div>

        <button 
            onClick={() => scroll(categoryScrollRef, 'right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm p-1.5 rounded-full shadow-md text-gray-600 hover:text-primary opacity-0 group-hover:opacity-100 transition-opacity"
        >
            <ChevronRight size={20} />
        </button>
      </div>

      {/* Sub Categories Slider */}
      {showSubCategories && selectedCategory !== 'All' && subCategories.length > 0 && (
        <div className="relative group animate-slideUp">
             <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-full bg-gradient-to-r from-slate-50 to-transparent pointer-events-none"></div>
             <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-full bg-gradient-to-l from-slate-50 to-transparent pointer-events-none"></div>

            <div 
                ref={subCategoryScrollRef}
                className="flex items-center gap-2 overflow-x-auto scrollbar-hide px-1 py-1"
            >
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wide mr-2 flex-shrink-0">
                    Filter by:
                </span>
                {subCategories.map((sub) => (
                    <button
                        key={sub}
                        onClick={() => onSubCategorySelect && onSubCategorySelect(sub)}
                        className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-bold border transition-all whitespace-nowrap ${
                            selectedSubCategory === sub || (sub === 'All' && !selectedSubCategory)
                            ? 'bg-primary/10 text-primary border-primary/20' 
                            : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300'
                        }`}
                    >
                        {sub}
                    </button>
                ))}
            </div>
        </div>
      )}
    </div>
  );
};

export default CategoryFilter;
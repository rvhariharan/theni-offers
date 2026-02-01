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
      const scrollAmount = 300;
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

  // Reset subcategory if main category changes
  useEffect(() => {
    if (onSubCategorySelect && selectedCategory === 'All') {
      onSubCategorySelect('');
    }
  }, [selectedCategory]);

  return (
    <div className="w-full space-y-6">
      {/* Main Categories Slider */}
      <div className="relative group">
        <button
          onClick={() => scroll(categoryScrollRef, 'left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm p-1.5 rounded-full shadow-md text-primary hover:text-secondary opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0"
        >
          <ChevronLeft size={20} />
        </button>

        <div
          ref={categoryScrollRef}
          className="flex items-center gap-3 overflow-x-auto scrollbar-hide px-1 py-2 snap-x"
        >
          <button
            onClick={() => onCategorySelect('All')}
            className={`flex-shrink-0 px-5 py-2.5 rounded-xl text-sm font-bold border transition-all whitespace-nowrap snap-start ${selectedCategory === 'All' || !selectedCategory
              ? 'bg-primary text-white border-primary shadow-md transform scale-105'
              : 'bg-white border-primary/20 text-primary/80 hover:border-primary/40 hover:bg-primary/5 hover:text-primary'
              }`}
          >
            All Categories
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategorySelect(cat)}
              className={`flex-shrink-0 px-5 py-2.5 rounded-xl text-sm font-bold border transition-all whitespace-nowrap snap-start ${selectedCategory === cat
                ? 'bg-primary text-white border-primary shadow-md transform scale-105'
                : 'bg-white border-primary/20 text-primary/80 hover:border-primary/40 hover:bg-primary/5 hover:text-primary'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <button
          onClick={() => scroll(categoryScrollRef, 'right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm p-1.5 rounded-full shadow-md text-primary hover:text-secondary opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Sub Categories Slider */}
      {showSubCategories && selectedCategory !== 'All' && subCategories.length > 0 && (
        <div className="relative group animate-slideUp">
          <div className="absolute left-0 top-1/3 -translate-y-1/2 z-10 w-8 h-full bg-gradient-to-r from-blue to-transparent pointer-events-none"></div>
          <div className="absolute right-0 top-1/3 -translate-y-1/2 z-10 w-8 h-full bg-gradient-to-l from-blue to-transparent pointer-events-none"></div>

          <div
            ref={subCategoryScrollRef}
            className="flex items-center gap-1 overflow-x-auto scrollbar-hide px-1 py-1"
          >
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wide mr-1 flex-shrink-0">
              Filter by:
            </span>
            {subCategories.map((sub) => (
              <button
                key={sub}
                onClick={() => onSubCategorySelect && onSubCategorySelect(sub)}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-bold border transition-all whitespace-nowrap ${selectedSubCategory === sub || (sub === 'All' && !selectedSubCategory)
                  ? 'bg-primary/10 text-primary border-primary/20 shadow-sm'
                  : 'bg-white border-primary/10 text-primary/60 hover:border-primary/30 hover:bg-primary/5 hover:text-primary'
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
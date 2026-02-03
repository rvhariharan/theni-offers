import React, { useRef, useEffect } from 'react';
import { CATEGORY_HIERARCHY } from '../services/mockData';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const CategoryFilter = ({
    selectedCategory,
    selectedSubCategory,
    onCategorySelect,
    onSubCategorySelect,
    showSubCategories = true
}) => {
    const scrollRef = useRef(null);
    const subCatScrollRef = useRef(null);
    const CATEGORIES = ['All', ...Object.keys(CATEGORY_HIERARCHY)];

    // Scroll active category into view
    useEffect(() => {
        if (scrollRef.current) {
            if (selectedCategory === 'All' || !selectedCategory) {
                scrollRef.current.scrollLeft = 0;
            }
        }
    }, [selectedCategory]);

    // Scroll active subcategory into view
    useEffect(() => {
        if (subCatScrollRef.current) {
            if (!selectedSubCategory) {
                subCatScrollRef.current.scrollLeft = 0;
            }
        }
    }, [selectedSubCategory]);

    const scroll = (direction, ref) => {
        if (ref.current) {
            const { current } = ref;
            const scrollAmount = 200;
            if (direction === 'left') {
                current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            } else {
                current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }
    };

    return (
        <div className="w-full space-y-4">
            {/* Main Categories Row */}
            <div className="relative group">
                <button
                    onClick={() => scroll('left', scrollRef)}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -ml-3 z-10 bg-white shadow-md p-1.5 rounded-full text-gray-500 hover:text-primary opacity-0 group-hover:opacity-100 disabled:opacity-0 transition-opacity border border-gray-100 hidden md:block"
                >
                    <ChevronLeft size={18} />
                </button>

                <div
                    ref={scrollRef}
                    className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 snap-x"
                >
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => onCategorySelect(cat === 'All' ? '' : cat)}
                            className={`flex-shrink-0 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 snap-start border ${(cat === 'All' && !selectedCategory) || selectedCategory === cat
                                ? 'bg-gray-900 text-white border-gray-900 shadow-md transform scale-105'
                                : 'bg-white text-gray-600 border-transparent hover:bg-gray-100 hover:border-gray-200'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <button
                    onClick={() => scroll('right', scrollRef)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 -mr-3 z-10 bg-white shadow-md p-1.5 rounded-full text-gray-500 hover:text-primary opacity-0 group-hover:opacity-100 disabled:opacity-0 transition-opacity border border-gray-100 hidden md:block"
                >
                    <ChevronRight size={18} />
                </button>
            </div>

            {/* Subcategories Row (Conditional) */}
            {showSubCategories && selectedCategory && selectedCategory !== 'All' && CATEGORY_HIERARCHY[selectedCategory] && (
                <div className="relative group border-t border-gray-100 pt-2 animate-fadeIn">
                    <button
                        onClick={() => scroll('left', subCatScrollRef)}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -ml-3 z-10 bg-white shadow-md p-1.5 rounded-full text-gray-500 hover:text-primary opacity-0 group-hover:opacity-100 disabled:opacity-0 transition-opacity border border-gray-100 hidden md:block"
                    >
                        <ChevronLeft size={16} />
                    </button>

                    <div
                        ref={subCatScrollRef}
                        className="flex space-x-2 overflow-x-auto pb-1 scrollbar-hide -mx-4 px-4 snap-x"
                    >
                        <button
                            onClick={() => onSubCategorySelect && onSubCategorySelect('')}
                            className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-bold transition-all border snap-start ${!selectedSubCategory
                                ? 'bg-secondary text-white border-secondary shadow-sm'
                                : 'bg-white text-gray-500 border-gray-200 hover:border-secondary hover:text-secondary'
                                }`}
                        >
                            All {selectedCategory}
                        </button>

                        {CATEGORY_HIERARCHY[selectedCategory].map((sub) => (
                            <button
                                key={sub}
                                onClick={() => onSubCategorySelect && onSubCategorySelect(sub)}
                                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-bold transition-all border snap-start ${selectedSubCategory === sub
                                    ? 'bg-secondary text-white border-secondary shadow-sm'
                                    : 'bg-white text-gray-500 border-gray-200 hover:border-secondary hover:text-secondary'
                                    }`}
                            >
                                {sub}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => scroll('right', subCatScrollRef)}
                        className="absolute right-0 top-1/2 -translate-y-1/2 -mr-3 z-10 bg-white shadow-md p-1.5 rounded-full text-gray-500 hover:text-primary opacity-0 group-hover:opacity-100 disabled:opacity-0 transition-opacity border border-gray-100 hidden md:block"
                    >
                        <ChevronRight size={16} />
                    </button>
                </div>
            )}
        </div>
    );
};

export default CategoryFilter;

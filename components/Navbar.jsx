import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { Menu, X, ShoppingBag, MapPin, Briefcase, Info, Home, Search, ArrowRight, Loader, Tag, Store } from 'lucide-react';
import headerLogo from '../img/theni headers logo.svg';
import { api } from '../services/api';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // Search State
    const [searchTerm, setSearchTerm] = useState('');
    const [popupResults, setPopupResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [searchMessage, setSearchMessage] = useState('');
    const [showResults, setShowResults] = useState(false); // Only show results after explicit search

    const location = useLocation();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const searchRef = useRef(null);

    // Context Detection
    const isShopsPage = location.pathname.startsWith('/shops');
    const isJobsPage = location.pathname.startsWith('/jobs');
    const isOffersPage = location.pathname.startsWith('/offers');
    const isListPage = isShopsPage || isJobsPage || isOffersPage;

    // Get context name for placeholder
    const getContextName = () => {
        if (isShopsPage) return 'Shops';
        if (isJobsPage) return 'Jobs';
        if (isOffersPage) return 'Offers';
        return 'Offers & Shops'; // Default fallback
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Sync input with URL params ONLY on mount or page change, NOT on every keystroke
    useEffect(() => {
        if (isListPage) {
            const query = searchParams.get('search') || '';
            setSearchTerm(query);
        } else {
            setSearchTerm(''); // Clear on navigation to non-list pages
        }
        setIsSearchOpen(false); // Close popup on route change
        setIsOpen(false);
        setShowResults(false);
        setPopupResults([]);
    }, [location.pathname]); // Only depend on path changing

    // Close search on clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                // Do not close if user is clicking inside the search popup
                // The ref should cover the container
                setIsSearchOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
        if (isSearchOpen) setIsSearchOpen(false);
    };

    const toggleSearch = (e) => {
        e.stopPropagation();
        setIsSearchOpen(!isSearchOpen);
        if (isOpen) setIsOpen(false);
        // Reset state when opening
        if (!isSearchOpen) {
            setShowResults(false);
            setSearchMessage('');
            if (!isListPage) setSearchTerm('');
        }
    };

    // --- CORE SEARCH LOGIC ---
    const executeSearch = async () => {
        if (!searchTerm.trim()) return;

        // Case 1: List Pages -> Update URL Filter
        if (isListPage) {
            const newParams = new URLSearchParams(searchParams);
            newParams.set('search', searchTerm.trim());
            navigate(`${location.pathname}?${newParams.toString()}`, { replace: true });
            setIsSearchOpen(false); // Optional: close on submit for list pages
            return;
        }

        // Case 2: Non-List Pages -> API Search in Popup
        setIsSearching(true);
        setSearchMessage('');
        setShowResults(true);

        try {
            const [offers, shops] = await Promise.all([
                api.getOffers({ search: searchTerm }),
                api.getShops({ search: searchTerm })
            ]);

            const combined = [
                ...offers.slice(0, 3).map(o => ({ ...o, type: 'offer' })),
                ...shops.slice(0, 3).map(s => ({ ...s, type: 'shop' }))
            ];

            setPopupResults(combined);
            if (combined.length === 0) setSearchMessage('No results found.');
        } catch (error) {
            console.error("Search error", error);
            setSearchMessage('Error searching.');
        } finally {
            setIsSearching(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            executeSearch();
        }
    };

    const handleManualSearchClick = (e) => {
        e.preventDefault();
        executeSearch();
    };

    const isActive = (path) =>
        location.pathname === path
            ? 'bg-primary text-white font-bold shadow-sm'
            : 'text-primary/80 hover:text-secondary hover:bg-white font-medium';

    const navLinks = [
        { name: 'Home', path: '/', icon: <Home size={18} /> },
        { name: 'Offers', path: '/offers', icon: <ShoppingBag size={18} /> },
        { name: 'Shops', path: '/shops', icon: <MapPin size={18} /> },
        { name: 'Jobs', path: '/jobs', icon: <Briefcase size={18} /> },
        { name: 'About', path: '/about', icon: <Info size={18} /> },
    ];

    return (
        <nav className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled || isOpen || isSearchOpen ? 'bg-white shadow-soft py-3' : 'bg-white py-5'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <Link to="/" className="flex-shrink-0 flex items-center group relative z-10">
                        <img src={headerLogo} alt="Theni Offers" className="h-20 w-auto transition-transform group-hover:scale-105" />
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-2 bg-white p-1.5 rounded-full border border-primary/10 shadow-sm relative z-20">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`flex items-center space-x-1.5 px-4 py-2 rounded-full text-sm transition-all duration-300 ${isActive(link.path)}`}
                            >
                                {link.icon}
                                <span>{link.name}</span>
                            </Link>
                        ))}
                    </div>

                    <div className="hidden md:flex items-center gap-3 relative z-30" ref={searchRef}>
                        {/* Desktop Search Trigger */}
                        <div className="relative">
                            <button
                                onClick={toggleSearch}
                                className={`p-2.5 rounded-full transition-colors ${isSearchOpen ? 'bg-primary text-white' : 'text-primary/70 hover:bg-primary/5 hover:text-secondary'}`}
                                title={`Search ${getContextName()}`}
                            >
                                <Search size={20} />
                            </button>

                            {/* Desktop Search Popup */}
                            {isSearchOpen && (
                                <div className="absolute top-full right-0 mt-4 w-96 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden animate-fadeIn origin-top-right">
                                    <div className="p-4 bg-slate-50 border-b border-gray-100">
                                        <div className="relative flex items-center">
                                            <Search className="absolute left-3 text-gray-400" size={18} />
                                            <input
                                                type="text"
                                                placeholder={`Search ${getContextName()}...`}
                                                className="w-full pl-10 pr-10 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all"
                                                autoFocus
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                onKeyDown={handleKeyDown}
                                            />
                                            <button
                                                onClick={handleManualSearchClick}
                                                className="absolute right-2 p-1.5 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors"
                                            >
                                                <ArrowRight size={14} />
                                            </button>
                                        </div>
                                        <div className="mt-2 text-xs text-gray-400 text-center">
                                            Press Enter to search
                                        </div>
                                    </div>

                                    {/* Results Section */}
                                    {!isListPage && showResults && (
                                        <div className="max-h-80 overflow-y-auto">
                                            {isSearching ? (
                                                <div className="p-8 text-center text-gray-400">
                                                    <Loader className="animate-spin mx-auto mb-2" size={24} />
                                                    <span className="text-xs">Searching...</span>
                                                </div>
                                            ) : popupResults.length > 0 ? (
                                                <div className="py-2">
                                                    <h3 className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">Top Results</h3>
                                                    {popupResults.map((item, idx) => (
                                                        <div
                                                            key={`${item.type}-${item.id}`}
                                                            onClick={() => {
                                                                // Handle navigation to detail logic here
                                                                setIsSearchOpen(false); // Just close for now or nav
                                                            }}
                                                            className="px-4 py-3 hover:bg-slate-50 cursor-pointer flex items-center gap-3 border-b border-gray-50 last:border-0 transition-colors"
                                                        >
                                                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${item.type === 'shop' ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'}`}>
                                                                {item.type === 'shop' ? <Store size={16} /> : <Tag size={16} />}
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <div className="text-sm font-bold text-gray-800 truncate">{item.title || item.name}</div>
                                                                <div className="text-xs text-gray-500 truncate">{item.description}</div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="p-8 text-center text-gray-500">
                                                    <p className="text-sm font-medium">{searchMessage || 'No results found.'}</p>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* List Page Context Message */}
                                    {isListPage && (
                                        <div className="p-4 text-center">
                                            <p className="text-xs text-gray-500 font-medium">
                                                Press Enter to filter {getContextName()}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        <Link
                            to="/contact"
                            className="bg-primary hover:bg-white hover:text-primary border-2 border-primary text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-primary/20 hover:shadow-primary/10 transition-all duration-300 active:scale-95"
                        >
                            Contact Us
                        </Link>
                    </div>

                    {/* Mobile Right Section */}
                    <div className="flex items-center gap-2 md:hidden z-30">
                        <button
                            onClick={toggleSearch}
                            className={`inline-flex items-center justify-center p-2.5 rounded-full transition-all duration-300 ${isSearchOpen ? 'bg-secondary text-white shadow-md' : 'bg-white text-primary hover:text-secondary shadow-sm'}`}
                        >
                            <Search size={22} />
                        </button>

                        <button
                            onClick={toggleMenu}
                            className={`inline-flex items-center justify-center p-2.5 rounded-full transition-all duration-300 ${isOpen ? 'bg-primary text-white shadow-md' : 'bg-primary text-white shadow-sm'}`}
                        >
                            {isOpen ? <X size={22} /> : <Menu size={22} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Search Bar Overlay */}
            {isSearchOpen && (
                <div className="absolute top-full left-0 w-full bg-white border-b border-primary/10 shadow-lg animate-slideUp z-40 px-4 py-4 md:hidden">
                    <div className="relative flex items-center">
                        <Search className="absolute left-4 text-primary/50" size={20} />
                        <input
                            type="text"
                            placeholder={`Search ${getContextName()}...`}
                            className="w-full bg-slate-50 text-slate-900 pl-11 pr-12 py-3.5 rounded-2xl border-none focus:ring-0 font-medium placeholder:text-slate-400"
                            autoFocus
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <button
                            onClick={handleManualSearchClick}
                            className="absolute right-2 bg-secondary text-white p-2 rounded-xl shadow-sm active:scale-95 transition-transform"
                        >
                            <ArrowRight size={18} />
                        </button>
                    </div>

                    {!isListPage && showResults && (
                        <div className="mt-4 max-h-60 overflow-y-auto">
                            {isSearching ? (
                                <div className="py-4 text-center">
                                    <Loader className="animate-spin mx-auto text-primary" size={20} />
                                </div>
                            ) : popupResults.length > 0 ? (
                                popupResults.map((item) => (
                                    <div key={item.id} className="py-2 border-b border-gray-100 last:border-0 flex items-center gap-3">
                                        <div className="text-sm font-bold text-gray-800">{item.title || item.name}</div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-sm text-center text-gray-500 py-2">{searchMessage || 'No results found.'}</div>
                            )}
                        </div>
                    )}
                </div>
            )}

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div className="md:hidden absolute top-full left-0 w-full h-screen bg-white border-t border-primary/10 animate-fadeIn z-40 flex flex-col p-4">
                    <div className="space-y-3 mt-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                className={`flex items-center space-x-4 px-6 py-4 rounded-2xl text-lg transition-all ${location.pathname === link.path ? 'bg-primary text-white font-bold' : 'bg-white text-primary active:bg-primary/5'}`}
                            >
                                {link.icon}
                                <span>{link.name}</span>
                            </Link>
                        ))}
                        <Link
                            to="/contact"
                            onClick={() => setIsOpen(false)}
                            className="block w-full text-center mt-6 bg-secondary text-white px-6 py-4 rounded-2xl text-lg font-bold shadow-xl shadow-secondary/20"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;

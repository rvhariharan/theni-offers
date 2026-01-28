import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingBag, MapPin, Briefcase, Info, Home, Search, ArrowRight } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus when route changes
  useEffect(() => {
    setIsOpen(false);
    setIsSearchOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (isSearchOpen) setIsSearchOpen(false);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isOpen) setIsOpen(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/offers?search=${encodeURIComponent(searchTerm)}`);
      setIsSearchOpen(false);
      setSearchTerm('');
    }
  };

  const isActive = (path: string) => 
    location.pathname === path 
      ? 'bg-primary/10 text-primary font-bold shadow-sm' 
      : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100 font-medium';

  const navLinks = [
    { name: 'Home', path: '/', icon: <Home size={18} /> },
    { name: 'Offers', path: '/offers', icon: <ShoppingBag size={18} /> },
    { name: 'Shops', path: '/shops', icon: <MapPin size={18} /> },
    { name: 'Jobs', path: '/jobs', icon: <Briefcase size={18} /> },
    { name: 'About', path: '/about', icon: <Info size={18} /> },
  ];

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled || isOpen || isSearchOpen ? 'bg-white/90 backdrop-blur-xl shadow-soft py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex-shrink-0 flex items-center group relative z-10">
            <span className="text-2xl font-extrabold text-primary tracking-tight transition-transform group-hover:scale-105">
              Theni<span className="text-secondary">Offers</span>
            </span>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-2 bg-white/50 backdrop-blur-md p-1.5 rounded-full border border-gray-100/50 shadow-sm">
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

          <div className="hidden md:flex items-center gap-3">
             {/* Desktop Search Trigger (Optional, keeps UI clean) */}
             <button 
               onClick={() => navigate('/offers')}
               className="p-2.5 rounded-full text-gray-500 hover:bg-gray-100 hover:text-primary transition-colors"
               title="Search Offers"
             >
                <Search size={20} />
             </button>

            <Link 
              to="/contact" 
              className="bg-gradient-to-r from-primary to-teal-800 text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300 active:scale-95"
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile Right Section */}
          <div className="flex items-center gap-2 md:hidden">
            {/* Mobile Search Toggle */}
            <button 
              onClick={toggleSearch}
              className={`inline-flex items-center justify-center p-2.5 rounded-full transition-all duration-300 ${isSearchOpen ? 'bg-primary text-white shadow-md' : 'bg-white text-gray-700 hover:text-primary shadow-sm'}`}
            >
              <Search size={22} />
            </button>

            {/* Mobile Menu Button */}
            <button 
              onClick={toggleMenu}
              className={`inline-flex items-center justify-center p-2.5 rounded-full transition-all duration-300 ${isOpen ? 'bg-slate-900 text-white shadow-md' : 'bg-white text-gray-700 hover:text-primary shadow-sm'}`}
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar Overlay */}
      {isSearchOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-lg animate-slideUp z-40 px-4 py-4 md:hidden">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                <Search className="absolute left-4 text-gray-400" size={20} />
                <input 
                    type="text" 
                    placeholder="Search offers, shops, jobs..." 
                    className="w-full bg-gray-50 text-gray-900 pl-11 pr-12 py-3.5 rounded-2xl border-0 focus:ring-2 focus:ring-primary/20 font-medium placeholder:text-gray-400"
                    autoFocus
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button 
                    type="submit"
                    className="absolute right-2 bg-primary text-white p-2 rounded-xl shadow-sm active:scale-95 transition-transform"
                >
                    <ArrowRight size={18} />
                </button>
            </form>
        </div>
      )}

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full h-screen bg-white/95 backdrop-blur-xl border-t border-gray-100 animate-fadeIn z-40 flex flex-col p-4">
          <div className="space-y-3 mt-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center space-x-4 px-6 py-4 rounded-2xl text-lg transition-all ${location.pathname === link.path ? 'bg-primary/10 text-primary font-bold' : 'bg-gray-50 text-gray-600 active:bg-gray-100'}`}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            ))}
             <Link 
              to="/contact" 
              onClick={() => setIsOpen(false)}
              className="block w-full text-center mt-6 bg-gradient-to-r from-primary to-teal-800 text-white px-6 py-4 rounded-2xl text-lg font-bold shadow-xl shadow-primary/20"
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
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone, ArrowRight, Heart } from 'lucide-react';
import footerLogo from '../img/Theni Offers SVG file.svg';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-white relative overflow-hidden">
      {/* Decorative Top Gradient Line */}
      <div className="h-1 w-full bg-gradient-to-r from-white via-secondary to-white opacity-20"></div>

      {/* Background blobs for subtle effect */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/" className="inline-block group">
              <img src={footerLogo} alt="Theni Offers" className="h-28 w-auto transition-transform group-hover:scale-105" />
            </Link>
            <p className="text-white/80 text-sm leading-relaxed max-w-xs">
              The #1 hyper-local digital marketplace. Connecting Theni's businesses with the community through exclusive deals and opportunities.
            </p>
            <div className="flex space-x-3 pt-2">
              <a href="#" className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-secondary hover:text-white transition-all duration-300 hover:-translate-y-1">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-secondary hover:text-white transition-all duration-300 hover:-translate-y-1">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-secondary hover:text-white transition-all duration-300 hover:-translate-y-1">
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 text-lg relative inline-block">
              Explore
              <span className="absolute bottom-0 left-0 w-1/2 h-1 bg-secondary rounded-full"></span>
            </h4>
            <ul className="space-y-4 text-sm font-medium text-white/80">
              <li>
                <Link to="/" className="hover:text-secondary transition-all duration-300 flex items-center group">
                  <span className="w-0 overflow-hidden group-hover:w-4 transition-all duration-300 opacity-0 group-hover:opacity-100">
                    <ArrowRight size={12} className="mr-1" />
                  </span>
                  Trending Offers
                </Link>
              </li>
              <li>
                <Link to="/shops" className="hover:text-secondary transition-all duration-300 flex items-center group">
                  <span className="w-0 overflow-hidden group-hover:w-4 transition-all duration-300 opacity-0 group-hover:opacity-100">
                    <ArrowRight size={12} className="mr-1" />
                  </span>
                  Shops Directory
                </Link>
              </li>
              <li>
                <Link to="/jobs" className="hover:text-secondary transition-all duration-300 flex items-center group">
                  <span className="w-0 overflow-hidden group-hover:w-4 transition-all duration-300 opacity-0 group-hover:opacity-100">
                    <ArrowRight size={12} className="mr-1" />
                  </span>
                  Job Listings
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-secondary transition-all duration-300 flex items-center group">
                  <span className="w-0 overflow-hidden group-hover:w-4 transition-all duration-300 opacity-0 group-hover:opacity-100">
                    <ArrowRight size={12} className="mr-1" />
                  </span>
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-bold mb-6 text-lg relative inline-block">
              Categories
              <span className="absolute bottom-0 left-0 w-1/2 h-1 bg-white/50 rounded-full"></span>
            </h4>
            <ul className="space-y-4 text-sm font-medium text-white/80">
              <li><Link to="/offers?category=Electronics" className="hover:text-secondary hover:translate-x-1 transition-all duration-300 inline-block">Electronics</Link></li>
              <li><Link to="/offers?category=Fashion" className="hover:text-secondary hover:translate-x-1 transition-all duration-300 inline-block">Fashion</Link></li>
              <li><Link to="/offers?category=Food%20%26%20Dining" className="hover:text-secondary hover:translate-x-1 transition-all duration-300 inline-block">Food & Dining</Link></li>
              <li><Link to="/offers?category=Services" className="hover:text-secondary hover:translate-x-1 transition-all duration-300 inline-block">Services</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-6 text-lg relative inline-block">
              Get in Touch
              <span className="absolute bottom-0 left-0 w-1/2 h-1 bg-secondary rounded-full"></span>
            </h4>
            <ul className="space-y-5 text-sm">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-secondary border border-white/5">
                  <MapPin size={18} />
                </div>
                <span className="leading-relaxed pt-1">Theni Main Road, Theni</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-secondary border border-white/5">
                  <Mail size={18} />
                </div>
                <a href="mailto:support@thenioffers.com" className="hover:text-secondary transition-colors">support@thenioffers.com</a>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-secondary border border-white/5">
                  <Phone size={18} />
                </div>
                <a href="tel:+919876543210" className="hover:text-secondary transition-colors">+91 98765 43210</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-white/60 gap-4">
          <p className="text-center md:text-left">© 2024 Theni Offers. All rights reserved.</p>

          <div className="flex items-center gap-2 px-4 py-1 rounded-full bg-white/5 border border-white/5">
            <span>Made with</span>
            <Heart size={14} className="text-secondary fill-secondary animate-pulse" />
            <span>in Theni</span>
          </div>

          <div className="flex space-x-6 font-medium">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
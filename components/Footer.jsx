import React from 'react';
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone, ArrowRight, Heart } from 'lucide-react';
import footerLogo from '../img/Theni Offers SVG file.svg';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-primary text-white relative overflow-hidden">
            {/* Decorative Top Gradient Line */}
            <div className="h-1 w-full bg-gradient-to-r from-white via-secondary to-white opacity-20"></div>

            {/* Background blobs for subtle effect */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-white/5 blur-3xl"></div>
                <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-secondary/5 blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand Column */}
                    <div className="space-y-6">
                        <div className="bg-white/10 p-4 rounded-2xl inline-block backdrop-blur-sm border border-white/10">
                            <img src={footerLogo} alt="Theni Offers" className="h-16 w-auto" />
                        </div>
                        <p className="text-white/70 leading-relaxed">
                            Your comprehensive digital gateway to Theni's best local businesses, exclusive offers, and job opportunities.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary hover:text-white transition-all duration-300 hover:-translate-y-1">
                                <Facebook size={18} />
                            </a>
                            <a href="https://instagram.com/theni_offers" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary hover:text-white transition-all duration-300 hover:-translate-y-1">
                                <Instagram size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary hover:text-white transition-all duration-300 hover:-translate-y-1">
                                <Twitter size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                            <span className="w-8 h-1 bg-secondary rounded-full"></span>
                            Explore
                        </h3>
                        <ul className="space-y-3">
                            {[
                                { name: 'Home', path: '/' },
                                { name: 'Offers', path: '/offers' },
                                { name: 'Shops', path: '/shops' },
                                { name: 'Jobs', path: '/jobs' },
                                { name: 'About Us', path: '/about' },
                                { name: 'Contact', path: '/contact' }
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link to={link.path} className="text-white/70 hover:text-secondary hover:pl-2 transition-all duration-300 flex items-center gap-2">
                                        <ArrowRight size={14} className="opacity-0 hover:opacity-100 transition-opacity" />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                            <span className="w-8 h-1 bg-secondary rounded-full"></span>
                            Categories
                        </h3>
                        <ul className="space-y-3">
                            {[
                                'Food & Dining',
                                'Fashion',
                                'Electronics',
                                'Services',
                                'Health',
                                'Automotive'
                            ].map((cat) => (
                                <li key={cat}>
                                    <Link to={`/offers?category=${cat}`} className="text-white/70 hover:text-secondary hover:pl-2 transition-all duration-300 block">
                                        {cat}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                            <span className="w-8 h-1 bg-secondary rounded-full"></span>
                            Contact Us
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-[10px] bg-white/10 flex items-center justify-center shrink-0">
                                    <MapPin size={18} className="text-secondary" />
                                </div>
                                <span className="text-white/70 mt-1">123, Main Bazaar Street,<br />Theni, Tamil Nadu - 625531</span>
                            </li>
                            <li className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-[10px] bg-white/10 flex items-center justify-center shrink-0">
                                    <Phone size={18} className="text-secondary" />
                                </div>
                                <a href="tel:+919500456486" className="text-white/70 hover:text-white transition-colors">+91 9500 456 486</a>
                            </li>
                            <li className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-[10px] bg-white/10 flex items-center justify-center shrink-0">
                                    <Mail size={18} className="text-secondary" />
                                </div>
                                <a href="mailto:Thenioffers@gmail.com" className="text-white/70 hover:text-white transition-colors">Thenioffers@gmail.com</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10 relative z-10 bg-black/20 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/50">
                        <p className="flex items-center gap-1.5">
                            © {new Date().getFullYear()} Theni Offers. Made with <Heart size={12} className="text-red-500 fill-red-500" /> in Theni.
                        </p>
                        <div className="flex gap-6">
                            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

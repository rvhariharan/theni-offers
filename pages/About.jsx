import React from 'react';
import { Target, Users, TrendingUp, Heart, CheckCircle2, Award, Zap, Store, ShoppingBag, Briefcase, ArrowRight } from 'lucide-react';
import headerLogo from '../img/theni headers logo.svg';

const About = () => {
    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero Section */}
            <div className="relative bg-primary/30 overflow-hidden pt-16 pb-24 lg:pb-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-8">
                        <Heart size={12} className="text-red-500 fill-red-500" />
                        <span>Made with love in Theni</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-8 leading-tight">
                        Empowering Local <br className="hidden md:block" />
                        <span className="text-primary">Commerce & Community</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-slate-500 max-w-3xl mx-auto leading-relaxed font-medium">
                        We're building the digital infrastructure to help Theni's businesses thrive and customers discover the best of their city.
                    </p>
                </div>
            </div>

            {/* Stats Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 flex items-center gap-6 group hover:-translate-y-1 transition-all duration-300">
                        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                            <Store size={32} />
                        </div>
                        <div>
                            <div className="text-3xl font-extrabold text-slate-900">500+</div>
                            <div className="text-slate-500 font-medium">Local Businesses</div>
                        </div>
                    </div>
                    <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 flex items-center gap-6 group hover:-translate-y-1 transition-all duration-300">
                        <div className="w-16 h-16 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                            <Users size={32} />
                        </div>
                        <div>
                            <div className="text-3xl font-extrabold text-slate-900">10k+</div>
                            <div className="text-slate-500 font-medium">Monthly Users</div>
                        </div>
                    </div>
                    <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 flex items-center gap-6 group hover:-translate-y-1 transition-all duration-300">
                        <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                            <TrendingUp size={32} />
                        </div>
                        <div>
                            <div className="text-3xl font-extrabold text-slate-900">₹1Cr+</div>
                            <div className="text-slate-500 font-medium">Value Generated</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bridging the Gap Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
                            Bridging the Gap Between <br />
                            <span className="text-primary">Tradition & Technology</span>
                        </h2>
                        <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                            <p>
                                Theni is a hub of culture, agriculture, and commerce. However, many local businesses struggle to reach the modern digital consumer. That's where we come in.
                            </p>
                            <p className="font-bold text-slate-900 border-l-4 border-secondary pl-6">
                                Theni Offers was born from a simple idea: What if finding a local plumber, the best saree shop, or a job nearby was as easy as a single click?
                            </p>
                            <p>
                                We are not just a marketplace; we are a community platform designed to keep the local economy vibrant. By connecting shoppers with neighborhood stores, we ensure that money stays within the community, fostering growth for everyone.
                            </p>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 bg-secondary rounded-[3rem] rotate-3 opacity-10"></div>
                        <img
                            src="https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                            alt="Team Meeting"
                            className="relative rounded-[3rem] shadow-2xl w-full object-cover aspect-4/3"
                        />
                    </div>
                </div>
            </div>

            {/* A Platform for Everyone */}
            <div className="bg-white py-24 md:py-32 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <h2 className="text-4xl font-extrabold text-slate-900 mb-6">A Platform for Everyone</h2>
                        <p className="text-xl text-slate-500">Whether you are buying, selling, or looking for work, we have built features specifically for you.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* For Businesses */}
                        <div className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100 hover:shadow-xl transition-all duration-300">
                            <div className="w-14 h-14 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mb-8">
                                <Store size={28} />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">For Businesses</h3>
                            <p className="text-slate-600 mb-8 leading-relaxed">
                                Get a premium digital storefront without the technical headache. List products, post offers, and track analytics to grow your customer base.
                            </p>
                            <ul className="space-y-4">
                                {['Verified Listings', 'Instant Reach', 'Hiring Tools'].map(item => (
                                    <li key={item} className="flex items-center gap-3 text-slate-700 font-medium">
                                        <CheckCircle2 size={20} className="text-green-500" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* For Shoppers */}
                        <div className="bg-primary text-white p-10 rounded-[2.5rem] shadow-2xl shadow-primary/20 transform md:-translate-y-6">
                            <div className="w-14 h-14 bg-white/10 text-secondary rounded-2xl flex items-center justify-center mb-8">
                                <ShoppingBag size={28} />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">For Shoppers</h3>
                            <p className="text-white/80 mb-8 leading-relaxed">
                                Stop endless searching. Find exactly what you need nearby, compare prices, and get exclusive coupons that you won't find anywhere else.
                            </p>
                            <ul className="space-y-4">
                                {['Free Access', 'Trusted Reviews', 'Direct Contact'].map(item => (
                                    <li key={item} className="flex items-center gap-3 text-white font-medium">
                                        <div className="bg-secondary/20 p-1 rounded-full text-secondary">
                                            <CheckCircle2 size={16} />
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* For Job Seekers */}
                        <div className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100 hover:shadow-xl transition-all duration-300">
                            <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-8">
                                <Briefcase size={28} />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">For Job Seekers</h3>
                            <p className="text-slate-600 mb-8 leading-relaxed">
                                Find work close to home. Connect directly with local employers for full-time, part-time, or gig opportunities.
                            </p>
                            <ul className="space-y-4">
                                {['Verified Employers', 'No Middlemen', 'Easy Apply'].map(item => (
                                    <li key={item} className="flex items-center gap-3 text-slate-700 font-medium">
                                        <CheckCircle2 size={20} className="text-green-500" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
                <div className="bg-primary rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden">
                    {/* Abstract Shapes */}
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-secondary/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>

                    <div className="relative z-10 max-w-3xl mx-auto">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Ready to be part of the story?</h2>
                        <p className="text-xl text-white/80 mb-10">
                            Join thousands of others who are reshaping how Theni connects and shops.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <button className="bg-white text-primary px-8 py-4 rounded-xl font-bold shadow-lg hover:bg-slate-50 transition-all hover:-translate-y-1">
                                List Your Business <ArrowRight className="inline ml-2" size={20} />
                            </button>
                            <button className="bg-transparent border-2 border-white/20 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-all hover:-translate-y-1">
                                Start Exploring
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;

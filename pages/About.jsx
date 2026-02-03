import React from 'react';
import { Target, Users, TrendingUp, Heart, CheckCircle2, Award, Zap } from 'lucide-react';
import headerLogo from '../img/theni headers logo.svg';

const About = () => {
    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <div className="relative bg-slate-900 text-white overflow-hidden py-24 md:py-32">
                {/* Abstract Background */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-white/80 text-xs font-bold uppercase tracking-wider mb-6 animate-fadeIn">
                        About Us
                    </div>
                    <img src={headerLogo} alt="Theni Offers" className="h-24 mx-auto mb-8 bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/10 shadow-lg animate-slideUp" />

                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight leading-tight max-w-4xl mx-auto">
                        Empowering Local Business <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-orange-400">Connecting Community</span>
                    </h1>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                        We are building the digital bridge between Theni's vibrant businesses and the people who love them.
                    </p>
                </div>
            </div>

            {/* Mission Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Our Mission</h2>
                            <div className="h-1.5 w-20 bg-secondary rounded-full mb-6"></div>
                            <p className="text-lg text-slate-600 leading-relaxed">
                                Our mission is to digitize the local economy of Theni district by providing a seamless platform for businesses to showcase their offers and for customers to discover great deals. We believe in the power of local commerce and aim to boost visibility for small and medium enterprises.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {[
                                { icon: <Target className="text-blue-500" />, title: "Local First", text: "Prioritizing Theni's own businesses." },
                                { icon: <Users className="text-green-500" />, title: "Community", text: "Building strong local networks." },
                                { icon: <TrendingUp className="text-purple-500" />, title: "Growth", text: "Helping businesses scale digitally." },
                                { icon: <Award className="text-amber-500" />, title: "Quality", text: "Curating only the best offers." },
                            ].map((item, idx) => (
                                <div key={idx} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-4 text-2xl">
                                        {item.icon}
                                    </div>
                                    <h3 className="font-bold text-slate-900 mb-1">{item.title}</h3>
                                    <p className="text-sm text-slate-500">{item.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary to-secondary rounded-[3rem] rotate-3 opacity-20 transform scale-105"></div>
                        <img
                            src="https://images.unsplash.com/photo-1522071820081-009f0129c6b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                            alt="Team Collaboration"
                            className="relative rounded-[3rem] shadow-2xl z-10 w-full object-cover aspect-4/3"
                        />

                        {/* Floating Stats */}
                        <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl z-20 flex items-center gap-4 animate-bounce-slow">
                            <div className="bg-red-50 p-3 rounded-full text-red-500">
                                <Heart fill="currentColor" size={24} />
                            </div>
                            <div>
                                <div className="text-2xl font-extrabold text-slate-900">5k+</div>
                                <div className="text-xs font-bold text-slate-400 uppercase">Happy Users</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Values Banner */}
            <div className="bg-slate-900 text-white py-20 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold mb-4">Why Choose Theni Offers?</h2>
                        <p className="text-slate-400">We bridge the gap between traditional shopping and modern digital convenience.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        {[
                            { title: "Verified Listings", desc: "Every shop and offer is manually verified for authenticity." },
                            { title: "Real-time Updates", desc: "Get the latest deals as soon as they are announced." },
                            { title: "User Friendly", desc: "Designed for everyone, ensuring a smooth experience." }
                        ].map((feat, i) => (
                            <div key={i} className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors">
                                <div className="w-16 h-16 mx-auto bg-secondary rounded-full flex items-center justify-center mb-6 shadow-lg shadow-secondary/30">
                                    <CheckCircle2 size={32} className="text-white" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">{feat.title}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">{feat.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA */}
            <div className="py-24 text-center">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-4xl font-extrabold text-slate-900 mb-6">Join the Digital Revolution in Theni</h2>
                    <p className="text-lg text-slate-500 mb-10">Whether you are a shopper looking for deals or a business owner wanting to grow, we have something for you.</p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <button className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl font-bold shadow-xl shadow-primary/30 transition-all hover:scale-105">
                            Browse Offers
                        </button>
                        <button className="bg-white text-slate-900 border-2 border-slate-200 hover:border-secondary hover:text-secondary px-8 py-4 rounded-xl font-bold transition-all hover:bg-secondary/5">
                            Register Business
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;

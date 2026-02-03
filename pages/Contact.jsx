import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Check, Loader2 } from 'lucide-react';
import headerLogo from '../img/theni headers logo.svg';

const Contact = () => {
    const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success'

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('submitting');
        // Simulate API call
        setTimeout(() => {
            setStatus('success');
            // Reset after showing success
            setTimeout(() => setStatus('idle'), 3000);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">

                <div className="text-center max-w-3xl mx-auto mb-16 animate-fadeIn">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-500 text-xs font-bold uppercase tracking-wider mb-6 shadow-sm">
                        <MessageSquare size={14} className="text-secondary" />
                        <span>We'd love to hear from you</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
                        Get in Touch
                    </h1>
                    <p className="text-lg text-slate-500 font-medium">Have a question or want to list your business? Drop us a message.</p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

                    {/* Contact Info Side */}
                    <div className="space-y-10 animate-slideUp order-2 lg:order-1">
                        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden">
                            {/* Decorative bg */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16"></div>

                            <div className="relative z-10 space-y-8">
                                <img src={headerLogo} alt="Theni Offers" className="h-16 mb-6" />

                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-6">Contact Information</h3>
                                    <div className="space-y-6">
                                        <div className="flex items-start gap-4 group">
                                            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                                                <MapPin size={24} />
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-slate-400 uppercase mb-1">Our Office</p>
                                                <p className="text-slate-700 font-medium leading-relaxed">123, Main Bazaar Street,<br />Theni, Tamil Nadu - 625531</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4 group">
                                            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                                                <Phone size={24} />
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-slate-400 uppercase mb-1">Phone</p>
                                                <p className="text-slate-700 font-bold text-lg">+91 9500 456 486</p>
                                                <p className="text-slate-500 text-sm">Mon-Fri 9am-6pm</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4 group">
                                            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                                                <Mail size={24} />
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-slate-400 uppercase mb-1">Email</p>
                                                <p className="text-slate-700 font-bold">Thenioffers@gmail.com</p>
                                                <p className="text-slate-500 text-sm">Target response time: 24h</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Map Placeholder */}
                        <div className="h-64 bg-slate-200 rounded-[2.5rem] overflow-hidden grayscale hover:grayscale-0 transition-all duration-500 shadow-inner relative group border-4 border-white">
                            <img
                                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                                className="w-full h-full object-cover opacity-60"
                                alt="Map"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="bg-white px-6 py-3 rounded-full shadow-lg font-bold text-slate-900 border border-slate-100 flex items-center gap-2">
                                    <MapPin className="text-red-500" size={18} fill="currentColor" />
                                    View on Google Maps
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form Side */}
                    <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-primary/5 border border-slate-100 animate-slideUp delay-100 order-1 lg:order-2">
                        <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Send us a Message</h2>
                        <p className="text-slate-500 mb-8">Fill out the form below and we'll get back to you shortly.</p>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 ml-1">First Name</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="John"
                                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-bold text-slate-900"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 ml-1">Last Name</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Doe"
                                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-bold text-slate-900"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    placeholder="john@example.com"
                                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-bold text-slate-900"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 ml-1">Subject</label>
                                <select className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-bold text-slate-900 appearance-none cursor-pointer">
                                    <option>General Inquiry</option>
                                    <option>Business Listing Support</option>
                                    <option>Report an Issue</option>
                                    <option>Feedback</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 ml-1">Message</label>
                                <textarea
                                    required
                                    placeholder="How can we help you today?"
                                    rows="5"
                                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-bold text-slate-900 resize-none"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={status !== 'idle'}
                                className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 active:scale-95 ${status === 'success'
                                    ? 'bg-green-500 text-white shadow-green-200'
                                    : 'bg-primary text-white hover:bg-primary/90 shadow-primary/30'
                                    }`}
                            >
                                {status === 'idle' && (
                                    <><span>Send Message</span> <Send size={20} /></>
                                )}
                                {status === 'submitting' && (
                                    <><span>Sending...</span> <Loader2 size={24} className="animate-spin" /></>
                                )}
                                {status === 'success' && (
                                    <><span>Message Sent!</span> <CheckCircle2 size={24} /></>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;

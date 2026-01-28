import React, { useState } from 'react';
import { api } from '../services/api';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, ArrowRight } from 'lucide-react';

const Contact: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    await api.submitContact(form);
    setStatus('success');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Hero Section */}
      <div className="bg-white relative overflow-hidden pb-32 pt-20 border-b border-slate-100">
         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/4"></div>
         <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl -translate-x-1/3 translate-y-1/4"></div>
         
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider mb-6 animate-fadeIn">
                <MessageSquare size={14} className="text-primary" />
                <span>We'd love to hear from you</span>
             </div>
             <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
                Let's Start a <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-teal-600">Conversation</span>
             </h1>
             <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
                Whether you're a business owner looking to list your shop or a user with a question, our team is ready to help.
             </p>
         </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-20">
        <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row border border-slate-100">
            
            {/* Contact Info Panel */}
            <div className="lg:w-2/5 bg-slate-900 relative overflow-hidden p-10 md:p-14 text-white flex flex-col justify-between">
                {/* Background Patterns */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl -ml-16 -mb-16"></div>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

                <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-2">Contact Information</h3>
                    <p className="text-slate-400 mb-10">Fill up the form and our team will get back to you within 24 hours.</p>
                    
                    <div className="space-y-8">
                        <div className="flex items-start gap-4 group">
                            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors duration-300 backdrop-blur-sm">
                                <Phone size={20} className="text-white" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Phone</p>
                                <a href="tel:+919876543210" className="text-lg font-bold hover:text-primary transition-colors">+91 98765 43210</a>
                                <p className="text-sm text-slate-500 mt-1">Mon-Fri, 9am to 6pm</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 group">
                             <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors duration-300 backdrop-blur-sm">
                                <Mail size={20} className="text-white" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Email</p>
                                <a href="mailto:support@thenioffers.com" className="text-lg font-bold hover:text-primary transition-colors">support@thenioffers.com</a>
                                <p className="text-sm text-slate-500 mt-1">Online support 24/7</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 group">
                             <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors duration-300 backdrop-blur-sm">
                                <MapPin size={20} className="text-white" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Office</p>
                                <p className="text-lg font-bold leading-snug">123, Tech Park, <br/>Theni Main Road, Theni</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 mt-12 pt-12 border-t border-white/10">
                     <div className="flex items-center gap-3 text-sm font-medium text-slate-400">
                        <Clock size={16} />
                        <span>Avg. Response Time: <span className="text-white font-bold">2 Hours</span></span>
                     </div>
                </div>
            </div>

            {/* Form Panel */}
            <div className="lg:w-3/5 p-10 md:p-14 bg-white">
                {status === 'success' ? (
                     <div className="h-full flex flex-col items-center justify-center text-center animate-fadeIn py-12">
                        <div className="w-24 h-24 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-6 shadow-sm border border-green-100">
                            <Send size={40} className="-ml-1 mt-1" />
                        </div>
                        <h3 className="text-3xl font-extrabold text-slate-900 mb-3">Message Sent!</h3>
                        <p className="text-slate-500 mb-8 max-w-sm mx-auto text-lg">Thank you for reaching out. We have received your message and will reply shortly.</p>
                        <button 
                            onClick={() => setStatus('idle')} 
                            className="text-primary font-bold hover:text-slate-900 transition-colors flex items-center gap-2 px-8 py-3 rounded-xl bg-primary/5 hover:bg-slate-100"
                        >
                            Send another message <ArrowRight size={18} />
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="group">
                                <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Your Name</label>
                                <input 
                                    required
                                    type="text" 
                                    placeholder="John Doe"
                                    className="w-full px-6 py-4 bg-slate-50 border-0 text-slate-900 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all font-bold placeholder:text-slate-400 placeholder:font-medium"
                                    value={form.name}
                                    onChange={(e) => setForm({...form, name: e.target.value})}
                                />
                            </div>
                            <div className="group">
                                <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Email Address</label>
                                <input 
                                    required
                                    type="email" 
                                    placeholder="john@example.com"
                                    className="w-full px-6 py-4 bg-slate-50 border-0 text-slate-900 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all font-bold placeholder:text-slate-400 placeholder:font-medium"
                                    value={form.email}
                                    onChange={(e) => setForm({...form, email: e.target.value})}
                                />
                            </div>
                        </div>

                        <div className="group">
                            <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">What can we help you with?</label>
                             <textarea 
                                required
                                rows={4}
                                placeholder="Tell us about your business or inquiry..."
                                className="w-full px-6 py-4 bg-slate-50 border-0 text-slate-900 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all font-bold placeholder:text-slate-400 placeholder:font-medium resize-none"
                                value={form.message}
                                onChange={(e) => setForm({...form, message: e.target.value})}
                            ></textarea>
                        </div>

                        <button 
                            disabled={status === 'submitting'}
                            type="submit" 
                            className="w-full bg-slate-900 hover:bg-primary text-white font-bold py-5 rounded-2xl transition-all shadow-xl hover:shadow-primary/30 hover:-translate-y-1 active:scale-[0.98] disabled:opacity-70 disabled:hover:translate-y-0 disabled:shadow-none flex items-center justify-center gap-3 text-lg"
                        >
                            {status === 'submitting' ? (
                                <span className="flex items-center gap-2">Processing...</span>
                            ) : (
                                <span className="flex items-center gap-2">Send Message <Send size={20} /></span>
                            )}
                        </button>
                    </form>
                )}
            </div>
        </div>
        
        {/* Simple "Join" banner below */}
        <div className="mt-16 text-center">
             <p className="text-slate-500 font-medium">
                 Looking to join our team? <a href="#" className="text-primary font-bold hover:underline">Check out open positions</a>
             </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
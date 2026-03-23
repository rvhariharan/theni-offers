import React, { useEffect, useState } from 'react';
import { X, MapPin, Building2, Banknote, Clock, CheckCircle2, Briefcase, User, Mail, Phone, ChevronRight } from 'lucide-react';
import { api } from '../services/api';

const JobModal = ({ job, onClose }) => {
    const [isApplying, setIsApplying] = useState(false);
    const [shop, setShop] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: ''
    });

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        const fetchShop = async () => {
            const data = await api.getShopById(job.shopId);
            setShop(data);
        };
        fetchShop();
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [job]);

    const handleApply = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.phone) {
            alert("Please provide at least your Full Name and Phone Number.");
            return;
        }

        setIsApplying(true);

        const recipientEmail = job.contactEmail || `hr@example.com`;
        const subject = `Application for ${job.title} at ${job.companyName}`;
        const body = `Hello ${job.companyName} Team,

I would like to apply for the ${job.title} position.

My Details:
Name: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email || 'N/A'}

Looking forward to hearing from you.

Regards,
${formData.name}`;

        const mailToUrl = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        window.location.href = mailToUrl;
        
        // Brief delay to allow the browser to process the mailto link before closing/resetting
        setTimeout(() => {
            setIsApplying(false);
            onClose();
        }, 1000);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />

            <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl relative z-10 flex flex-col max-h-[90vh] animate-slideUp overflow-hidden">

                {/* Header */}
                <div className="relative bg-primary text-white p-8 pb-12 overflow-hidden shrink-0">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
                    <div className="absolute bottom-0 left-0 w-40 h-40 bg-secondary/20 rounded-full blur-2xl -mb-10"></div>

                    <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors">
                        <X size={20} />
                    </button>

                    <div className="relative z-10">
                        <div className="flex items-start justify-between gap-4 mb-4">
                            <div>
                                <span className="inline-block px-3 py-1 rounded-lg bg-secondary text-white text-xs font-bold uppercase tracking-wide mb-3">
                                    {job.type}
                                </span>
                                <h2 className="text-3xl font-extrabold leading-tight mb-2">{job.title}</h2>
                                <div className="flex items-center gap-2 text-white/70 font-medium">
                                    <Building2 size={16} />
                                    <span>{job.companyName}</span>
                                </div>
                            </div>
                            {shop?.logo && (
                                <div className="w-16 h-16 rounded-xl bg-white p-1 shadow-lg shrink-0">
                                    <img src={shop.logo} alt="logo" className="w-full h-full object-cover rounded-lg" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Content - Scrollable */}
                <div className="flex-1 overflow-y-auto bg-slate-50 relative -mt-6 rounded-t-3xl pt-8 px-6 md:px-10 pb-8">

                    {/* Quick Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
                            <div className="w-8 h-8 rounded-full bg-green-50 text-green-600 flex items-center justify-center mb-2"><Banknote size={16} /></div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase">Salary</span>
                            <span className="text-xs font-extrabold text-slate-900">{job.salaryRange}</span>
                        </div>
                        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
                            <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-2"><MapPin size={16} /></div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase">Location</span>
                            <span className="text-xs font-extrabold text-slate-900">{job.location}</span>
                        </div>
                        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
                            <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mb-2"><Briefcase size={16} /></div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase">Experience</span>
                            <span className="text-xs font-extrabold text-slate-900">1-3 Years</span>
                        </div>
                        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
                            <div className="w-8 h-8 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center mb-2"><Clock size={16} /></div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase">Posted</span>
                            <span className="text-xs font-extrabold text-slate-900">{new Date(job.postedDate).toLocaleDateString()}</span>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div>
                            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                                Job Description
                            </h3>
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-slate-600 leading-relaxed text-sm">
                                <p>{job.description}</p>
                                <p className="mt-4">
                                    We are looking for a dedicated professional to join our team. The ideal candidate should be passionate, hardworking, and ready to learn.
                                </p>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <span className="w-1.5 h-6 bg-secondary rounded-full"></span>
                                Requirements
                            </h3>
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                                <ul className="space-y-3">
                                    {['Good communication skills', 'Team player attitude', 'Relevant degree or certification', 'Prior experience preferred'].map((req, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm text-slate-600 font-medium">
                                            <CheckCircle2 size={18} className="text-green-500 shrink-0 mt-0.5" />
                                            <span>{req}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Application Form */}
                        <div id="apply-section" className={`transition-all duration-500 ${isApplying ? 'opacity-100' : 'opacity-100'}`}>
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                                Easy Apply
                            </h3>
                            <form className="bg-white p-6 md:p-8 rounded-3xl shadow-lg border border-slate-100 space-y-4" onSubmit={handleApply}>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-slate-500 uppercase ml-1">Full Name</label>
                                        <div className="relative">
                                            <User className="absolute left-4 top-3.5 text-slate-400" size={18} />
                                            <input type="text" placeholder="John Doe" className="w-full pl-11 pr-4 py-3 bg-slate-50 border-transparent focus:border-primary focus:bg-white rounded-xl font-bold text-sm transition-all outline-none border-2" 
                                                value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required/>
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-slate-500 uppercase ml-1">Phone Number</label>
                                        <div className="relative">
                                            <Phone className="absolute left-4 top-3.5 text-slate-400" size={18} />
                                            <input type="tel" placeholder="+91 98765 43210" className="w-full pl-11 pr-4 py-3 bg-slate-50 border-transparent focus:border-primary focus:bg-white rounded-xl font-bold text-sm transition-all outline-none border-2" 
                                                value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} required/>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-500 uppercase ml-1">Email (Optional)</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-3.5 text-slate-400" size={18} />
                                        <input type="email" placeholder="john@example.com" className="w-full pl-11 pr-4 py-3 bg-slate-50 border-transparent focus:border-primary focus:bg-white rounded-xl font-bold text-sm transition-all outline-none border-2" 
                                            value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                                    </div>
                                </div>
                                {/* Resume UI removed entirely as requested */}

                                <div className="bg-blue-50/50 rounded-xl p-4 mt-2 border border-blue-100 flex flex-col items-center text-center">
                                    <p className="text-xs font-bold text-slate-500 uppercase mb-2">Application Will Be Sent this Mail:</p>
                                    <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
                                        <a href={`tel:+${job.contactPhone || shop?.socialMedia?.whatsapp || shop?.contactNumber || '919000000000'}`} className="flex items-center gap-1.5 text-slate-700 font-bold text-sm bg-white px-3 py-1.5 rounded-lg shadow-sm border border-slate-100 hover:text-blue-600 hover:border-blue-200 transition-colors cursor-pointer">
                                            <Phone size={14} className="text-blue-500"/>
                                            +{job.contactPhone || shop?.socialMedia?.whatsapp || shop?.contactNumber || '919000000000'}
                                        </a>
                                        <a href={`mailto:${job.contactEmail || `careers@${job.companyName.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`}`} className="flex items-center gap-1.5 text-slate-700 font-bold text-sm bg-white px-3 py-1.5 rounded-lg shadow-sm border border-slate-100 hover:text-blue-600 hover:border-blue-200 transition-colors cursor-pointer">
                                            <Mail size={14} className="text-blue-500"/>
                                            {job.contactEmail || `careers@${job.companyName.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`}
                                        </a>
                                    </div>
                                </div>

                                <button className="w-full py-4 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 active:scale-95 transition-all flex items-center justify-center gap-2 text-lg mt-2">
                                    Submit Application <ChevronRight size={20} />
                                </button>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobModal;

import React, { useEffect, useState } from 'react';
import { Job, Shop } from '../types';
import { X, MapPin, Building2, Banknote, Clock, CheckCircle2, Briefcase, User, Mail, Phone, Upload, ChevronRight } from 'lucide-react';
import { api } from '../services/api';
import { Link } from 'react-router-dom';

interface JobModalProps {
  job: Job;
  onClose: () => void;
}

const JobModal: React.FC<JobModalProps> = ({ job, onClose }) => {
  const [shop, setShop] = useState<Shop | undefined>();
  const [step, setStep] = useState<'details' | 'form' | 'success'>('details');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
      name: '',
      email: '',
      phone: '',
      experience: ''
  });

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    if (job.shopId) {
        const fetchShop = async () => {
        const data = await api.getShopById(job.shopId!);
        setShop(data);
        };
        fetchShop();
    }
    return () => {
        document.body.style.overflow = 'unset';
    };
  }, [job.shopId]);

  const handleApply = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSubmitting(false);
      setStep('success');
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end md:items-center justify-center animate-fadeIn">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div 
        className="bg-white md:rounded-3xl rounded-t-3xl shadow-2xl w-full md:max-w-2xl overflow-hidden relative flex flex-col max-h-[95vh] md:max-h-[90vh] animate-slideUp z-10"
        onClick={e => e.stopPropagation()}
      >
        {/* Header / Banner */}
        <div className="relative h-40 bg-gradient-to-r from-slate-900 to-slate-800 flex-shrink-0">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <button onClick={onClose} className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-colors z-20">
                <X size={20} />
            </button>
            
            <div className="absolute -bottom-8 left-8 flex items-end">
                <div className="w-20 h-20 bg-white rounded-2xl shadow-lg p-2 flex items-center justify-center">
                    {shop ? (
                        <img src={shop.image} alt={shop.name} className="w-full h-full object-cover rounded-xl" />
                    ) : (
                        <Building2 size={40} className="text-gray-400" />
                    )}
                </div>
            </div>
        </div>

        {/* Content Body */}
        <div className="pt-12 px-8 pb-8 flex-1 overflow-y-auto bg-white">
            
            {/* Success View */}
            {step === 'success' ? (
                <div className="flex flex-col items-center justify-center h-full py-12 text-center animate-fadeIn">
                    <div className="w-24 h-24 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-6 shadow-sm">
                        <CheckCircle2 size={48} />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-3">Application Sent!</h2>
                    <p className="text-gray-500 max-w-sm mb-8">
                        Your application for <span className="font-bold text-gray-800">{job.title}</span> at {job.companyName} has been submitted successfully. Good luck!
                    </p>
                    <button 
                        onClick={onClose}
                        className="bg-gray-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-gray-800 transition-colors"
                    >
                        Close Window
                    </button>
                </div>
            ) : step === 'form' ? (
                /* Application Form */
                <div className="animate-fadeIn">
                    <button 
                        onClick={() => setStep('details')}
                        className="text-sm font-bold text-gray-400 hover:text-gray-900 flex items-center mb-6 transition-colors"
                    >
                        <ChevronRight className="rotate-180 mr-1" size={16} /> Back to Job Details
                    </button>
                    
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Apply to {job.companyName}</h2>
                    
                    <form onSubmit={handleApply} className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-3.5 text-gray-400" size={18} />
                                    <input 
                                        required
                                        type="text" 
                                        className="w-full pl-11 pr-4 py-3 bg-gray-50 rounded-xl border-0 focus:ring-2 focus:ring-primary/50 font-medium"
                                        placeholder="John Doe"
                                        value={formData.name}
                                        onChange={e => setFormData({...formData, name: e.target.value})}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                                <div className="relative">
                                    <Phone className="absolute left-4 top-3.5 text-gray-400" size={18} />
                                    <input 
                                        required
                                        type="tel" 
                                        className="w-full pl-11 pr-4 py-3 bg-gray-50 rounded-xl border-0 focus:ring-2 focus:ring-primary/50 font-medium"
                                        placeholder="+91 98765 43210"
                                        value={formData.phone}
                                        onChange={e => setFormData({...formData, phone: e.target.value})}
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-3.5 text-gray-400" size={18} />
                                <input 
                                    required
                                    type="email" 
                                    className="w-full pl-11 pr-4 py-3 bg-gray-50 rounded-xl border-0 focus:ring-2 focus:ring-primary/50 font-medium"
                                    placeholder="john@example.com"
                                    value={formData.email}
                                    onChange={e => setFormData({...formData, email: e.target.value})}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Years of Experience</label>
                            <div className="relative">
                                <Briefcase className="absolute left-4 top-3.5 text-gray-400" size={18} />
                                <select 
                                    className="w-full pl-11 pr-4 py-3 bg-gray-50 rounded-xl border-0 focus:ring-2 focus:ring-primary/50 font-medium text-gray-700"
                                    value={formData.experience}
                                    onChange={e => setFormData({...formData, experience: e.target.value})}
                                >
                                    <option value="">Select Experience</option>
                                    <option value="fresher">Fresher</option>
                                    <option value="1-2">1-2 Years</option>
                                    <option value="3-5">3-5 Years</option>
                                    <option value="5+">5+ Years</option>
                                </select>
                            </div>
                        </div>

                        <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-primary/50 transition-colors cursor-pointer bg-gray-50">
                            <Upload className="mx-auto text-gray-400 mb-2" size={24} />
                            <p className="text-sm font-bold text-gray-600">Upload Resume (Optional)</p>
                            <p className="text-xs text-gray-400 mt-1">PDF, DOCX up to 5MB</p>
                        </div>

                        <div className="pt-4">
                            <button 
                                disabled={isSubmitting}
                                type="submit"
                                className="w-full bg-gradient-to-r from-primary to-teal-800 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? 'Sending Application...' : 'Submit Application'}
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                /* Job Details */
                <div className="space-y-6 animate-fadeIn">
                    <div>
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                             <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">{job.title}</h1>
                             {job.isFeatured && (
                                <span className="bg-gradient-to-r from-amber-400 to-orange-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide shadow-sm">Featured</span>
                             )}
                        </div>
                        <div className="text-lg font-medium text-gray-500 mb-4">{job.companyName}</div>

                        <div className="flex flex-wrap gap-3">
                            <div className="flex items-center bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg text-sm font-bold">
                                <Briefcase size={16} className="mr-2" /> {job.type}
                            </div>
                            <div className="flex items-center bg-green-50 text-green-700 px-3 py-1.5 rounded-lg text-sm font-bold">
                                <Banknote size={16} className="mr-2" /> {job.salaryRange}
                            </div>
                            <div className="flex items-center bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg text-sm font-bold">
                                <MapPin size={16} className="mr-2" /> {job.location}
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-100 pt-6">
                        <h3 className="font-bold text-gray-900 text-lg mb-3">Job Description</h3>
                        <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                            {job.description}
                        </p>
                        <p className="text-gray-600 leading-relaxed text-sm md:text-base mt-4">
                            We are looking for a dedicated and skilled individual to join our team in {job.location}. 
                            The ideal candidate should have relevant experience in {job.category} and be willing to work {job.type}.
                        </p>
                    </div>

                    <div className="border-t border-gray-100 pt-6">
                        <h3 className="font-bold text-gray-900 text-lg mb-3">Key Requirements</h3>
                        <ul className="space-y-2 text-gray-600 text-sm md:text-base">
                            <li className="flex items-start"><CheckCircle2 size={18} className="text-primary mr-2 mt-0.5 shrink-0" /> Previous experience in similar role preferred</li>
                            <li className="flex items-start"><CheckCircle2 size={18} className="text-primary mr-2 mt-0.5 shrink-0" /> Good communication skills</li>
                            <li className="flex items-start"><CheckCircle2 size={18} className="text-primary mr-2 mt-0.5 shrink-0" /> Reliability and punctuality</li>
                            <li className="flex items-start"><CheckCircle2 size={18} className="text-primary mr-2 mt-0.5 shrink-0" /> Resident of {job.location} or nearby areas</li>
                        </ul>
                    </div>

                    <div className="flex items-center text-xs font-medium text-gray-400 pt-4">
                        <Clock size={14} className="mr-1.5" /> Posted on {job.postedDate}
                    </div>
                </div>
            )}
        </div>

        {/* Footer Actions (Only visible in details step) */}
        {step === 'details' && (
            <div className="p-4 bg-white border-t border-slate-100 flex flex-col md:flex-row gap-3 pb-8 md:pb-6 shadow-[0_-5px_15px_rgba(0,0,0,0.02)]">
                <button 
                    onClick={() => setStep('form')}
                    className="flex-1 bg-gradient-to-r from-primary to-teal-800 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40 active:scale-[0.98] text-center"
                >
                    Apply Now
                </button>
                {job.shopId && (
                    <Link 
                        to={`/shops/${job.shopId}`}
                        className="flex-1 bg-slate-50 hover:bg-slate-100 text-gray-800 font-bold py-3.5 rounded-xl transition-colors border border-slate-200 text-center"
                    >
                        View Company Profile
                    </Link>
                )}
            </div>
        )}

      </div>
    </div>
  );
};

export default JobModal;
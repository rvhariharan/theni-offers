import React from 'react';
import { Store, Users, Briefcase, Heart, TrendingUp, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      
      {/* Hero Section */}
      <div className="relative bg-white overflow-hidden border-b border-slate-100">
         <div className="absolute inset-0">
             <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/4"></div>
             <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl -translate-x-1/3 translate-y-1/4"></div>
         </div>
         
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative z-10 text-center">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider mb-6 animate-fadeIn">
                <Heart size={14} className="text-accent" />
                <span>Made with love in Theni</span>
             </div>
             <h1 className="text-4xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-6 leading-tight">
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-teal-600 to-secondary">Empowering Local</span> <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-teal-600 to-secondary">Commerce & Community</span>
             </h1>
             <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
                We're building the digital infrastructure to help Theni's businesses thrive and customers discover the best of their city.
             </p>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
              <div className="bg-white p-8 rounded-3xl shadow-soft flex items-center gap-6 border border-slate-100">
                  <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      <Store size={32} />
                  </div>
                  <div>
                      <div className="text-3xl font-extrabold text-slate-900">500+</div>
                      <div className="text-slate-500 font-medium">Local Businesses</div>
                  </div>
              </div>
              <div className="bg-white p-8 rounded-3xl shadow-soft flex items-center gap-6 border border-slate-100">
                  <div className="w-16 h-16 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
                      <Users size={32} />
                  </div>
                  <div>
                      <div className="text-3xl font-extrabold text-slate-900">10k+</div>
                      <div className="text-slate-500 font-medium">Monthly Users</div>
                  </div>
              </div>
              <div className="bg-white p-8 rounded-3xl shadow-soft flex items-center gap-6 border border-slate-100">
                  <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                      <TrendingUp size={32} />
                  </div>
                  <div>
                      <div className="text-3xl font-extrabold text-slate-900">₹1Cr+</div>
                      <div className="text-slate-500 font-medium">Value Generated</div>
                  </div>
              </div>
          </div>

          {/* Mission Section */}
          <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-center mb-24">
              <div>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">Bridging the Gap Between <br/><span className="text-primary">Tradition & Technology</span></h2>
                  <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                      <p>
                          Theni is a hub of culture, agriculture, and commerce. However, many local businesses struggle to reach the modern digital consumer. That's where we come in.
                      </p>
                      <p>
                          Theni Offers was born from a simple idea: <strong>What if finding a local plumber, the best saree shop, or a job nearby was as easy as a single click?</strong>
                      </p>
                      <p>
                          We are not just a marketplace; we are a community platform designed to keep the local economy vibrant. By connecting shoppers with neighborhood stores, we ensure that money stays within the community, fostering growth for everyone.
                      </p>
                  </div>
              </div>
              <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-[3rem] transform rotate-3"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1000" 
                    alt="Community Collaboration" 
                    className="relative rounded-[3rem] shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform duration-500" 
                  />
              </div>
          </div>

          {/* Value Props */}
          <div className="mb-24">
              <div className="text-center max-w-3xl mx-auto mb-16">
                  <h2 className="text-3xl font-extrabold text-slate-900 mb-4">A Platform for Everyone</h2>
                  <p className="text-slate-500 text-lg">Whether you are buying, selling, or looking for work, we have built features specifically for you.</p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                  {/* Card 1 */}
                  <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-soft hover:shadow-hover transition-all duration-300 group">
                      <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                          <Store size={32} />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-4">For Businesses</h3>
                      <p className="text-slate-500 leading-relaxed mb-8">
                          Get a premium digital storefront without the technical headache. List products, post offers, and track analytics to grow your customer base.
                      </p>
                      <ul className="space-y-3 text-slate-600 font-medium">
                          <li className="flex items-center gap-2"><ShieldCheck size={18} className="text-green-500" /> Verified Listings</li>
                          <li className="flex items-center gap-2"><ShieldCheck size={18} className="text-green-500" /> Instant Reach</li>
                          <li className="flex items-center gap-2"><ShieldCheck size={18} className="text-green-500" /> Hiring Tools</li>
                      </ul>
                  </div>

                  {/* Card 2 */}
                  <div className="bg-slate-900 rounded-[2.5rem] p-8 shadow-2xl transform md:-translate-y-4 relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
                      
                      <div className="w-16 h-16 rounded-2xl bg-white/10 text-secondary flex items-center justify-center mb-8 group-hover:scale-110 transition-transform relative z-10">
                          <Users size={32} />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-4 relative z-10">For Shoppers</h3>
                      <p className="text-slate-300 leading-relaxed mb-8 relative z-10">
                          Stop endless searching. Find exactly what you need nearby, compare prices, and get exclusive coupons that you won't find anywhere else.
                      </p>
                      <ul className="space-y-3 text-slate-300 font-medium relative z-10">
                          <li className="flex items-center gap-2"><ShieldCheck size={18} className="text-secondary" /> Free Access</li>
                          <li className="flex items-center gap-2"><ShieldCheck size={18} className="text-secondary" /> Trusted Reviews</li>
                          <li className="flex items-center gap-2"><ShieldCheck size={18} className="text-secondary" /> Direct Contact</li>
                      </ul>
                  </div>

                  {/* Card 3 */}
                  <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-soft hover:shadow-hover transition-all duration-300 group">
                      <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                          <Briefcase size={32} />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-4">For Job Seekers</h3>
                      <p className="text-slate-500 leading-relaxed mb-8">
                          Find work close to home. Connect directly with local employers for full-time, part-time, or gig opportunities.
                      </p>
                      <ul className="space-y-3 text-slate-600 font-medium">
                          <li className="flex items-center gap-2"><ShieldCheck size={18} className="text-green-500" /> Verified Employers</li>
                          <li className="flex items-center gap-2"><ShieldCheck size={18} className="text-green-500" /> No Middlemen</li>
                          <li className="flex items-center gap-2"><ShieldCheck size={18} className="text-green-500" /> Easy Apply</li>
                      </ul>
                  </div>
              </div>
          </div>

          {/* CTA Box */}
          <div className="bg-gradient-to-r from-primary to-teal-800 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <div className="relative z-10 max-w-2xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">Ready to be part of the story?</h2>
                    <p className="text-teal-100 text-lg mb-10">Join thousands of others who are reshaping how Theni connects and shops.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/contact" className="bg-white text-primary font-bold px-8 py-4 rounded-xl shadow-lg hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
                            List Your Business <ArrowRight size={20} />
                        </Link>
                        <Link to="/offers" className="bg-teal-700/50 backdrop-blur-md text-white font-bold px-8 py-4 rounded-xl hover:bg-teal-700/70 transition-colors border border-white/20">
                            Start Exploring
                        </Link>
                    </div>
                </div>
          </div>

      </div>
    </div>
  );
};

export default About;
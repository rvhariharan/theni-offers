import React from 'react';

const FAQSubscribe: React.FC = () => {
  return (
    <div className="bg-white rounded-3xl shadow-soft border border-gray-100 p-8 md:p-10 my-12">
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <details className="group bg-gray-50 rounded-2xl p-4 transition-all duration-300 open:bg-white open:shadow-md border border-transparent open:border-gray-100">
              <summary className="flex justify-between items-center font-bold text-gray-800 cursor-pointer list-none select-none">
                <span>How can I list my shop?</span>
                <span className="transition-transform duration-300 group-open:rotate-180 text-primary">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p className="text-gray-600 mt-3 text-sm leading-relaxed group-open:animate-fadeIn">
                Simply go to the Contact page and fill out the form. Our sales team will reach out to you within 24 hours to verify your business and set up your profile.
              </p>
            </details>
            
            <details className="group bg-gray-50 rounded-2xl p-4 transition-all duration-300 open:bg-white open:shadow-md border border-transparent open:border-gray-100">
              <summary className="flex justify-between items-center font-bold text-gray-800 cursor-pointer list-none select-none">
                <span>Is it free for users?</span>
                <span className="transition-transform duration-300 group-open:rotate-180 text-primary">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p className="text-gray-600 mt-3 text-sm leading-relaxed group-open:animate-fadeIn">
                Yes! Theni Offers is completely free for customers to browse offers, shops, and job listings.
              </p>
            </details>
            
            <details className="group bg-gray-50 rounded-2xl p-4 transition-all duration-300 open:bg-white open:shadow-md border border-transparent open:border-gray-100">
              <summary className="flex justify-between items-center font-bold text-gray-800 cursor-pointer list-none select-none">
                <span>How do I apply for jobs?</span>
                <span className="transition-transform duration-300 group-open:rotate-180 text-primary">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p className="text-gray-600 mt-3 text-sm leading-relaxed group-open:animate-fadeIn">
                Click on the "Apply Now" button on any job listing. You can contact the employer directly via phone or visit them in person.
              </p>
            </details>
          </div>
        </div>

        <div className="bg-slate-900 p-8 rounded-3xl text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-3xl -mr-10 -mt-10"></div>
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-3">Subscribe to Updates</h3>
            <p className="text-slate-300 mb-8">Get the latest offers and job alerts from Theni directly to your inbox. No spam, we promise.</p>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <input 
                type="email" 
                placeholder="Enter your email address" 
                className="w-full px-5 py-4 rounded-2xl border-0 bg-white/10 text-white placeholder-slate-400 focus:ring-2 focus:ring-secondary focus:bg-white/20 outline-none transition-all font-medium"
                />
                <button className="w-full bg-secondary hover:bg-amber-600 text-white font-bold py-4 rounded-2xl transition-all shadow-lg hover:shadow-amber-500/20 active:scale-95">
                Subscribe Now
                </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQSubscribe;
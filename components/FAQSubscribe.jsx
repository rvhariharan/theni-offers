import React from 'react';

const FAQSubscribe = () => {
    return (
        <div className="bg-white rounded-3xl shadow-soft border border-gray-100 p-8 md:p-10 my-12">
            <div className="grid md:grid-cols-2 gap-12">
                <div>
                    <h2 className="text-2xl font-extrabold text-gray-900 mb-8">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        <details className="group bg-gray-50 rounded-2xl p-4 transition-all duration-300 open:bg-white open:shadow-md border border-transparent open:border-gray-100">
                            <summary className="flex justify-between items-center cursor-pointer font-bold text-gray-800 marker:content-none list-none">
                                <span>How do I redeem an offer?</span>
                                <span className="text-primary transition-transform group-open:rotate-180">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                                </span>
                            </summary>
                            <div className="mt-3 text-gray-500 text-sm leading-relaxed animate-fadeIn">
                                Simply click on "View Offer" to see the details. You can download the coupon ticket or take a screenshot and show it at the shop to avail the discount.
                            </div>
                        </details>

                        <details className="group bg-gray-50 rounded-2xl p-4 transition-all duration-300 open:bg-white open:shadow-md border border-transparent open:border-gray-100">
                            <summary className="flex justify-between items-center cursor-pointer font-bold text-gray-800 marker:content-none list-none">
                                <span>Is it free to list my business?</span>
                                <span className="text-primary transition-transform group-open:rotate-180">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                                </span>
                            </summary>
                            <div className="mt-3 text-gray-500 text-sm leading-relaxed animate-fadeIn">
                                We offer both free and premium listing options. The basic listing is free forever, while premium plans give you verified badges, higher visibility, and analytics.
                            </div>
                        </details>

                        <details className="group bg-gray-50 rounded-2xl p-4 transition-all duration-300 open:bg-white open:shadow-md border border-transparent open:border-gray-100">
                            <summary className="flex justify-between items-center cursor-pointer font-bold text-gray-800 marker:content-none list-none">
                                <span>Are the jobs verified?</span>
                                <span className="text-primary transition-transform group-open:rotate-180">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                                </span>
                            </summary>
                            <div className="mt-3 text-gray-500 text-sm leading-relaxed animate-fadeIn">
                                Yes, we verify all business profiles before allowing them to post jobs. However, we always recommend candidates to exercise due diligence.
                            </div>
                        </details>
                    </div>
                </div>

                <div className="bg-primary rounded-3xl p-8 text-white relative overflow-hidden flex flex-col justify-center">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                    <div className="absolute bottom-0 left-0 w-40 h-40 bg-secondary/20 rounded-full blur-2xl -ml-10 -mb-10"></div>

                    <div className="relative z-10">
                        <h2 className="text-2xl font-extrabold mb-3">Never Miss a Deal!</h2>
                        <p className="text-white/80 mb-6">Join our WhatsApp community or email list to get the latest offers and job alerts from Theni delivered to you.</p>

                        <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-secondary/50 font-medium"
                            />
                            <button className="w-full bg-secondary hover:bg-white hover:text-primary text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-black/10">
                                Subscribe for Updates
                            </button>
                        </form>

                        <p className="text-xs text-white/40 mt-4 text-center">Unsubscribe at any time. No spam.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FAQSubscribe;

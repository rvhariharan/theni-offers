import { mockOffers, mockShops, mockJobs, mockAds } from './mockData';

// Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// NOTE: In production, switch the implementation below to use fetch() calls to the backend.
// Example: return fetch('/api/offers').then(res => res.json());

export const api = {
    getOffers: async (filters) => {
        await delay(300);
        let results = [...mockOffers];

        if (filters) {
            if (filters.category && filters.category !== 'All') {
                results = results.filter(o => o.category === filters.category);
            }
            if (filters.subCategory && filters.subCategory !== 'All') {
                results = results.filter(o => o.subCategory === filters.subCategory);
            }
            if (filters.location) {
                results = results.filter(o => o.location === filters.location);
            }
            if (filters.search) {
                const term = filters.search.toLowerCase();
                results = results.filter(o =>
                    o.title.toLowerCase().includes(term) ||
                    o.description.toLowerCase().includes(term)
                );
            }
        }
        // Sort: Sponsored first, then by date (mock)
        return results.sort((a, b) => (Number(b.isSponsored) - Number(a.isSponsored)));
    },

    getShops: async (filters) => {
        await delay(300);
        let results = [...mockShops];

        if (filters) {
            if (filters.category && filters.category !== 'All') {
                results = results.filter(s => s.category === filters.category);
            }
            if (filters.subCategory && filters.subCategory !== 'All') {
                results = results.filter(s => s.subCategory === filters.subCategory);
            }
            if (filters.location) {
                results = results.filter(s => s.area === filters.location);
            }
            if (filters.search) {
                const term = filters.search.toLowerCase();
                results = results.filter(s => s.name.toLowerCase().includes(term));
            }
        }
        // Sort: Premium first
        return results.sort((a, b) => (Number(b.isPremium) - Number(a.isPremium)));
    },

    getShopById: async (id) => {
        return mockShops.find(s => s.id === id);
    },

    getJobs: async (filters) => {
        await delay(300);
        let results = [...mockJobs];

        if (filters) {
            if (filters.category && filters.category !== 'All') {
                results = results.filter(j => j.category === filters.category);
            }
            if (filters.subCategory && filters.subCategory !== 'All') {
                results = results.filter(j => j.subCategory === filters.subCategory);
            }
            if (filters.location) {
                results = results.filter(j => j.location === filters.location);
            }
            if (filters.type && filters.type !== 'All') {
                results = results.filter(j => j.type === filters.type);
            }
            if (filters.search) {
                const term = filters.search.toLowerCase();
                results = results.filter(j =>
                    j.title.toLowerCase().includes(term) ||
                    j.companyName.toLowerCase().includes(term)
                );
            }
        }
        // Sort: Featured first
        return results.sort((a, b) => (Number(b.isFeatured) - Number(a.isFeatured)));
    },

    getAds: async (placement) => {
        await delay(100);
        return mockAds.filter(a => a.placement === placement && a.isActive);
    },

    submitContact: async (data) => {
        await delay(800);
        console.log("Form Submitted:", data);
        return { success: true };
    },

    getOffersByShopId: async (shopId) => {
        // await delay(100); 
        return mockOffers.filter(o => o.shopId === shopId);
    }
};

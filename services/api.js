import axios from 'axios';
import { API_BASE_URL } from './apiConfig';
import { mockAds, mockShops, mockOffers, mockJobs } from './mockData';

// Helper to construct query string
const buildQuery = (filters) => {
    if (!filters) return '';
    const query = new URLSearchParams();
    Object.keys(filters).forEach(key => {
        if (filters[key] && filters[key] !== 'All') {
            query.append(key, filters[key]);
        }
    });
    const queryString = query.toString();
    return queryString ? `?${queryString}` : '';
};

export const api = {
    getOffers: async (filters) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/offers${buildQuery(filters)}`);
            return [...mockOffers, ...response.data];
        } catch (error) {
            console.error('Error fetching offers:', error);
            return [...mockOffers];
        }
    },

    getShops: async (filters) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/services${buildQuery(filters)}`);
            return [...mockShops, ...response.data];
        } catch (error) {
            console.error('Error fetching services:', error);
            return [...mockShops];
        }
    },

    getShopById: async (id) => {
        try {
            // Check dummy data first
            const mockShop = mockShops.find(s => String(s.id) === String(id));
            if (mockShop) return mockShop;

            // Otherwise check database
            const response = await axios.get(`${API_BASE_URL}/services/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching service:', error);
            return null;
        }
    },

    getJobs: async (filters) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/jobs${buildQuery(filters)}`);
            return [...mockJobs, ...response.data];
        } catch (error) {
            console.error('Error fetching jobs:', error);
            return [...mockJobs];
        }
    },

    getAds: async (placement) => {
        return mockAds.filter(a => a.placement === placement && a.isActive);
    },

    submitContact: async (data) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/contact`, data);
            return response.data;
        } catch (error) {
            console.error('Error submitting form:', error);
            return { success: false, error };
        }
    },

    getOffersByShopId: async (shopId) => {
        try {
            const mockShopOffers = mockOffers.filter(o => String(o.shopId) === String(shopId));
            const response = await axios.get(`${API_BASE_URL}/offers?shopId=${shopId}`);
            return [...mockShopOffers, ...response.data];
        } catch (error) {
            console.error('Error fetching offers by shop id:', error);
            return mockOffers.filter(o => String(o.shopId) === String(shopId));
        }
    }
};

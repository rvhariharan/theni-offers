export interface Shop {
  id: string;
  name: string;
  category: string;
  subCategory?: string;
  description: string;
  address: string;
  area: string;
  contactNumber: string;
  isPremium: boolean;
  isVerified?: boolean;
  image: string;
  logo: string;
  rating: number;
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    whatsapp?: string;
    website?: string;
  };
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  discountPercentage: number;
  validUntil: string; // ISO date string
  category: string;
  subCategory?: string;
  shopId: string;
  location: string;
  isSponsored: boolean;
  image: string;
  originalPrice?: number;
  offerPrice?: number;
  terms?: string;
  code?: string;
}

export interface Job {
  id: string;
  title: string;
  companyName: string;
  shopId?: string; // Optional link to a shop
  type: 'Full-time' | 'Part-time' | 'Contract';
  salaryRange: string;
  location: string;
  category: string;
  subCategory?: string;
  isFeatured: boolean;
  postedDate: string;
  description: string;
}

export interface Ad {
  id: string;
  title: string;
  imageUrl: string;
  videoUrl?: string;
  type: 'image' | 'video';
  redirectUrl: string;
  placement: 'home_banner' | 'category_banner' | 'sidebar' | 'list_insert' | 'detail_page';
  isActive: boolean;
}

// Filter Types
export interface FilterState {
  category: string;
  subCategory?: string;
  location: string;
  search: string;
  type?: string; // For jobs
}
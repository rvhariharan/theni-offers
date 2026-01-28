const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true, index: true },
  description: String,
  address: String,
  area: { type: String, required: true, index: true },
  contactNumber: String,
  isPremium: { type: Boolean, default: false },
  image: String,
  rating: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

const offerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  discountPercentage: Number,
  validUntil: Date,
  category: { type: String, index: true },
  shop: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop', required: true },
  location: { type: String, index: true },
  isSponsored: { type: Boolean, default: false },
  image: String,
  originalPrice: Number,
  offerPrice: Number,
  createdAt: { type: Date, default: Date.now }
});

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  companyName: String,
  shop: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop' },
  type: { type: String, enum: ['Full-time', 'Part-time', 'Contract'], index: true },
  salaryRange: String,
  location: { type: String, index: true },
  category: String,
  isFeatured: { type: Boolean, default: false },
  description: String,
  postedDate: { type: Date, default: Date.now }
});

const adSchema = new mongoose.Schema({
  title: String,
  imageUrl: String,
  videoUrl: String,
  type: { type: String, enum: ['image', 'video'], default: 'image' },
  redirectUrl: String,
  placement: { type: String, enum: ['home_banner', 'category_banner', 'sidebar', 'list_insert', 'detail_page'], index: true },
  isActive: { type: Boolean, default: true }
});

const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    date: { type: Date, default: Date.now }
});

module.exports = {
  Shop: mongoose.model('Shop', shopSchema),
  Offer: mongoose.model('Offer', offerSchema),
  Job: mongoose.model('Job', jobSchema),
  Ad: mongoose.model('Ad', adSchema),
  Contact: mongoose.model('Contact', contactSchema)
};
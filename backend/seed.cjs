const mongoose = require('mongoose');
const { Shop, Offer, Job, Ad } = require('./models.cjs');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/theni_offers';

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to DB for Seeding'))
  .catch(err => console.error(err));

const seedDB = async () => {
  try {
    // Clear existing
    await Shop.deleteMany({});
    await Offer.deleteMany({});
    await Job.deleteMany({});
    await Ad.deleteMany({});

    // Create Shops
    const shops = await Shop.insertMany([
      {
        name: 'Theni Mobiles & Gadgets',
        category: 'Electronics',
        description: 'Best smartphones in Theni',
        address: '123 Bazaar St',
        area: 'Theni Main',
        contactNumber: '9876543210',
        isPremium: true,
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=800',
        rating: 4.8
      },
      // ... (Add full list from mockData.ts here in production)
    ]);

    console.log(`Seeded ${shops.length} shops`);

    // Create Ads
    await Ad.insertMany([
      {
        title: 'Mega Property Sale',
        imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1200',
        redirectUrl: '#',
        placement: 'home_banner',
        isActive: true,
        type: 'image'
      },
      // ... (Add full list from mockData.ts here in production)
    ]);

    console.log('Database Seeded Successfully');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDB();
const express = require('express');
const router = express.Router();
const { Shop, Offer, Job, Ad, Contact } = require('./models.cjs');

// --- SHOPS ---
router.get('/shops', async (req, res) => {
  try {
    const { category, location, search, limit } = req.query;
    let query = {};
    if (category) query.category = category;
    if (location) query.area = location;
    if (search) query.name = { $regex: search, $options: 'i' };

    let shops = Shop.find(query).sort({ isPremium: -1, rating: -1 });
    if (limit) shops = shops.limit(Number(limit));

    res.json(await shops);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/shops/:id', async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.id);
    if (!shop) return res.status(404).json({ message: 'Shop not found' });
    res.json(shop);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// --- OFFERS ---
router.get('/offers', async (req, res) => {
  try {
    const { category, location, search, limit } = req.query;
    let query = { validUntil: { $gte: new Date() } }; // Active offers only
    if (category) query.category = category;
    if (location) query.location = location;
    if (search) query.title = { $regex: search, $options: 'i' };

    let offers = Offer.find(query).sort({ isSponsored: -1, createdAt: -1 });
    if (limit) offers = offers.limit(Number(limit));

    res.json(await offers);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// --- JOBS ---
router.get('/jobs', async (req, res) => {
  try {
    const { category, location, type, limit } = req.query;
    let query = {};
    if (category) query.category = category;
    if (location) query.location = location;
    if (type) query.type = type;

    let jobs = Job.find(query).sort({ isFeatured: -1, postedDate: -1 });
    if (limit) jobs = jobs.limit(Number(limit));

    res.json(await jobs);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// --- ADS ---
router.get('/ads', async (req, res) => {
  try {
    const { placement } = req.query;
    let query = { isActive: true };
    if (placement) query.placement = placement;

    res.json(await Ad.find(query));
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// --- CONTACT ---
router.post('/contact', async (req, res) => {
  try {
    await Contact.create(req.body);
    res.json({ success: true, message: 'Message sent' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
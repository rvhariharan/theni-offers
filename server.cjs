const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./backend/routes.cjs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/theni_offers', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('MongoDB Connection Error:', err));

// Routes
app.use('/api', routes);

// Health Check
app.get('/', (req, res) => {
  res.send('Theni Offers API Running');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
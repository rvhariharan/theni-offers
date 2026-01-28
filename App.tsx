import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import OffersPage from './pages/OffersPage';
import ShopsPage from './pages/ShopsPage';
import JobsPage from './pages/JobsPage';
import ShopDetail from './pages/ShopDetail';
import About from './pages/About';
import Contact from './pages/Contact';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/offers" element={<OffersPage />} />
          <Route path="/shops" element={<ShopsPage />} />
          <Route path="/shops/:id" element={<ShopDetail />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
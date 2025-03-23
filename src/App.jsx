import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ConfigurePage from './pages/ConfigurePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Add other routes as needed */}
        <Route path="/configure" element={<ConfigurePage />} />
        <Route path="/metrics" element={<div className="p-8 text-center">Metrics Dashboard (To be implemented)</div>} />
        <Route path="/scraper" element={<div className="p-8 text-center">Scraper Controls (To be implemented)</div>} />
      </Routes>
    </Router>
  );
}

export default App;
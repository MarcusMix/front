import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/login/login';
import ServiceDetails from './pages/services/services';

function App() {
  return (
    <Router>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/service/:id" element={<ServiceDetails/>} />
      </Routes>
    </Router>
  );
}

export default App;

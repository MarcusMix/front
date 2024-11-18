import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/login/login';
import ServiceDetails from './pages/services/services';
import SignUpUser from './pages/signup-user/signup-user';
import SignUpService from './pages/signup-service/signup-service';
import Profile from './pages/profile/profile';
import ProviderProfile from './pages/providerProfile/providerProfile'; // Importe o componente

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup-user" element={<SignUpUser />} />
        <Route path="/signup-service" element={<SignUpService />} />
        <Route path="/service/:id" element={<ServiceDetails />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/my-provider-profile" element={<ProviderProfile />} />
        <Route path="/provider-profile/:id" element={<ProviderProfile />} />
      </Routes>
    </Router>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/login/login';
import ServiceDetails from './pages/services/services';
import SignUpUser from './pages/signup-user/signup-user';
import SignUpService from './pages/signup-service/signup-service';
import ConfigUser from './pages/config-user/config-user';

function App() {
  return (
    <Router>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup-user" element={<SignUpUser />} />
        <Route path="/signup-service" element={<SignUpService/>} />
        <Route path="/service/:id" element={<ServiceDetails/>} />
        <Route path="/config-user" element={<ConfigUser/>} />
      </Routes>
    </Router>
  );
}

export default App;

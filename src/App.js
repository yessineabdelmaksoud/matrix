// src/App.js
import React, { useState } from 'react';
import CustomNavbar from './navbar';
import Home from './home';
import Footer from './Footer';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Seidel from './pages/seidel';
import AboutUs from './pages/AboutUs';
import SignUp from './connection/SignUp';
import Login from './connection/Login';
import Historique from './connection/Historique';
import Userguide from './pages/userguide';

function App() {
  const location = useLocation();
  const [user, setUser] = useState(null);

  const showFooter = location.pathname === '/';

  return (
    <>
      <CustomNavbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gauss-seidel" element={<Seidel />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/historique" element={<Historique />} />
        <Route path="/userguide" element={<Userguide />} />
      </Routes>
      {showFooter && <Footer />}
    </>
  );
}

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;

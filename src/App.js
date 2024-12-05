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


function App() {
  const location = useLocation();
  const [user, setUser] = useState(null); 

  const showFooter = location.pathname === '/';

  return (
    <>
      <CustomNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gauss-seidel" element={<Seidel />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
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
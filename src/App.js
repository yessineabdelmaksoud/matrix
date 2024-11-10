// src/App.js
import React from 'react';
import CustomNavbar from './navbar';
import Home from './home';
import Footer from './Footer';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Seidel from './pages/seidel'; 

function App() {
  const location = useLocation();

  const showFooter = location.pathname === '/';

  return (
    <>
      <CustomNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gauss-seidel" element={<Seidel />} />
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
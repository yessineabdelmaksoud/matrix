// src/App.js
import React from 'react';
import CustomNavbar from './navbar';
import Home from './home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Seidel from './pages/seidel'; 

function App() {
  return (
    <Router>
      <CustomNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gauss-seidel" element={<Seidel  />} />
      </Routes>
    </Router>
  );
}

export default App;

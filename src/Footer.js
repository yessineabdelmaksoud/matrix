// src/Footer.js
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Footer.css';
import { FaFacebook, FaTwitter, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <hr className="footer-divider" />
        <Row className="justify-content-between align-items-center">
          {/* Section Title and Links */}
          <Col md={4} className="footer-section text-center text-md-start">
            <h5 className="footer-title">Matrix Ops</h5>
            <ul className="footer-links">
              <li><a href="/about">À propos de Matrix</a></li>
              <li><a href="/help">Centre d'aide</a></li>
              <li><a href="/license">License</a></li>
            </ul>
          </Col>

          {/* App Store Links */}
          <Col md={4} className="footer-section text-center">
            <p>Télécharger notre application</p>
            <div className="app-links">
              <img src={`${process.env.PUBLIC_URL}/palystore1.png`} alt="Play Store" className="app-icon" />
              <img src={`${process.env.PUBLIC_URL}/apple.png`} alt="Apple Store" className="app-icon" />
            </div>
          </Col>

          {/* Additional Image to the Right */}
          <Col md={4} className="footer-section text-center text-md-end">
            <img src={`${process.env.PUBLIC_URL}/math.jpg`} alt="Extra" className="extra-image" />
          </Col>
        </Row>

        <hr className="footer-divider" />

        <Row className="align-items-center">
          {/* Bottom Left: Logo and Copyright */}
          <Col md={4} className="footer-section text-center text-md-start">
            <img src={`${process.env.PUBLIC_URL}/matrice.png`} alt="Logo" height="50px" className="footer-logo" />
            <p>© 2024 Matrix Ops®</p>
          </Col>

          {/* Bottom Right: Social Icons */}
          <Col className="social-icons text-center text-md-end">
            <a href="https://facebook.com" aria-label="Facebook"><FaFacebook /></a>
            <a href="https://twitter.com" aria-label="Twitter"><FaTwitter /></a>
            <a href="https://github.com" aria-label="Github"><FaGithub /></a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './navbar.css';

function CustomNavbar() {
  const navigate = useNavigate();

  const handleAlgorithmChange = (eventKey) => {
    if (eventKey) {
      navigate(eventKey);
    } 
  };

  return (
    <Navbar expand="lg" bg="light" variant="light" fixed="top">
      <Container>
        <Navbar.Brand href="#"> 
          <img
            src="/logo.png"
            width="180"
            height="60"
            alt="Logo"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto"> 
            <Nav.Link onClick={() => navigate('/')}>Home</Nav.Link>
            <Nav.Link>Historique</Nav.Link>
            <Nav.Link onClick={() => navigate('/about-us')}>About Us</Nav.Link>
            <NavDropdown title="Type Algo" onSelect={handleAlgorithmChange}>
              <NavDropdown.Item eventKey="/decomposition-lu">Décomposition LU</NavDropdown.Item>
              <NavDropdown.Item eventKey="/cholesky">Cholesky</NavDropdown.Item>
              <NavDropdown.Item eventKey="/gauss-elimination">Élimination de Gauss</NavDropdown.Item>
              <NavDropdown.Item eventKey="/gauss-jordan">Gauss-Jordan</NavDropdown.Item>
              <NavDropdown.Item eventKey="/gauss-seidel">Gauss-Seidel</NavDropdown.Item>
              <NavDropdown.Item eventKey="/jacobi">Jacobi</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav className="ml-auto">
            <Nav.Link href="#" className="signup-link">Sign up</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;



    
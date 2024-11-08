import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './home.css';

const Home = () => {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate('/gauss-seidel'); 
  };

  return (
    <Container fluid className="d-flex justify-content-center align-items-center min-vh-100">
      <Row className="w-100">
        <Col md={6} className="text-center my-4">
          <h1 className="display-4 mb-5">Welcome to Matrix Ops</h1>
          <h5 className="lead mb-5" >Solve your linear equation systems effortlessly using powerful algorithms.</h5>
          <br></br>
          <p className="lead mb-4">
            Whether you're a student, engineer, or researcher, our tool helps you tackle complex systems in no time. Experience an intuitive interface, fast results, and guaranteed precision for your matrix and linear calculations.
          </p>
          <h2 className="display-6 mb-5">Start with Gauss-Seidel</h2>
          <Button variant="primary" size="lg " className="btn-orange" onClick={handleStartClick}>Start</Button>
        </Col>

        <Col md={5} className="text-center text-md-end">
          <img src="/matrix2.png" alt="Image" className="img-fluid home-image" />
        </Col>
      </Row>
      
    </Container>

    
    
  );
};

export default Home;
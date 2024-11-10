//home.js
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
    <Container fluid className="d-flex justify-content-center align-items-center min-vh-100 flex-column">
        <br />
        <br />
      {/* Section 1: Centré horizontalement et verticalement */}
      <Row className="w-100 align-items-center my-5">
        <Col md={6} className="text-center d-flex flex-column align-items-center justify-content-center">
          <h1 className="display-4 mb-4">Welcome to Matrix Ops</h1>
          <h5 className="lead mb-4">Solve your linear equation systems effortlessly using powerful algorithms.</h5>
          <p className="lead mb-4">
            Whether you're a student, engineer, or researcher, our tool helps you tackle complex systems in no time. Experience an intuitive interface, fast results, and guaranteed precision for your matrix and linear calculations.
          </p>
          <h2 className="display-6 mb-4">Start with Gauss-Seidel</h2>
          <Button variant="primary" size="lg" className="btn-orange mt-3" onClick={handleStartClick}>Start</Button>
        </Col>
        <Col md={5} className="text-center">
          <img src="/matrix2.png" alt="Matrix illustration" className="img-fluid home-image" />
        </Col>
      </Row>

      {/* Section 2 */}
      <Row className="w-100 align-items-center my-5">
        <Col md={5} className="text-center">
          <img src="/sys3.gif" alt="System GIF" className="img-fluid mb-3" />
        </Col>
        <Col md={6} className="text-center d-flex flex-column align-items-center justify-content-center">
          <h3 className="mb-4">Solve Linear Equations Easily</h3>
          <p>
          On our website you can easily solve systems of linear equations by following a few simple steps. Choose your preferred algorithm, the matrix type (dense, symmetric, diagonal, etc.), and enter the matrix size. You can also generate the matrix randomly, download it, or enter it manually.
          </p>
        </Col>
      </Row>

      {/* Section 3 */}
      <Row className="w-100 align-items-center my-5">
        <Col md={6} className="text-center text-md-end my-4">
          <p>
          Before clicking "Calculate", you can check the complexity of the chosen algorithm. Once the calculation is done, the result will be displayed as a column vector, ready for analysis.
          </p>
        </Col>
        <Col md={5} className="text-center">
          <img src="/sys2.gif" alt="Calculation result illustration" className="img-fluid mt-3" />
        </Col>
      </Row>
    </Container>
    
  );
};

export default Home;

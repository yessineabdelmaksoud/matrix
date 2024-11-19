// src/pages/AboutUs.js
import React from 'react';
import { Container, Row, Col, Image, Accordion, Card } from 'react-bootstrap';
import './AboutUs.css';

function AboutUs() {
    return (
      <div className="about-us-page">
        <br/>
        <br/>
        <br/>
        <header className="about-us-header">
          <h1>About Us</h1>
          <h2>Best Website for Matrix Calculations</h2>
        </header>
        <Container>
        <Row className="text-center my-5">
  <Col>
    <Image src="/tet.jpeg" roundedCircle className="profile-img" />
    <h3 className="mt-3">Our Professor</h3>
    <h5>
      <a
        href="https://www.linkedin.com/in/sirine-marrakchi-5a691a66/"
        target="_blank"
        rel="noopener noreferrer"
        className="linkedin-link"
      >
        Cyrine Marrakchi
      </a>
    </h5>
  </Col>
</Row>
<Row className="text-center">
  <Col md={4}>
    <Image src="/tet1.jpeg" roundedCircle className="team-img" />
    <h5 className="mt-3">
      <a
        href="https://www.linkedin.com/in/yessine-abdelmaksoud-a63b27270/"
        target="_blank"
        rel="noopener noreferrer"
        className="linkedin-link"
      >
        Yessine Abdelmaksoud
      </a>
    </h5>
  </Col>
  <Col md={4}>
    <Image src="/tet2.jpeg" roundedCircle className="team-img" />
    <h5 className="mt-3">
      <a
        href="https://www.linkedin.com/in/omar-bouattour-145501297/"
        target="_blank"
        rel="noopener noreferrer"
        className="linkedin-link"
      >
        Omar Bouattour
      </a>
    </h5>
  </Col>
  <Col md={4}>
    <Image src="/tet3.jpeg" roundedCircle className="team-img" />
    <h5 className="mt-3">
      <a
        href="https://www.linkedin.com/in/mohamed-ali-abid-2718191a6/"
        target="_blank"
        rel="noopener noreferrer"
        className="linkedin-link"
      >
        Med Ali Abid
      </a>
    </h5>
  </Col>
</Row>

          <Row className="text-center mt-5">
            <Col>
              <h4>Project Source Code</h4>
              <br />
              <a
                href="https://github.com/yessineabdelmaksoud/matrix"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                View on GitHub
              </a>
            </Col>
          </Row>
          

<Row className="mt-5 text-center">
  <Col md={3}>
    <div className="tech-card">
      <img src="/react.png" alt="React" className="tech-icon" />
      <h5>React</h5>
      <p>Frontend framework used for building the user interface.</p>
    </div>
  </Col>
  <Col md={3}>
    <div className="tech-card">
      <img src="/bootstrap.jpeg" alt="Bootstrap" className="tech-icon" />
      <h5>Bootstrap</h5>
      <p>CSS framework used for responsive design.</p>
    </div>
  </Col>
  <Col md={3}>
    <div className="tech-card">
      <img src="/node.png" alt="Node.js" className="tech-icon" />
      <h5>Node.js</h5>
      <p>Backend runtime environment for server-side logic.</p>
    </div>
  </Col>
  <Col md={3}>
    <div className="tech-card">
      <img src="/js.png" alt="Node.js" className="tech-icon" />
      <h5>java script</h5>
      <p>write the algorithms</p>
    </div>
  </Col>
</Row>
<Row className="mt-5">
  <Col md={{ span: 6, offset: 3 }}>
    <h4 className="text-center">Leave Your Feedback</h4>
    <form>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Name</label>
        <input type="text" className="form-control" id="name" placeholder="Your name" />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email</label>
        <input type="email" className="form-control" id="email" placeholder="Your email" />
      </div>
      <div className="mb-3">
        <label htmlFor="feedback" className="form-label">Feedback</label>
        <textarea className="form-control" id="feedback" rows="3" placeholder="Your feedback"></textarea>
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  </Col>
</Row>
<Row className="text-center mt-5">
  <Col>
    <blockquote className="blockquote">
      <p>“Mathematics is not about numbers, equations, or algorithms: it is about understanding.”</p>
      <footer className="blockquote-footer">William Paul Thurston</footer>
    </blockquote>
  </Col>
</Row>

          
        </Container>
      </div>
    );
  }
  
  export default AboutUs;
  

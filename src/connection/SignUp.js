import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/signup', {
        username,
        email,
        password,
      });
      if (response && response.data) {
        setMessage(response.data);
      } else {
        setMessage('Unexpected response from server');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setMessage(error.response.data);
      } else {
        setMessage('An error occurred');
      }
    }
  };

  return (
    <Container className="d-flex justify-content-center mt-5">
      <Form onSubmit={handleSubmit} style={{ width: '300px' }}>
      <br />
      <br />
      <br />
      <br />
        <h2 className="text-center">Sign Up</h2>
        {message && <Alert variant="info">{message}</Alert>}
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Sign Up
        </Button>
      </Form>
    </Container>
  );
}

export default SignUp;

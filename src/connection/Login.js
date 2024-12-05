// src/connection/Login.js
import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

function Login({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', {
        email,
        password,
      });
      if (response && response.data) {
        setUser(response.data); // Mettre à jour l'utilisateur connecté
        setMessage('Connexion réussie !');
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
        <h2 className="text-center">Login</h2>
        {message && <Alert variant="info">{message}</Alert>}
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
          Login
        </Button>
      </Form>
    </Container>
  );
}

export default Login;

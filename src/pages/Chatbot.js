import React, { useState } from 'react';
import { Card, Form, Button, ListGroup } from 'react-bootstrap';
import axios from 'axios';
import './Chatbot.css'; // Assurez-vous d'avoir un fichier CSS pour les styles

const Chatbot = () => {
  const [userInput, setUserInput] = useState(''); // Saisie utilisateur
  const [chatHistory, setChatHistory] = useState([]); // Historique des messages

  // Fonction pour envoyer un message
  const sendMessage = async () => {
    if (userInput.trim() === '') return;

    // Ajouter le message de l'utilisateur à l'historique
    setChatHistory([...chatHistory, { sender: 'User', message: userInput }]);
    setUserInput('');

    try {
      const response = await axios.post(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyBlz2mN6x_XtoZKu9db4E7BRQO-ItV-wns',
        {
          contents: [{ parts: [{ text: userInput }] }]
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      // Ajouter la réponse de l'API à l'historique
      const botResponse = response.data.candidates[0].content.parts[0].text;
      setChatHistory((prevHistory) => [...prevHistory, { sender: 'Bot', message: botResponse }]);
    } catch (error) {
      console.error('Erreur lors de l\'appel à l\'API:', error);
      setChatHistory((prevHistory) => [...prevHistory, { sender: 'Bot', message: 'Désolé, une erreur est survenue.' }]);
    }
  };

  return (
    <Card style={{ height: '100%', padding: '20px', borderColor: '#FFD580' }}>
      <Card.Body>
        <Card.Title className="text-center">💬 MatX Chatbot</Card.Title>
        <ListGroup variant="flush" style={{ maxHeight: '300px', overflowY: 'scroll', marginBottom: '20px' }}>
          {chatHistory.map((chat, index) => (
            <ListGroup.Item key={index} className={chat.sender === 'User' ? 'user-message' : 'bot-message'}>
              <strong>{chat.sender}:</strong>
              <div dangerouslySetInnerHTML={{ __html: chat.message.replace(/\n/g, '<br/>') }} />
            </ListGroup.Item>
          ))}
        </ListGroup>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Posez une question..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          />
        </Form.Group>
        <Button variant="primary" className="mt-2" onClick={sendMessage}>
          Envoyer
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Chatbot;

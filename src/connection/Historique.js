import React, { useEffect, useState } from 'react';
import { Card, Table } from 'react-bootstrap';
import axios from 'axios';
import Chatbot from '../pages/Chatbot';

function Historique() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get('/matrix-history');
        console.log('Réponse de l\'historique:', response.data); // Ajoutez ce log
        setHistory(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération de l\'historique:', error);
      }
    };

    fetchHistory();
  }, []);

  return (
    
    <Card className="m-5 p-4">
      <br />
      <br />
      <h3>Historique des Matrices</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Date</th>
            <th>Algorithme</th>
            <th>Matrice</th>
            <th>Vecteur B</th>
          </tr>
        </thead>
        <tbody>
          {history.map((entry, index) => (
            <tr key={entry.id}>
              <td>{index + 1}</td>
              <td>{new Date(entry.date).toLocaleString()}</td>
              <td>{entry.algorithm}</td>
              <td>
                <pre>{JSON.stringify(entry.matrix, null, 2)}</pre>
              </td>
              <td>
                <pre>{JSON.stringify(entry.vectorB, null, 2)}</pre>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <br />
      <br />
      <Chatbot />
    </Card>
    
  );
}

export default Historique;

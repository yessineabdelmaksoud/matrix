// src/pages/Seidel.js
import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';
import './seidel.css';
import { TbBackground } from 'react-icons/tb';

function Seidel() {
  const [method, setMethod] = useState('manual');
  const [algorithm, setAlgorithm] = useState('gauss-seidel');
  const [matrix, setMatrix] = useState([]);
  const [size, setSize] = useState(3);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(10);
  const [matrixType, setMatrixType] = useState('triangular-lower');

  const handleMethodChange = (event) => {
    setMethod(event.target.value);
  };

  const handleAlgorithmChange = (event) => {
    setAlgorithm(event.target.value);
  };

  const handleSizeChange = (event) => {
    setSize(parseInt(event.target.value, 10));
  };

  const handleMinChange = (event) => {
    setMin(parseInt(event.target.value, 10));
  };

  const handleMaxChange = (event) => {
    setMax(parseInt(event.target.value, 10));
  };

  const handleMatrixTypeChange = (event) => {
    setMatrixType(event.target.value);
  };

  const generateMatrix = () => {
    // Logique pour générer ou afficher la matrice
  };

  const calculate = () => {
    // Logique pour les calculs sur la matrice
  };

  return (
    <Container className="d-flex justify-content-center mt-5" >
      
      <Card className="aa" style={{ width: '80%', padding: '20px', borderColor: '#FFD580'}}>
      <br/>
        <h2 className="text-center">Gauss-Seidel Calculator</h2>

        {/* Section pour choisir la méthode d'entrée */}
        <Card className="p-3 mb-4" style={{ borderColor: '#FFD580' }}>
          <h5 className="text-center">Matrix Input Method</h5>
          <br />
          <Row className="justify-content-center">
            <Col sm="auto">
              <Form.Check
                type="radio"
                label="Manually"
                name="method"
                value="manual"
                checked={method === 'manual'}
                onChange={handleMethodChange}
              />
            </Col>
            <Col sm="auto">
              <Form.Check
                type="radio"
                label="Random"
                name="method"
                value="random"
                checked={method === 'random'}
                onChange={handleMethodChange}
              />
            </Col>
            <Col sm="auto">
              <Form.Check
                type="radio"
                label="File"
                name="method"
                value="file"
                checked={method === 'file'}
                onChange={handleMethodChange}
              />
            </Col>
          </Row>

          {/* Type de matrice pour méthode "Random" */}
          
        </Card>

        {/* Taille de la matrice et sélection de l'algorithme */}
        <Card className="p-3 mb-4" style={{ borderColor: '#FFD580'}}>
          <Form.Group as={Row} className="mb-3 justify-content-center" >
            <Form.Label column sm={3} className="text-center">Matrix Size (n)</Form.Label>
            <Col sm={6}>
              <Form.Control type="number" value={size} onChange={handleSizeChange} min="1" />
            </Col>
          </Form.Group>

          {method === 'random' && (
            <Form.Group as={Row} className="mt-3 justify-content-center">
              <Form.Label column sm={3} className="text-center">Matrix Type</Form.Label>
              <Col sm={6}>
                <Form.Control as="select" value={matrixType} onChange={handleMatrixTypeChange} >
                  <option value="triangular-lower">Lower Triangular</option>
                  <option value="triangular-upper">Upper Triangular</option>
                  <option value="half-band-lower">Lower Half-Band</option>
                  <option value="half-band-upper">Upper Half-Band</option>
                  <option value="band">Band Matrix</option>
                  <option value="diagonally-dominant">Diagonally Dominant</option>
                  <option value="symmetric">Symmetric</option>
                  <option value="asymmetric">Asymmetric</option>
                  <option value="positive-definite">Positive Definite</option>
                </Form.Control>
              </Col>
            </Form.Group>
          )}

          <Form.Group as={Row} className="mt-4 justify-content-center">
            <Form.Label column sm={3} className="text-center" >Select Algorithm</Form.Label>
            <Col sm={6}>
              <Form.Control as="select" value={algorithm} onChange={handleAlgorithmChange} >
                <option value="transpose">Transpose</option>
                <option value="determinant">Determinant</option>
                <option value="inverse">Inverse</option>
                <option value="positive-definite">Positive Definite</option>
                <option value="gauss-seidel">Gauss-Seidel</option>
              </Form.Control>
            </Col>
          </Form.Group>
        </Card>

        {/* Entrée de matrice et vecteur pour méthode "Manually" */}
        {method === 'manual' && (
          <Card className="p-3 mb-4" style={{ borderColor: '#FFD580' }}>
            <h5 className="text-center">Enter Matrix (M)</h5>
            <Form.Group className="mb-3">
              <div>
                {[...Array(size)].map((_, i) => (
                  <Row key={i} className="justify-content-center">
                    {[...Array(size)].map((_, j) => (
                      <Col sm="auto" key={j}>
                        <Form.Control type="number" placeholder={`M[${i}][${j}]`} />
                      </Col>
                    ))}
                  </Row>
                ))}
              </div>
            </Form.Group>

            {/* Entrée du vecteur si Gauss-Seidel est sélectionné */}
            {algorithm === 'gauss-seidel' && (
              <Form.Group className="mb-3">
                <h5 className="text-center">Enter Vector (b)</h5>
                <Row className="justify-content-center">
                  {[...Array(size)].map((_, i) => (
                    <Col sm="auto" key={i}>
                      <Form.Control type="number" placeholder={`b[${i}]`} />
                    </Col>
                  ))}
                </Row>
              </Form.Group>
            )}
          </Card>
        )}

        {/* Paramètres pour la méthode aléatoire */}
        {method === 'random' && (
          <Card className="p-3 mb-4" style={{ borderColor: '#FFD580'  }}>
            <Form.Group as={Row} className="mb-3 justify-content-center">
              <Form.Label column sm={3}>Min Element</Form.Label>
              <Col sm={3}>
                <Form.Control type="number" value={min} onChange={handleMinChange} />
              </Col>
              <Form.Label column sm={3}>Max Element</Form.Label>
              <Col sm={3}>
                <Form.Control type="number" value={max} onChange={handleMaxChange} />
              </Col>
            </Form.Group>
          </Card>
        )}

        {/* Upload de fichier si la méthode "File" est sélectionnée */}
        {method === 'file' && (
          <Card className="p-3 mb-4" style={{ borderColor: '#FFD580' }}>
            <Form.Group className="mb-3">
              <Form.Label>Upload Matrix File</Form.Label>
              <Form.Control type="file" />
            </Form.Group>
          </Card>
        )}

        {/* Boutons d'actions */}
        <div className="text-center mt-4">
          <Button className="btn-show-matrix mx-2" onClick={generateMatrix}>Show Matrix</Button>
          <Button className="btn-calculate mx-2" onClick={calculate}>Calculate</Button>
        </div>
      </Card>
    </Container>
  );
}

export default Seidel;

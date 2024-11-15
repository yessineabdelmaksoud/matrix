// src/pages/Seidel.js
import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';
import { gaussSeidel } from '../Algorithms/Algorithm';
import './seidel.css';
import { generateMatrixByType } from '../Algorithms/typematrice';

function Seidel() {
  const [method, setMethod] = useState('manual');
  const [algorithm, setAlgorithm] = useState('gauss-seidel');
  const [matrix, setMatrix] = useState(Array(3).fill().map(() => Array(3).fill(0)));
  const [vectorB, setVectorB] = useState(Array(3).fill(0));
  const [size, setSize] = useState(3);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(10);
  const [matrixType, setMatrixType] = useState('dense');
  const [matrixDisplay, setMatrixDisplay] = useState(null);

  const handleMethodChange = (event) => {
    setMethod(event.target.value);
  };

  const handleAlgorithmChange = (event) => {
    setAlgorithm(event.target.value);
  };


  const handleSizeChange = (event) => {
    let newSize = parseInt(event.target.value, 10);
    if (isNaN(newSize) || newSize < 1) {
      newSize = 1;
    } else if (newSize > 10 && method === 'manual' ) {
      newSize = 10;
    }
    setSize(newSize);
    setMatrix(Array(newSize).fill().map(() => Array(newSize).fill(0)));
    setVectorB(Array(newSize).fill(0));
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

  const generateRandomMatrix = () => {
    const { matrix, vectorB } = generateMatrixByType(size, matrixType, min, max, algorithm);
  
    setMatrix(matrix);
    setVectorB(vectorB);
  };


  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const lines = e.target.result.split('\n').map(line => line.trim());
      const newMatrix = lines.slice(0, size).map(line => line.split(' ').map(Number));
      setMatrix(newMatrix);

      if (algorithm === 'gauss-seidel') {
        const newVectorB = lines[size].split(' ').map(Number);
        setVectorB(newVectorB);
      }
    };
    reader.readAsText(file);
  };

  const handleMatrixChange = (row, col, value) => {
    const updatedMatrix = matrix.map((r, i) =>
      i === row ? r.map((val, j) => (j === col ? parseFloat(value) : val)) : r
    );
    setMatrix(updatedMatrix);
  };

  const handleVectorChange = (index, value) => {
    const updatedVectorB = vectorB.map((val, i) => (i === index ? parseFloat(value) : val));
    setVectorB(updatedVectorB);
  };

  const displayMatrix = () => {
    if (method === 'random') {
      generateRandomMatrix();
    }
    const matrixElements = (
      <div>
        <h5>Matrix (M):</h5>
        <table className="matrix-table">
          <tbody>
            {matrix.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td>[</td>
                {row.map((value, colIndex) => (
                  <td key={colIndex}>{value}</td>
                ))}
                <td>]</td>
              </tr>
            ))}
          </tbody>
        </table>
        {algorithm === 'gauss-seidel' && (
          <>
            <h5>Vector (b):</h5>
            <table className="matrix-table">
              <tbody>
                <tr>
                  <td>[</td>
                  {vectorB.map((value, index) => (
                    <td key={index}>{value}</td>
                  ))}
                  <td>]</td>
                </tr>
              </tbody>
            </table>
          </>
        )}
      </div>
    );
    setMatrixDisplay(matrixElements);
  };

  const calculate = () => {
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
                  <option value="dense">dense</option>
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
                <Form.Control 
                  type="number" 
                  placeholder={`[${i}][${j}]`} 
                  
                  onChange={(e) => handleMatrixChange(i, j, e.target.value)}
                  className={
                    size >8 ? 'small-input' : 
                    size >= 6 && size <= 8 ? 'moyenne-input' : 
                    'normal-input'
                  }
                />
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
              <Form.Control 
                type="number" 
                placeholder={`b[${i}]`} 
                onChange={(e) => handleVectorChange(i, e.target.value)}
                className={
                  size > 8? 'small-input' : 
                  size >= 6 && size <= 8 ? 'moyenne-input' : 
                  'normal-input'
                }
                />
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
              <Form.Control type="file" onChange={handleFileUpload} />
            </Form.Group>
          </Card>
        )}

        {/* Boutons d'actions */}
        <div className="text-center mt-4">
          <Button className="btn-show-matrix mx-2" onClick={displayMatrix}>Show Matrix</Button>
          <Button className="btn-calculate mx-2" onClick={calculate}>Calculate</Button>
        </div>
         {/* Affichage de la matrice */}
         {matrixDisplay && (
          <Card className="p-3 mt-4 text-center" style={{ borderColor: '#FFD580' }}>
            {matrixDisplay}
          </Card>
        )}
      </Card>
    </Container>
  );
}

export default Seidel;




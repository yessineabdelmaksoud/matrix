// src/pages/SeidelRandom.js
import React from 'react';
import {  Form, Row, Col, Card } from 'react-bootstrap';
import './seidel.css';

function SeidelRandom({size,handleSizeChange,matrixType,handleMatrixTypeChange,algorithm,handleAlgorithmChange,setBandStrength_q,setBandStrength_p,bandStrength_p,bandStrength_q,min,max,handleMaxChange,handleMinChange,tolerance,handleToleranceChange,maxIterations,handleMaxIterationsChange}) {

  return (
    <div> 

  {/* Taille de la matrice et sélection de l'algorithme */}
  <Card className="p-3 mb-4" style={{ borderColor: '#FFD580'}}>
    <Form.Group as={Row} className="mb-3 justify-content-center" >
      <Form.Label column sm={3} className="text-center">Matrix Size (n)</Form.Label>
      <Col sm={6}>
        <Form.Control type="number" value={size} onChange={handleSizeChange} min="1" />
      </Col>
    </Form.Group>
    <Form.Group as={Row} className="mt-4 justify-content-center">
          <Form.Label column sm={3} className="text-center" >Select Algorithm</Form.Label>
          <Col sm={6}>
            <Form.Control as="select" value={algorithm} onChange={handleAlgorithmChange} >
              <option value="transpose">Transpose</option>
              <option value="determinant">Determinant</option>
              <option value="inverse">Inverse</option>
              <option value="positive-definite">verify Positive Definite</option>
              <option value="estDiagonaleDominante">verify Diagonale Dominante</option>
              <option value="resolutin-inf">resolution matrice tringulaire inferieur</option>
              <option value="resolutin-sup">resolution matrice tringulaire superieur</option>
              <option value="gauss-seidel">algorithm Gauss-Seidel</option>
            </Form.Control>
          </Col>
        </Form.Group>
    {(algorithm === 'transpose'|| algorithm === 'determinant' || algorithm === 'inverse' || algorithm==='positive-definite' || algorithm==='estDiagonaleDominante'||algorithm==='gauss-seidel' )   && (
        <Form.Group as={Row} className="mt-3 justify-content-center">
            <Form.Label column sm={3} className="text-center">Matrix Type</Form.Label>
            <Col sm={6}>
              <Form.Control as="select" value={matrixType} onChange={handleMatrixTypeChange} >
                <option value="dense">dense</option>
                <option value="band">Band Matrix</option>
                <option value="diagonally-dominant">Diagonally Dominant</option>
                <option value="symmetric">Symmetric</option>
                <option value="asymmetric">Asymmetric</option>
                <option value="positive-definite">Positive Definite</option>
              </Form.Control>
            </Col>
        </Form.Group>
      )}
      

  </Card>
  {matrixType === 'band' && (
    <Card className="p-3 mb-4" style={{ borderColor: '#FFD580' }}>
        <Form.Group as={Row} className="mt-3 justify-content-center">
            <Form.Label column sm={3} className="text-center">Band Strength (q)</Form.Label>
            <Col sm={6}>
                <Form.Control
                    type="number"
                    value={bandStrength_q || ''}
                    onChange={(e) => setBandStrength_q(Number(e.target.value))}
                />
            </Col>
        </Form.Group>
        <Form.Group as={Row} className="mt-3 justify-content-center">
            <Form.Label column sm={3} className="text-center">Band Strength (p)</Form.Label>
            <Col sm={6}>
                <Form.Control
                    type="number"
                    value={bandStrength_p || ''}
                    onChange={(e) => setBandStrength_p(Number(e.target.value))}
                />
            </Col>
        </Form.Group>
    </Card>
  )}

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
    <Card className="p-3 mb-4" style={{ borderColor: '#FFD580'  }}>
      <Form.Group as={Row} className="mt-4 justify-content-center">
              <Form.Label column sm={3} className="text-center">Tolerance (10^-q)</Form.Label>
              <Col sm={6}>
                <Form.Control type="number" value={Math.log10(tolerance) * -1} onChange={handleToleranceChange} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mt-4 justify-content-center">
              <Form.Label column sm={3} className="text-center">Max Iterations</Form.Label>
              <Col sm={6}>
                <Form.Control type="number" value={maxIterations} onChange={handleMaxIterationsChange} />
              </Col>
        </Form.Group>
    </Card>
    </div>
    );  
}
export default SeidelRandom;
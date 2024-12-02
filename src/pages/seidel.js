import React, { useState } from 'react';
import { Container, Form, Row, Col, Card } from 'react-bootstrap';
import './seidel.css';
import { generateMatrixByType } from '../Algorithms/typematrice';
import 'katex/dist/katex.min.css';
import SeidelRandom from './random.js';
import Seidelmanual from './manuelle.js';
import SeidelFile from './file.js';
import Buttons from './buttons.js';
import InputMatrice from './InputMatrice';
import AfficheMatrice from './AfficheMatrice';
import Calculate from './CalculateAffiche.js'; 
import downloadMatrix from './DownloadMatrixRandom.js';
import handleFileUpload from './upload.js'

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
  const [calculationDisplay, setCalculationDisplay] = useState(null);
  const [tolerance, setTolerance] = useState(1e-10);
  const [maxIterations, setMaxIterations] = useState(1000000);
  const [bandStrength_p, setBandStrength_p] = useState(0);
  const [bandStrength_q, setBandStrength_q] = useState(0);

  const handleMethodChange = (event) => {
    setMethod(event.target.value);
  };

  const handleAlgorithmChange = (event) => {
    setAlgorithm(event.target.value);
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

  const handleToleranceChange = (event) => {
    setTolerance(Math.pow(10, -parseInt(event.target.value, 10)));
  };

  const handleMaxIterationsChange = (event) => {
    setMaxIterations(parseInt(event.target.value, 10));
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

  const generateRandomMatrix = () => {
    const { matrix, vectorB } = generateMatrixByType(size, matrixType, min, max, algorithm);
    setMatrix(matrix);
    setVectorB(vectorB);
    setMatrixDisplay(<AfficheMatrice matrix={matrix} vectorB={vectorB} algorithm={algorithm} />);
};

const displayMatrix = () => {
    if (method !== 'random') {
        setMatrixDisplay(<AfficheMatrice matrix={matrix} vectorB={vectorB} algorithm={algorithm} />);
    } else {
        generateRandomMatrix();
    }
};
  
const onFileChange = (event) => {
  handleFileUpload(event, size, setMatrix, setVectorB, algorithm);
};
  
  const calculate = Calculate({ algorithm, matrix, vectorB, tolerance, maxIterations, setCalculationDisplay});
  const handleDownloadMatrix = () => {
    downloadMatrix(method, size, matrixType, 'gauss-seidel', setMatrix, setVectorB, min, max);
    console.log("Download Matrix clicked");
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
  </Card>
  {method === 'random' && (
        <SeidelRandom 
        size={size} 
        handleSizeChange={handleSizeChange} 
        matrixType={matrixType}
        handleMatrixTypeChange={handleMatrixTypeChange}
        algorithm={algorithm}
        handleAlgorithmChange={handleAlgorithmChange}
        setBandStrength_q={setBandStrength_q}
        setBandStrength_p={setBandStrength_p}
        bandStrength_p={bandStrength_p}
        bandStrength_q={bandStrength_p}
        min={min}
        max={max}
        handleMaxChange={handleMaxChange}
        handleMinChange={handleMinChange}
        tolerance={tolerance}
        handleToleranceChange={handleToleranceChange}
        maxIterations={maxIterations}
        handleMaxIterationsChange={handleMaxIterationsChange}
        />
      )}
    {method === 'manual' && (
        <Seidelmanual 
          size={size} 
          handleSizeChange={handleSizeChange} 
          matrixType={matrixType}
          handleMatrixTypeChange={handleMatrixTypeChange}
          algorithm={algorithm}
          handleAlgorithmChange={handleAlgorithmChange}
          setBandStrength_q={setBandStrength_q}
          setBandStrength_p={setBandStrength_p}
          bandStrength_p={bandStrength_p}
          bandStrength_q={bandStrength_q}
          tolerance={tolerance}
          handleToleranceChange={handleToleranceChange}
          maxIterations={maxIterations}
          handleMaxIterationsChange={handleMaxIterationsChange}
        />
      )}
      {method === 'file' && (
        <SeidelFile 
          size={size} 
          handleSizeChange={handleSizeChange} 
          matrixType={matrixType}
          handleMatrixTypeChange={handleMatrixTypeChange}
          algorithm={algorithm}
          handleAlgorithmChange={handleAlgorithmChange}
          setBandStrength_q={setBandStrength_q}
          setBandStrength_p={setBandStrength_p}
          bandStrength_p={bandStrength_p}
          bandStrength_q={bandStrength_q}
          min={min}
          max={max}
          handleMinChange={handleMinChange}
          handleMaxChange={handleMaxChange}
          tolerance={tolerance}
          handleToleranceChange={handleToleranceChange}
          maxIterations={maxIterations}
          handleMaxIterationsChange={handleMaxIterationsChange}
          handleFileUpload={onFileChange}
        />
      )}
      <InputMatrice 
                method={method} 
                size={size} 
                algorithm={algorithm} 
                handleMatrixChange={handleMatrixChange} 
                handleVectorChange={handleVectorChange} 
          />

      <Buttons 
                method={method} 
                size={size} 
                handleDownloadMatrix={handleDownloadMatrix} 
                displayMatrix={displayMatrix} 
                calculate={calculate} 
            />
      {/* Affichage de la matrice */}
      {matrixDisplay && (
        <Card className="p-3 mt-4 text-center" style={{ borderColor: '#FFD580' }}>
          {matrixDisplay}
        </Card>
      )}
      {calculationDisplay && (
              <Card className="p-3 mt-4" style={{ borderColor: '#FFD580' }}>
                  {calculationDisplay}
              </Card>
          )}
  </Card>
  </Container>
);
}
export default Seidel;

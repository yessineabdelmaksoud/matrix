import React from 'react';
import { Card, Form, Row, Col } from 'react-bootstrap';

function InputMatrice({ method, size, matrixType,matrix, algorithm, handleMatrixChange, handleVectorChange, bandStrength_p, bandStrength_q ,vectorB}) {
    

    return (
        <>
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
                                                // {...console.log(bandStrength_q)}
                                                value={matrixType === 'symmetric' && i < j && matrix[i][j] ? matrix[j][i] : algorithm ==='resolutin-inf' && i < j ? 0 : algorithm === 'resolutin-sup' && i > j ? 0 : matrixType === 'band' && (i-j > bandStrength_q || j - i > bandStrength_p) ? 0 : matrix[i][j]}
                                                onChange={(e) => {
                                                    handleMatrixChange(i, j, e.target.value);
                                                    if (matrixType === 'symmetric' && i !== j) {
                                                        handleMatrixChange(j, i, e.target.value); // Sync symmetric cell
                                                    }
                                                }}
                                                disabled={((matrixType === 'symmetric' || algorithm === 'resolutin-inf') && i < j) || (algorithm === 'resolutin-sup' && i > j ) || (matrixType === 'band' && ((i - j) > bandStrength_q || (j - i) > bandStrength_p))} // Disable lower triangle
                                                className={
                                                    size > 8 ? 'small-input' :
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

                        {algorithm !== 'transpose' && algorithm !== 'determinant' && algorithm != 'inverse' && (<Form.Group className="mb-3">
                            <h5 className="text-center">Enter Vector (b)</h5>
                            <Row className="justify-content-center">
                                {[...Array(size)].map((_, i) => (
                                    <Col sm="auto" key={i}>
                                        <Form.Control
                                            type="number"
                                            placeholder={`b[${i}]`}
                                            value = {vectorB[i]}
                                            onChange={(e) => handleVectorChange(i, e.target.value)}
                                            className={
                                                size > 8 ? 'small-input' :
                                                size >= 6 && size <= 8 ? 'moyenne-input' :
                                                'normal-input'
                                            }
                                        />
                                    </Col>
                                ))}
                            </Row>
                        </Form.Group>) }
                </Card>
            )}
        </>
    );
}

export default InputMatrice;

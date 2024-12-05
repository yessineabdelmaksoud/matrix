// src/pages/InputMatrice.js
import React from 'react';
import { Card, Form, Row, Col } from 'react-bootstrap';

function InputMatrice({ method, size, algorithm, handleMatrixChange, handleVectorChange }) {
    return (
        <>
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
                                                size > 8 ? 'small-input' :
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
        </>
    );
}

export default InputMatrice;
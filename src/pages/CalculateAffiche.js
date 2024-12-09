// src/pages/Calculate.js
import React from 'react';
import { BlockMath } from 'react-katex';
import Fraction from 'fraction.js';
import {
    transpose,
    determinant,
    inverseMatrix,
    estDefiniePositive,
    gaussSeidel,
    estDiagonaleDominante,
    solveLowerTriangularMatrix,
    solveUpperTriangularMatrix,
    gaussSeidelSymmetric,
    gaussSeidelBandMatrix,
    gaussSeidelPositiveDefiniteMatrix
} from '../Algorithms/Algorithm'; // Assurez-vous que le chemin est correct


const Calculate = ({ algorithm, matrix, vectorB, tolerance, maxIterations, setCalculationDisplay, renderMatrixDisplay, matrixType, bandStrength_p, bandStrength_q}) => {
    const calculate = () => {
        try {
            let result;

            switch (algorithm) {
                case 'transpose':
                    result = transpose(matrix);
                    setCalculationDisplay(renderMatrixDisplay(result, null));
                    break;
                case 'determinant':
                    result = determinant(matrix);
                    setCalculationDisplay(<h5>Determinant: {result}</h5>);
                    break;
                case 'inverse':
                    result = inverseMatrix(matrix);
                    setCalculationDisplay(renderMatrixDisplay(result, null));
                    break;
                case 'positive-definite':
                    result = estDefiniePositive(matrix);
                    setCalculationDisplay(
                        <h5>
                            {result ? "The matrix is positive definite." : "The matrix is not positive definite."}
                        </h5>
                    );
                    break;
                case 'estDiagonaleDominante':
                    result = estDiagonaleDominante(matrix);
                    setCalculationDisplay(
                        <h5>
                            {result ? "The matrix is Diagonale Dominant." : "The matrix is not Diagonale Dominant."}
                        </h5>
                    );
                    break;
                case 'gauss-seidel': {
                    const { x, iterations, complexity, converged } = matrixType ==='symmetric' ? gaussSeidelSymmetric(matrix, vectorB, tolerance, maxIterations) : matrixType === 'band' ? gaussSeidelBandMatrix(matrix, vectorB, bandStrength_p, bandStrength_q, tolerance, maxIterations) : matrixType ==='positive-definite' ? gaussSeidelPositiveDefiniteMatrix(matrix, vectorB, tolerance, maxIterations) : gaussSeidel(matrix, vectorB, tolerance, maxIterations);

                    // Fonction pour arrondir à 4 décimales
                    const roundTo4Decimals = (value) => Math.round(value * 10000) / 10000;

                    // Préparation des itérations arrondies
                    const roundedIterations = iterations.map((iteration) =>
                        iteration.map(roundTo4Decimals)
                    );

                    // Fonction pour regrouper par 3
                    const groupByThree = (array) => {
                        const groups = [];
                        for (let i = 0; i < array.length; i += 3) {
                            groups.push(array.slice(i, i + 3));
                        }
                        return groups;
                    };

                    // Grouper les itérations par 3
                    const groupedIterations = groupByThree(roundedIterations);

                    const xFractions = x.map((value) => new Fraction(Number(value)).toFraction());
                    
                    const xRounded = x.map(roundTo4Decimals);

                    // Afficher le résultat
                    setCalculationDisplay(
                        <div>
                            {groupedIterations.map((group, groupIndex) => (
                                <div key={groupIndex} style={{ display: "flex", justifyContent: "space-between" }}>
                                    {group.map((iteration, index) => (
                                        <BlockMath
                                            key={index}
                                            math={`\\text{Iteration ${groupIndex * 3 + index + 1}: } x = \\begin{bmatrix} ${iteration.join(" \\\\ ")} \\end{bmatrix}`}
                                        />
                                    ))}
                                </div>
                            ))}
                            {/* Affichage des solutions finales */}
                            <BlockMath math={`\\text{Solution finale (x): } \\begin{bmatrix} ${x.join(" \\\\ ")} \\end{bmatrix}`} />
                            <BlockMath math={`\\text{Solution finale en fraction (x): } \\begin{bmatrix} ${xFractions.join(" \\\\ ")} \\end{bmatrix}`} />
                            <BlockMath math={`\\text{Solution arrondie finale (x): } \\begin{bmatrix} ${xRounded.join(" \\\\ ")} \\end{bmatrix}`} />
                            <div style={{ textAlign: "center", marginTop: "20px" }}>
                                <p style={{
                                    fontSize: "24px",
                                    fontWeight: "bold",
                                    color: "#2c3e50",
                                    textShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)",
                                    margin: "10px 0"
                                }}>
                                    Iterations: <span>{iterations.length}</span>
                                </p>
                                <p style={{
                                    fontSize: "24px",
                                    fontWeight: "bold",
                                    color: "#e74c3c",
                                    textShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)",
                                    margin: "10px 0"
                                }}>
                                    Complexity: <span>{complexity}</span>
                                </p>
                                <p style={{
                                    fontSize: "24px",
                                    fontWeight: "bold",
                                    color: "#27ae60",
                                    textShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)",
                                    margin: "10px 0"
                                }}>
                                    Converged: <span style={{ color: converged ? "#2ecc71" : "#e74c3c" }}>
                                        {converged ? "Yes" : "No"}
                                    </span>
                                </p>
                            </div>
                        </div>
                    );
                    break;
                }
                case 'resolutin-inf' : {
                    const {x} = solveLowerTriangularMatrix(matrix, vectorB);
                    setCalculationDisplay(
                        <div>
                            <BlockMath math={`\\text{Solution finale (x): } \\begin{bmatrix} ${x.join(" \\\\ ")} \\end{bmatrix}`} />
                        </div>
                    );
                    break;
                }
                case 'resolutin-sup':{
                    const {x} = solveUpperTriangularMatrix(matrix, vectorB);
                    setCalculationDisplay(
                        <div>
                            <BlockMath math={`\\text{Solution finale (x): } \\begin{bmatrix} ${x.join(" \\\\ ")} \\end{bmatrix}`} />
                        </div>
                    );
                    break;
                }
                default:
                    setCalculationDisplay(<h5>Please select a valid algorithm.</h5>);
            }
        } catch (error) {
            setCalculationDisplay(<h5>Error: {error.message}</h5>);
        }
    };

    return calculate; // Retourne la fonction calculate
};

export default Calculate;
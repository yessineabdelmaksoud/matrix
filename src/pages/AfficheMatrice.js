// src/pages/AfficheMatrice.js
import React from 'react';
import { BlockMath } from 'react-katex';

const AfficheMatrice = ({ matrix, vectorB, algorithm }) => {
    // Fonction pour rendre l'affichage de la matrice et du vecteur
    const renderMatrixDisplay = (matrix, vectorB) => (
        <div id="matrix-display">
            <h5>Matrix (M):</h5>
            <BlockMath>
                {`\\begin{bmatrix}
                    ${matrix.map(row => row.join(' & ')).join(' \\\\ ')}
                \\end{bmatrix}`}
            </BlockMath>
                {algorithm !=='transpose' && algorithm !== 'determinant' && algorithm != 'inverse' && (<>
                    <h5>Vector (b):</h5>
                    <BlockMath>
                        {`\\begin{bmatrix}
                            ${vectorB.join(' \\\\ ')}
                        \\end{bmatrix}`}
                    </BlockMath>
                </>)}
        </div>
    );

    return (
        <div>
            {renderMatrixDisplay(matrix, vectorB)}
        </div>
    );
};

export default AfficheMatrice;
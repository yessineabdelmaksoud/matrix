// src/pages/MatrixControls.js
/* eslint-disable no-unused-vars */
import React from 'react';
import { Button } from 'react-bootstrap';

function buttons({ method, size, handleDownloadMatrix, displayMatrix, calculate }) {
    const handleCalculateClick = () => {
        calculate();
        window.scrollTo({ top: document.body.scrollHeight / 2, behavior: 'smooth' });
    };

    const handleShowMatrixClick = () => {
        displayMatrix();
        setTimeout(() => {
            const element = document.querySelector('matrix-display');
            if (element) {
                const elementTop = element.offsetTop;
                const elementHeight = element.offsetHeight;
                const scrollToPosition = Math.min(elementTop, elementTop + elementHeight - 60);
                window.scrollTo({
                    top: scrollToPosition,
                    behavior: 'smooth'
                });
            }
        }, 100);
    };

    return (
        <div className="text-center mt-4">
            {method === 'random' && size > 30 ? (
                <Button className="btn-download mx-2" onClick={handleDownloadMatrix}>
                    Download Matrix
                </Button>
            ) : (
                <Button className="btn-show-matrix mx-2" onClick={handleShowMatrixClick}>
                    Show Matrix
                </Button>
            )}
        </div>
    );
}

export default buttons;
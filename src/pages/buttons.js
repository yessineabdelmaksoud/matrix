// src/pages/MatrixControls.js
import React from 'react';
import { Button } from 'react-bootstrap';

function buttons({ method, size, handleDownloadMatrix, displayMatrix, calculate }) {
    const handleCalculateClick = () => {
        calculate();
        window.scrollTo({ top: document.body.scrollHeight / 2, behavior: 'smooth' });
    };

    return (
        <div className="text-center mt-4">
            {method === 'random' && size > 30 ? (
                <Button className="btn-download mx-2" onClick={handleDownloadMatrix}>
                    Download Matrix
                </Button>
            ) : (
                <Button className="btn-show-matrix mx-2" onClick={displayMatrix}>
                    Show Matrix
                </Button>
            )}
            <Button className="btn-calculate mx-2" onClick={handleCalculateClick}>Calculate</Button>
        </div>
    );
}

export default buttons;
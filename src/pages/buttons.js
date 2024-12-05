/* eslint-disable no-unused-vars */
import React from 'react';
import { Button } from 'react-bootstrap';

function Buttons({ method, size, handleDownloadMatrix, displayMatrix, calculate }) {
    // Define the handleScroll function to scroll by a specific number of pixels
    const handleScroll = (pixels) => {
        window.scrollTo({
            top: pixels,
            behavior: 'smooth',
        });
    };

    // Function for Calculate button click
    const handleCalculateClick = () => {
        calculate(); // Execute the passed calculate function
        window.scrollTo({ top: document.body.scrollHeight / 2, behavior: 'smooth' });
    };

    // Function for Show Matrix button click
    const handleShowMatrixClick = () => {
        displayMatrix(); // Execute the passed displayMatrix function
    };

    return (
        <div className="text-center mt-4">
            {method === 'random' && size > 30 ? (
                <Button className="btn-download mx-2" onClick={handleDownloadMatrix}>
                    Download Matrix
                </Button>
            ) : (
                <Button className="btn-show-matrix mx-2"  onClick={() => {
                    handleShowMatrixClick(); // Perform the calculation
                    handleScroll(500); // Scroll the page by 500px
                }}>
                    Show Matrix
                </Button>
            )}
            <Button
                className="btn-calculate mx-2"
                onClick={() => {
                    handleCalculateClick(); // Perform the calculation
                    handleScroll(500); // Scroll the page by 500px
                }}
            >
                Calculate
            </Button>
        </div>
    );
}

export default Buttons;

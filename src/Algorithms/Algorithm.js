 function gaussSeidel(A, b, x = [], tolerance = 1e-10, maxIterations = 100) {
    const n = A.length;
    if (x.length === 0) x = new Array(n).fill(0);
    for (let k = 0; k < maxIterations; k++) {
        let maxDifference = 0;
        for (let i = 0; i < n; i++) {
            let sum = b[i];  
            for (let j = 0; j < n; j++) {
                if (j !== i) {
                    sum -= A[i][j] * x[j];
                }
            }
            const newX = sum / A[i][i];
            maxDifference = Math.max(maxDifference, Math.abs(newX - x[i]));
            x[i] = newX;
        }
        if (maxDifference < tolerance) {
            return x;
        }
    }
    console.log("Did not converge within the maximum number of iterations.");
    return null;
}

function generateLowerTriangularMatrix(n) {
    const matrix = Array.from({ length: n }, () => Array(n).fill(0));

    for (let i = 0; i < n; i++) {
        for (let j = 0; j <= i; j++) {
            matrix[i][j] = Math.floor(Math.random() * 100);
        }
    }

    return matrix;
}

 function generateUpperTriangularMatrix(n) {
    const matrix = Array.from({ length: n }, () => Array(n).fill(0));

    for (let i = 0; i < n; i++) {
        for (let j = i; j < n; j++) {
            matrix[i][j] = Math.floor(Math.random() * 100);
        }
    }

    return matrix;
}

function generateLowerHalfBandMatrix(n, b) {
    const matrix = Array.from({ length: n }, () => Array(n).fill(0));

    for (let i = 0; i < n; i++) {
        for (let j = Math.max(0, i - b); j <= i; j++) {
            matrix[i][j] = Math.floor(Math.random() * 100); // Random number between 0 and 9
        }
    }

    return matrix;
}

function generateUpperHalfBandMatrix(n, b) {
    const matrix = Array.from({ length: n }, () => Array(n).fill(0));

    for (let i = 0; i < n; i++) {
        for (let j = i ; j < Math.min(i + b + 1, n); j++) {
            matrix[i][j] = Math.floor(Math.random() * 100); // Random number between 0 and 9
        }
    }

    return matrix;
}
function generateBandMatrix(n, b) {
    const matrix = Array.from({ length: n }, () => Array(n).fill(0));

    for (let i = 0; i < n; i++) {
        for (let j = Math.max(0, i - b) ; j < Math.min(i + b + 1, n); j++) {
            matrix[i][j] = Math.floor(Math.random() * 100); // Random number between 0 and 9
        }
    }

    return matrix;
}
console.log(generateBandMatrix(3, 1));
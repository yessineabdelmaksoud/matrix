export function randomValue(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  // Generate a Symmetric Matrix
export function generateSymmetricMatrix(n, min, max) {
    const matrix = Array.from({ length: n }, () => Array(n).fill(0));
  
    for (let i = 0; i < n; i++) {
        for (let j = i; j < n; j++) {
            const value = randomValue(min, max);
            matrix[i][j] = value;
            matrix[j][i] = value; // Ensure symmetry
        }
    }
  
    return matrix;
  }
  //aaaaa
  // Generate a Diagonally Dominant Matrix
export function generateDiagonallyDominantMatrix(n, min, max) {
    const matrix = Array.from({ length: n }, () => Array(n).fill(0));
  
    for (let i = 0; i < n; i++) {
        let rowSum = 0;
  
        // Generate non-diagonal elements
        for (let j = 0; j < n; j++) {
            if (i !== j) {
                const value = randomValue(min, max);
                matrix[i][j] = value;
                rowSum += Math.abs(value);
            }
        }
  
        // Set the diagonal element to ensure diagonal dominance and keep it in range
        matrix[i][i] = Math.max(rowSum + 1, randomValue(min, max));
    }
  
    return matrix;
  }
  
export function generatePositiveDefiniteMatrix(n, min, max) {
    // Ensure min and max are valid
    if (min > max) throw new Error("Min cannot be greater than max");
  
    // Start with a symmetric matrix
    const matrix = Array.from({ length: n }, () => Array(n).fill(0));
    for (let i = 0; i < n; i++) {
        for (let j = i; j < n; j++) {
            const value = randomValue(min, max);
            matrix[i][j] = value;
            matrix[j][i] = value; // Ensure symmetry
        }
    }
  
    // Make it diagonally dominant to ensure positive definiteness
    for (let i = 0; i < n; i++) {
        const rowSum = matrix[i].reduce((sum, val, j) => (i !== j ? sum + Math.abs(val) : sum), 0);
        matrix[i][i] = Math.max(rowSum + 1, randomValue(min, max));
    }
  
    return matrix;
  }
  
export function generateRandomHollowMatrix(n, min, max) {
    const numNonZero = randomValue(0, (n*n)/2);
    // Create an n x n matrix filled with zeros
    let matrix = Array.from({ length: n }, () => Array(n).fill(0));
  
    // Ensure that numNonZero is not greater than the total number of cells
    if (numNonZero > n * n) {
        console.error("numNonZero must be less than or equal to n * n");
        return;
    }
  
    // Create a set to keep track of random positions already used
    let usedPositions = new Set();
  
    // Randomly place non-zero values in the matrix
    for (let i = 0; i < numNonZero; i++) {
        let randomRow, randomCol;
        do {
            randomRow = Math.floor(Math.random() * n);
            randomCol = Math.floor(Math.random() * n);
        } while (usedPositions.has(`${randomRow},${randomCol}`));
  
        matrix[randomRow][randomCol] = randomValue(min, max);
        usedPositions.add(`${randomRow},${randomCol}`);
    }
  
    return matrix;
  }
export function generateLowerTriangularDiagonalDominantMatrix(n, min, max) {
    // Initialize the matrix as a lower triangular matrix with random values
    let matrix = Array.from({ length: n }, () => Array(n).fill(0));
  
    for (let i = 0; i < n; i++) {
        let rowSum = 0;
        
        // Fill the lower triangular part of the matrix (including the diagonal)
        for (let j = 0; j <= i; j++) {
            // Random value for the matrix element
            matrix[i][j] = Math.floor(randomValue(min, max));  // Random values between 0 and 9
            rowSum += Math.abs(matrix[i][j]);
        }
  
        // Ensure diagonal dominance: make the diagonal element greater than the sum of others
        matrix[i][i] = rowSum + Math.floor(randomValue(min, max)) + 1;  // Make it strictly greater
    }
  
    return matrix;
  }
  
export function generateUpperTriangularDiagonalDominantMatrix(n,min, max) {
    // Initialize the matrix as an upper triangular matrix with random values
    let matrix = Array.from({ length: n }, () => Array(n).fill(0));
  
    for (let i = 0; i < n; i++) {
        let rowSum = 0;
        
        // Fill the upper triangular part of the matrix (including the diagonal)
        for (let j = i; j < n; j++) {
            // Random value for the matrix element
            matrix[i][j] = Math.floor(randomValue(min, max));  // Random values between 0 and 9
            rowSum += Math.abs(matrix[i][j]);
        }
  
        // Ensure diagonal dominance: make the diagonal element greater than the sum of others
        matrix[i][i] = rowSum + Math.floor(randomValue(min, max)) + 1;  // Make it strictly greater
    }
  
    return matrix;
  }
  
export function generateLowerHalfBandDiagonalDominantMatrix(n, bandwidth, min, max) {
    // Initialize the matrix with zeros
    let matrix = Array.from({ length: n }, () => Array(n).fill(0));
  
    for (let i = 0; i < n; i++) {
        let rowSum = 0;
  
        // Fill the lower half band of the matrix
        for (let j = Math.max(0, i - bandwidth + 1); j <= i; j++) {
            // Random value for the matrix element in the band
            matrix[i][j] = Math.floor(randomValue(min, max));  // Random values between 0 and 9
            rowSum += Math.abs(matrix[i][j]);
        }
  
        // Ensure diagonal dominance: make the diagonal element greater than the sum of the left elements
        matrix[i][i] = rowSum + Math.floor(randomValue(min, max)) + 1;  // Make it strictly greater
    }
  
    return matrix;
  }
  
export function generateUpperHalfBandDiagonalDominantMatrix(n, bandwidth, min, max) {
    // Initialize the matrix with zeros
    let matrix = Array.from({ length: n }, () => Array(n).fill(0));
  
    for (let i = 0; i < n; i++) {
        let rowSum = 0;
  
        // Fill the upper half band of the matrix
        for (let j = i; j < Math.min(n, i + bandwidth); j++) {
            // Random value for the matrix element in the band
            matrix[i][j] = Math.floor(randomValue(min, max));  // Random values between 0 and 9
            rowSum += Math.abs(matrix[i][j]);
        }
  
        // Ensure diagonal dominance: make the diagonal element greater than the sum of the right elements
        matrix[i][i] = rowSum + Math.floor(randomValue(min, max)) + 1;  // Make it strictly greater
    }
  
    return matrix;
  }
  
export function generateBandDiagonalDominantMatrix(n, bandwidth, min, max) {
    // Initialize the matrix with zeros
    let matrix = Array.from({ length: n }, () => Array(n).fill(0));
  
    for (let i = 0; i < n; i++) {
        let rowSum = 0;
  
        // Fill the band of the matrix (both above and below the diagonal)
        for (let j = Math.max(0, i - bandwidth + 1); j <= Math.min(n - 1, i + bandwidth - 1); j++) {
            // Random value for the matrix element within the band
            matrix[i][j] = Math.floor(randomValue(min, max));  // Random values between 0 and 9
            rowSum += Math.abs(matrix[i][j]);
        }
  
        // Ensure diagonal dominance: make the diagonal element greater than the sum of the band elements
        matrix[i][i] = rowSum + Math.floor(randomValue(min, max)) + 1;  // Make it strictly greater
    }
  
    return matrix;
  }
  
function generateBandSymmetricMatrix(n, bandWidth) {
    // Initialize an n x n matrix with zeros
    const matrix = Array.from({ length: n }, () => Array(n).fill(0));
  
    for (let i = 0; i < n; i++) {
        for (let j = Math.max(0, i - bandWidth); j <= Math.min(n - 1, i + bandWidth); j++) {
            const value = Math.floor(Math.random() * 10) + 1; // Random value between 1 and 10
            matrix[i][j] = value;
            matrix[j][i] = value; // Ensure symmetry
        }
    }
  
    return matrix;
  }
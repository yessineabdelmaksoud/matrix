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

function generateSymmetricMatrix(n) {
  // Initialize an n x n matrix with zeros
  const matrix = Array.from({ length: n }, () => Array(n).fill(0));

  // Fill the upper triangle and diagonal
  for (let i = 0; i < n; i++) {
      for (let j = i; j < n; j++) {
          const value = Math.floor(Math.random() * 10) + 1; // Random value between 1 and 10
          matrix[i][j] = value;
          matrix[j][i] = value; // Ensure symmetry
      }
  }

  return matrix;
}

// Example Usage
const n = 4; // Size of the matrix
const symmetricMatrix = generateSymmetricMatrix(n);

// Display the matrix
console.log(symmetricMatrix);
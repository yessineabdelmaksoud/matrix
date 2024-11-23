function randomValue(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate a Symmetric Matrix
function generateSymmetricMatrix(n, min, max) {
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
function generateDiagonallyDominantMatrix(n, min, max) {
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

function generatePositiveDefiniteMatrix(n, min, max) {
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


// Example Usage
const n = 4; // Size of the matrix
const min = 1; // Minimum value
const max = 10; // Maximum value

console.table(generateDiagonallyDominantMatrix(n, min, max));

console.log("Positive Definite Matrix:");
console.table(generatePositiveDefiniteMatrix(n, min, max));
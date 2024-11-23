// Algorithm.js

export const transpose = (matrix) => {
  return matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex]));
};

export const estDiagonaleDominante = (A) => {
  const n = A.length;
  for (let i = 0; i < n; i++) {
      let somme = 0;
      for (let j = 0; j < n; j++) {
          if (j !== i) {
              somme += Math.abs(A[i][j]);
          }
      }
      if (Math.abs(A[i][i]) <= somme) {
          return false;
      }
  }
  return true;
};

export const estDefiniePositive = (A) => {
  const n = A.length;

  // Vérifier si la matrice est symétrique
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (A[i][j] !== A[j][i]) {
        return false;
      }
    }
  }
    // Vérifier les déterminants des sous-matrices principales
    for (let i = 0; i < n; i++) {
      let subMatrix = A.slice(0, i + 1).map(row => row.slice(0, i + 1));
      if (determinant(subMatrix) <= 0) {
        return false;
      }
    }
    return true;
  };

export const determinant = (matrix) => {
  const n = matrix.length;
  if (n === 1) return matrix[0][0];
  if (n === 2) return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];

  let det = 0;
  for (let j = 0; j < n; j++) {
      det += Math.pow(-1, j) * matrix[0][j] * determinant(minor(matrix, 0, j));
  }
  return det;
};

export const minor = (matrix, row, col) => {
  return matrix.filter((_, i) => i !== row).map(row => row.filter((_, j) => j !== col));
};

export const matriceIteration = (A) => {
  const n = A.length;
  const D = Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => (i === j ? A[i][j] : 0)));
  const L = Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => (i > j ? A[i][j] : 0)));
  const U = Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => (i < j ? A[i][j] : 0)));

  const DL = addMatrices(D, L);
  const DL_inv = inverseMatrix(DL);
  const T = multiplyMatrices(DL_inv, U);

  return T;
};

export const addMatrices = (A, B) => {
  const n = A.length;
  return A.map((row, i) => row.map((val, j) => val + B[i][j]));
};

export const multiplyMatrices = (A, B) => {
  const n = A.length;
  const m = B[0].length;
  const result = Array.from({ length: n }, () => Array(m).fill(0));

  for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
          for (let k = 0; k < n; k++) {
              result[i][j] += A[i][k] * B[k][j];
          }
      }
  }

  return result;
};

export const inverseMatrix = (A) => {
  const n = A.length;
  const augmentedMatrix = A.map((row, i) => [...row, ...Array(n).fill(0).map((_, j) => (i === j ? 1 : 0))]);

  for (let i = 0; i < n; i++) {
      let maxEl = Math.abs(augmentedMatrix[i][i]);
      let maxRow = i;
      for (let k = i + 1; k < n; k++) {
          if (Math.abs(augmentedMatrix[k][i]) > maxEl) {
              maxEl = Math.abs(augmentedMatrix[k][i]);
              maxRow = k;
          }
      }

      for (let k = i; k < 2 * n; k++) {
          const tmp = augmentedMatrix[maxRow][k];
          augmentedMatrix[maxRow][k] = augmentedMatrix[i][k];
          augmentedMatrix[i][k] = tmp;
      }

      const pivot = augmentedMatrix[i][i];
      for (let k = i; k < 2 * n; k++) {
          augmentedMatrix[i][k] /= pivot;
      }

      for (let j = 0; j < n; j++) {
          if (j !== i) {
              const factor = augmentedMatrix[j][i];
              for (let k = i; k < 2 * n; k++) {
                  augmentedMatrix[j][k] -= factor * augmentedMatrix[i][k];
              }
          }
      }
  }

  return augmentedMatrix.map(row => row.slice(n));
};

export const valeursPropres = (A) => {
  const n = A.length;
  const eigenvalues = [];

  for (let i = 0; i < n; i++) {
      const lambda = A[i][i];
      eigenvalues.push(lambda);
  }

  return eigenvalues;
};

export const estRayonSpectralInferieurAUn = (A) => {
  const T = matriceIteration(A);
  const eigenvalues = valeursPropres(T);
  const spectralRadius = Math.max(...eigenvalues.map(Math.abs));
  return spectralRadius < 1;
};

export const gaussSeidel = (A, b, tolerance, maxIterations ) => {
  const n = A.length;

  // Vérification des conditions de convergence

  if (!estRayonSpectralInferieurAUn(A)) {
    throw new Error("Le rayon spectral de la matrice d'itération est supérieur à 1. La méthode de Gauss-Seidel pourrait ne pas converger.");
  }

  let x = Array(n).fill(0); // Initialisation du vecteur solution avec des zéros.
  let totalOperations = 0; // Compteur pour les opérations arithmétiques.
  let iterations = []; // Tableau pour stocker les valeurs de x à chaque itération.

  for (let k = 0; k < maxIterations; k++) {
      let maxDifference = 0; // Différence maximale pour vérifier la convergence.

      for (let i = 0; i < n; i++) {
          let sum = b[i]; // Commencer avec le terme indépendant b[i].

          for (let j = 0; j < n; j++) {
              if (j !== i) { // Ajouter les contributions des autres termes sauf x[i].
                  sum -= A[i][j] * x[j];
                  totalOperations++; // Incrémenter le compteur d'opérations.
              }
          }

          const newX = sum / A[i][i]; // Calculer la nouvelle valeur pour x[i].
          maxDifference = Math.max(maxDifference, Math.abs(newX - x[i])); // Mettre à jour la différence maximale.
          x[i] = newX; // Mettre à jour x[i].
          totalOperations++; // Incrémenter le compteur d'opérations.
      }

      iterations.push([...x]); // Stocker la copie actuelle de x.

      if (maxDifference < tolerance) { // Si la convergence est atteinte, retourner la solution.
          return { x, iterations, converged: true, complexity: totalOperations*2 };
      }
  }

  throw new Error("La méthode de Gauss-Seidel n'a pas convergé dans le nombre maximal d'itérations.");
};

export function gaussSeidelLowerTriangular(A, b, tolerance = 1e-10, maxIterations = 1000) {
  const n = A.length; // Number of rows
  let x = new Array(n).fill(0); // Initialize x with zeros
  let xOld = new Array(n);
  let iterations = 0;

  while (iterations < maxIterations) {
      xOld = [...x]; // Save the current values of x
      for (let i = 0; i < n; i++) {
          let sum = 0;
          for (let j = 0; j < i; j++) {
              sum += A[i][j] * x[j]; // Only sum for the lower triangular part
          }
          x[i] = (b[i] - sum) / A[i][i]; // Update x[i]
      }

      // Check for convergence
      let maxDiff = 0;
      for (let i = 0; i < n; i++) {
          maxDiff = Math.max(maxDiff, Math.abs(x[i] - xOld[i]));
      }
      if (maxDiff < tolerance) {
          return { solution: x, iterations };
      }
      iterations++;
  }

  throw new Error("Gauss-Seidel did not converge within the maximum number of iterations");
}

export function gaussSeidelUpperTriangular(A, b, tolerance = 1e-10, maxIterations = 1000) {
  const n = A.length; // Number of rows
  let x = new Array(n).fill(0); // Initialize x with zeros
  let xOld = new Array(n);
  let iterations = 0;

  while (iterations < maxIterations) {
      xOld = [...x]; // Save the current values of x
      for (let i = n - 1; i >= 0; i--) { // Iterate in reverse order for upper triangular
          let sum = 0;
          for (let j = i + 1; j < n; j++) {
              sum += A[i][j] * x[j]; // Only sum for the upper triangular part
          }
          x[i] = (b[i] - sum) / A[i][i]; // Update x[i]
      }

      // Check for convergence
      let maxDiff = 0;
      for (let i = 0; i < n; i++) {
          maxDiff = Math.max(maxDiff, Math.abs(x[i] - xOld[i]));
      }
      if (maxDiff < tolerance) {
          return { solution: x, iterations };
      }
      iterations++;
  }

  throw new Error("Gauss-Seidel did not converge within the maximum number of iterations");
}

export function gaussSeidelSymmetric(A, b, tolerance = 1e-10, maxIterations = 1000) {
  const n = A.length; // Number of rows
  let x = new Array(n).fill(0); // Initialize x with zeros
  let xOld = new Array(n);
  let iterations = 0;

  while (iterations < maxIterations) {
      xOld = [...x]; // Save the current values of x
      for (let i = 0; i < n; i++) {
          let sum = 0;
          // Sum the contributions from both the lower and upper parts of the symmetric matrix
          for (let j = 0; j < i; j++) {
              sum += A[i][j] * x[j]; // Lower triangular part (already updated in previous iterations)
          }
          for (let j = i + 1; j < n; j++) {
              sum += A[j][i] * x[j]; // Upper triangular part (updated in the current iteration)
          }
          x[i] = (b[i] - sum) / A[i][i]; // Update x[i]
      }

      // Check for convergence
      let maxDiff = 0;
      for (let i = 0; i < n; i++) {
          maxDiff = Math.max(maxDiff, Math.abs(x[i] - xOld[i]));
      }
      if (maxDiff < tolerance) {
          return { solution: x, iterations };
      }
      iterations++;
  }

  throw new Error("Gauss-Seidel did not converge within the maximum number of iterations");
}

export function gaussSeidelBandMatrix(A, b, bandwidth, tolerance = 1e-10, maxIterations = 1000) {
  const n = A.length; // Number of rows
  let x = new Array(n).fill(0); // Initialize x with zeros
  let xOld = new Array(n);
  let iterations = 0;

  // Loop until convergence or max iterations
  while (iterations < maxIterations) {
      xOld = [...x]; // Save the current values of x
      for (let i = 0; i < n; i++) {
          let sum = 0;
          
          // Only sum the elements within the bandwidth for the current row
          for (let j = Math.max(0, i - bandwidth); j < i; j++) {
              sum += A[i][j] * x[j]; // Lower part within the band
          }
          for (let j = i + 1; j <= Math.min(n - 1, i + bandwidth); j++) {
              sum += A[i][j] * x[j]; // Upper part within the band
          }
          
          // Update the value of x[i]
          x[i] = (b[i] - sum) / A[i][i];
      }

      // Check for convergence (using maximum difference between the current and previous iteration)
      let maxDiff = 0;
      for (let i = 0; i < n; i++) {
          maxDiff = Math.max(maxDiff, Math.abs(x[i] - xOld[i]));
      }
      if (maxDiff < tolerance) {
          return { solution: x, iterations };
      }
      iterations++;
  }

  throw new Error("Gauss-Seidel did not converge within the maximum number of iterations");
}

export function gaussSeidelUpperHalfBand(A, b, bandwidth, tolerance = 1e-10, maxIterations = 1000) {
  const n = A.length; // Number of rows
  let x = new Array(n).fill(0); // Initialize x with zeros
  let xOld = new Array(n);
  let iterations = 0;

  // Loop until convergence or max iterations
  while (iterations < maxIterations) {
      xOld = [...x]; // Save the current values of x
      for (let i = 0; i < n; i++) {
          let sum = 0;
          
          // Only sum the elements in the upper half (from the current row to the right)
          for (let j = i + 1; j <= Math.min(i + bandwidth, n - 1); j++) {
              sum += A[i][j] * x[j]; // Upper part within the band
          }

          // Update the value of x[i] using the sum and the diagonal element A[i][i]
          x[i] = (b[i] - sum) / A[i][i];
      }

      // Check for convergence (using maximum difference between the current and previous iteration)
      let maxDiff = 0;
      for (let i = 0; i < n; i++) {
          maxDiff = Math.max(maxDiff, Math.abs(x[i] - xOld[i]));
      }
      if (maxDiff < tolerance) {
          return { solution: x, iterations };
      }
      iterations++;
  }

  throw new Error("Gauss-Seidel did not converge within the maximum number of iterations");
}

export function gaussSeidelLowerHalfBand(A, b, bandwidth, tolerance = 1e-10, maxIterations = 1000) {
  const n = A.length; // Number of rows
  let x = new Array(n).fill(0); // Initialize x with zeros
  let xOld = new Array(n);
  let iterations = 0;

  // Loop until convergence or max iterations
  while (iterations < maxIterations) {
      xOld = [...x]; // Save the current values of x
      for (let i = 0; i < n; i++) {
          let sum = 0;
          
          // Only sum the elements in the lower half (from the current row to the left)
          for (let j = Math.max(0, i - bandwidth); j < i; j++) {
              sum += A[i][j] * x[j]; // Lower part within the band
          }

          // Update the value of x[i] using the sum and the diagonal element A[i][i]
          x[i] = (b[i] - sum) / A[i][i];
      }

      // Check for convergence (using maximum difference between the current and previous iteration)
      let maxDiff = 0;
      for (let i = 0; i < n; i++) {
          maxDiff = Math.max(maxDiff, Math.abs(x[i] - xOld[i]));
      }
      if (maxDiff < tolerance) {
          return { solution: x, iterations };
      }
      iterations++;
  }

  throw new Error("Gauss-Seidel did not converge within the maximum number of iterations");
}

export function randomValue(min, max) {
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
export function generateLowerTriangularDiagonalDominantMatrix(n) {
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
  
export function generateUpperTriangularDiagonalDominantMatrix(n) {
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
  
export function generateLowerHalfBandDiagonalDominantMatrix(n, bandwidth) {
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
  
  
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
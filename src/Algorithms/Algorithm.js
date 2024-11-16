 /*function gaussSeidel(A, b, x = [], tolerance = 1e-10, maxIterations = 100) {
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
}*/

// src/Algorithms/Algorithm.js
export const transpose = (matrix) => {
    return matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex]));
  };
  
  export const determinant = (matrix) => {
    const n = matrix.length;
    if (n === 1) return matrix[0][0];
    if (n === 2) return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
  
    let det = 0;
    for (let i = 0; i < n; i++) {
      const subMatrix = matrix.slice(1).map(row => row.filter((_, j) => j !== i));
      det += (i % 2 === 0 ? 1 : -1) * matrix[0][i] * determinant(subMatrix);
    }
    return det;
  };
  
  export const inverse = (matrix) => {
    const det = determinant(matrix);
    if (det === 0) throw new Error("Matrix is singular and cannot be inverted.");
  
    const n = matrix.length;
    const adjugate = Array.from({ length: n }, (_, i) =>
      Array.from({ length: n }, (_, j) => {
        const subMatrix = matrix
          .filter((_, rowIndex) => rowIndex !== i)
          .map(row => row.filter((_, colIndex) => colIndex !== j));
        return ((i + j) % 2 === 0 ? 1 : -1) * determinant(subMatrix);
      })
    );
    return transpose(adjugate).map(row => row.map(value => value / det));
  };
  
  export const isPositiveDefinite = (matrix) => {
    const n = matrix.length;
    for (let i = 1; i <= n; i++) {
      const subMatrix = matrix.slice(0, i).map(row => row.slice(0, i));
      if (determinant(subMatrix) <= 0) return false;
    }
    return true;
  };
  
  export const gaussSeidel = (A, b, tolerance = 1e-5, maxIterations = 100) => {
    const n = A.length;
    let x = Array(n).fill(0); // Initialisation du vecteur solution avec des zéros.
  
    for (let k = 0; k < maxIterations; k++) {
        let maxDifference = 0; // Différence maximale pour vérifier la convergence.
        
        for (let i = 0; i < n; i++) {
            let sum = b[i]; // Commencer avec le terme indépendant b[i].
            
            for (let j = 0; j < n; j++) {
                if (j !== i) { // Ajouter les contributions des autres termes sauf x[i].
                    sum -= A[i][j] * x[j];
                }
            }
            
            const newX = sum / A[i][i]; // Calculer la nouvelle valeur pour x[i].
            maxDifference = Math.max(maxDifference, Math.abs(newX - x[i])); // Mettre à jour la différence maximale.
            x[i] = newX; // Mettre à jour x[i].
        }
        
        if (maxDifference < tolerance) { // Si la convergence est atteinte, retourner la solution.
            return { x, iterations: k + 1, converged: true };
        }
    }
    
    throw new Error("Gauss-Seidel method did not converge within the maximum number of iterations.");
};


  
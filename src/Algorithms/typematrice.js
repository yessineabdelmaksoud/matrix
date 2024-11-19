
export const generateMatrixByType = (size, matrixType, min, max, algorithm) => {
    let newMatrix = Array.from({ length: size }, () => Array(size).fill(0));
  
    switch (matrixType) {
        case 'triangular-lower':
        for (let i = 0; i < size; i++) {
          for (let j = 0; j <= i; j++) {
            newMatrix[i][j] = Math.floor(Math.random() * (max - min + 1)) + min;
          }
        }
        break;
        case 'triangular-upper':
        for (let i = 0; i < size; i++) {
          for (let j = i; j < size; j++) {
            newMatrix[i][j] = Math.floor(Math.random() * (max - min + 1)) + min;
          }
        }
        break;
        case 'symmetric':
        for (let i = 0; i < size; i++) {
          for (let j = i; j < size; j++) {
            newMatrix[i][j] = newMatrix[j][i] = Math.floor(Math.random() * (max - min + 1)) + min;
          }
        }
        break;

        case 'asymmetric':
            for (let i = 0; i < size; i++) {
                for (let j = i + 1; j < size; j++) {
                    let value = Math.floor(Math.random() * (max - min + 1)) + min;
                    newMatrix[i][j] = value;
                    newMatrix[j][i] = -value;
                }
                newMatrix[i][i] = 0; 
            }
            break;
        
        

        case 'half-band-lower':
        let p = Math.floor(Math.random() * size); 
        for (let i = 0; i < size; i++) {
          for (let j = Math.max(0, i - p); j <= i; j++) {
            newMatrix[i][j] = Math.floor(Math.random() * (max - min + 1)) + min;
          }
        }
        break;

        case 'half-band-upper':
        let q = Math.floor(Math.random() * size);
        for (let i = 0; i < size; i++) {
          for (let j = i; j <= Math.min(size - 1, i + q); j++) {
            newMatrix[i][j] = Math.floor(Math.random() * (max - min + 1)) + min;
          }
        }
        break;

        case 'band':
        let p1 = Math.floor(Math.random() * size); 
        let q1 = Math.floor(Math.random() * size);
        for (let i = 0; i < size; i++) {
          for (let j = Math.max(0, i - p1); j <= Math.min(size - 1, i + q1); j++) {
            newMatrix[i][j] = Math.floor(Math.random() * (max - min + 1)) + min;
          }
        }
        break;

        case 'diagonally-dominant':
            for (let i = 0; i < size; i++) {
                let rowSum = 0;
                for (let j = 0; j < size; j++) {
                    if (i !== j) {
                        newMatrix[i][j] = Math.floor(Math.random() * (max - min + 1)) + min;
                        rowSum += Math.abs(newMatrix[i][j]);
                    }
          }
          newMatrix[i][i] = rowSum + Math.floor(Math.random() * (max - min + 1)) + 1;
        }
        break;

        case 'positive-definite':
        let L = Array.from({ length: size }, () => Array(size).fill(0));
        for (let i = 0; i < size; i++) {
          for (let j = 0; j <= i; j++) {
            if (i === j) {
              L[i][j] = Math.floor(Math.random() * (max - min + 1))+1; // Assure que les éléments diagonaux sont strictement positifs
            } else {
            L[i][j] = Math.floor(Math.random() * (max - min + 1)) + min;
          }
         }
        }
        for (let i = 0; i < size; i++) {
          for (let j = i; j < size; j++) {
            newMatrix[i][j] = 0;
            for (let k = 0; k <= i; k++) {
              newMatrix[i][j] += L[i][k] * L[j][k];
            }
            newMatrix[j][i] = newMatrix[i][j]; 
          }
        }
        break;
        

      default:
        newMatrix = Array.from({ length: size }, () =>
          Array.from({ length: size }, () => Math.floor(Math.random() * (max - min + 1)) + min)
        );
    }
    if (algorithm === 'gauss-seidel') {
  
    const newVectorB = Array.from({ length: size }, () => Math.floor(Math.random() * (max - min + 1)) + min);
    return { matrix: newMatrix, vectorB: newVectorB };
    }
    else{
        return { matrix: newMatrix};
    }

  };
  
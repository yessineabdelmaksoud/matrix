function gaussSeidel(
    A: number[][],
    b: number[],
    x: number[] = [],
    tolerance: number = 1e-10,
    maxIterations: number = 100
): number[] | null {
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
            console.log(`Converged after ${k + 1} iterations.`);
            return x;
        }
    }
    console.log("Did not converge within the maximum number of iterations.");
    return null;
}
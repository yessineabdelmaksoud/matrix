
  
  // Example usage for a symmetric matrix
  const A = [
    [4, -1, 0, 0],
    [-1, 4, -1, 0],
    [0, -1, 4, -1],
    [0, 0, -1, 3]
  ];
  const b = [15, 10, 10, 10];
  
  try {
    const { solution, iterations } = gaussSeidelSymmetric(A, b);
    console.log("Solution:", solution);
    console.log("Iterations:", iterations);
  } catch (error) {
    console.error(error.message);
  }
  
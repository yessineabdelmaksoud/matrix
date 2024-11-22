
  
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
  
  {/* Gauss-Seidel specific options */}
  {algorithm === 'gauss-seidel' && (
    <>
      {/* Dropdown for matrix type */}
      <Form.Group as={Row} className="mt-3 justify-content-center">
        <Form.Label column sm={3} className="text-center">Matrix Type</Form.Label>
        <Col sm={6}>
          <Form.Control
            as="select"
            value={matrixSubtype}
            onChange={(e) => setMatrixSubtype(e.target.value)}
          >
            <option value="">Select Type</option>
            <option value="normal">Normal</option>
            <option value="lower-triangular">Lower Triangular</option>
            <option value="upper-triangular">Upper Triangular</option>
            <option value="symmetric">Symmetric</option>
            <option value="band-lower-half">Lower Half Band</option>
            <option value="band-upper-half">Upper Half Band</option>
            <option value="band">Band</option>
          </Form.Control>
        </Col>
      </Form.Group>

      {/* Band strength input */}
      {['band-lower-half', 'band-upper-half', 'band'].includes(matrixSubtype) && (
        <Form.Group as={Row} className="mt-3 justify-content-center">
          <Form.Label column sm={3} className="text-center">Band Strength (k)</Form.Label>
          <Col sm={6}>
            <Form.Control
              type="number"
              value={bandStrength || ''}
              onChange={(e) => setBandStrength(Number(e.target.value))}
            />
          </Col>
        </Form.Group>
      )}
    </>
  )}
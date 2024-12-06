import React from 'react';
import { Container, Row, Col, Card, ListGroup, Button } from 'react-bootstrap';

function UserGuide() {
  return (
    <Container className="mt-5">
      <Card className="p-4">
        <h2 className="text-center mb-4">User Guide</h2>
        <Row>
          <Col>
            <h4>Welcome to the Matrix Calculator</h4>
            <p>This website allows you to perform various matrix operations using different algorithms. You can generate matrices randomly, enter them manually, or upload them from a file. The site also supports different matrix types, such as symmetric, asymmetric, diagonal dominant, and positive definite matrices.</p>
            <p>Here’s how you can use the website:</p>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <h5>1. Matrix Input Options</h5>
            <ListGroup>
              <ListGroup.Item>
                <strong>Random Matrix Generation:</strong> You can generate a random matrix with a specified size. Choose the type of matrix (dense, symmetric, etc.) and set the minimum and maximum values.
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Manual Matrix Entry:</strong> Enter the matrix elements manually, specifying the size of the matrix and the values.
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>File Upload:</strong> Upload a matrix file (CSV or JSON) to automatically load the matrix and vector B.
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <h5>2. Matrix Size and Types</h5>
            <ListGroup>
              <ListGroup.Item>
                <strong>Matrix Size:</strong> You can specify the size of the matrix, ranging from 1x1 to 10x10. The size can be adjusted through the input options.
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Matrix Types:</strong> You can select different types of matrices, such as:
                <ul>
                  <li><strong>Symmetric</strong>: The matrix is symmetric (A = A<sup>T</sup>).</li>
                  <li><strong>Asymmetric</strong>: The matrix is not symmetric.</li>
                  <li><strong>Diagonal Dominant</strong>: The matrix has strong diagonal dominance.</li>
                  <li><strong>Positive Definite</strong>: The matrix is positive definite, ensuring stability in algorithms.</li>
                </ul>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <h5>3. Algorithms Available</h5>
            <ListGroup>
              <ListGroup.Item>
                <strong>Transpose:</strong> Transpose the matrix (flip rows and columns).
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Determinant:</strong> Calculate the determinant of the matrix.
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Inverse:</strong> Compute the inverse of the matrix (if it exists).
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Verify Diagonal Dominance:</strong> Check if the matrix is diagonally dominant.
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Verify Positive Definite:</strong> Check if the matrix is positive definite.
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Triangular Matrix Resolution:</strong> Solve triangular matrices (upper or lower).
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Gauss-Seidel Method:</strong> Solve the system of linear equations using the Gauss-Seidel iterative method. You can set the number of iterations and tolerance error.
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <h5>4. Chatbot</h5>
            <p>You can interact with the built-in chatbot for assistance with any questions or issues you encounter while using the site. The chatbot is available at the bottom right of your screen.</p>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <h5>5. User Authentication</h5>
            <p>To save your matrices and view your history, you need to log in. You can create a new account or log in using the login form. Once logged in, you can access your matrix history and download results.</p>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <h5>6. Matrix History and Download</h5>
            <p>After performing matrix calculations, you can save your matrices to the history. You can also download the results in a format of your choice. The history allows you to view previously saved matrices and download them at any time.</p>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col className="text-center">
            <Button variant="primary" href="/login">Login</Button> &nbsp;
            <Button variant="secondary" href="/signup">Sign Up</Button>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}

export default UserGuide;

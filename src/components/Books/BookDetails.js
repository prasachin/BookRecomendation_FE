import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    fetchBookDetails();
  }, []);

  const fetchBookDetails = async () => {
    try {
      const response = await fetch(`your_api_endpoint_here/books/${id}`); // Replace with your API endpoint
      const data = await response.json();
      setBook(data);
    } catch (error) {
      console.error("Error fetching book details:", error);
    }
  };

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="mt-5">
      <Row>
        <Col md={4}>
          <Card.Img variant="top" src={book.coverImageUrl} />
        </Col>
        <Col md={8}>
          <h2>{book.title}</h2>
          <h4 className="text-muted">by {book.author}</h4>
          <p>
            <strong>Genre:</strong> {book.genre}
          </p>
          <p>
            <strong>Publication Date:</strong> {book.publicationDate}
          </p>
          <p>{book.description}</p>
          <Button variant="primary" href="/">
            Back to Book List
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default BookDetails;

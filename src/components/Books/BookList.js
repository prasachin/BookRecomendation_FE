import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  Container,
  Row,
  Col,
  Pagination,
  Spinner,
  Alert,
  Button,
} from "react-bootstrap";

const booksPerPage = 12;

const BookList = ({ query }) => {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, [currentPage, query]);

  const fetchBooks = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        "https://www.googleapis.com/books/v1/volumes",
        {
          params: {
            q: query,
            startIndex: (currentPage - 1) * booksPerPage,
            maxResults: booksPerPage,
            key: process.env.REACT_APP_GOOGLE_BOOKS_API_KEY,
          },
        }
      );
      setBooks(response.data.items || []);
      setTotalPages(Math.ceil((response.data.totalItems || 0) / booksPerPage));
    } catch (error) {
      console.error("Error fetching books:", error);
      setError("Failed to fetch books. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const renderBooks = () => {
    return books.map((book, index) => {
      const volumeInfo = book.volumeInfo || {};
      return (
        <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
          <Card className="h-100">
            <Card.Img
              variant="top"
              src={
                volumeInfo.imageLinks?.thumbnail ||
                "https://via.placeholder.com/150"
              }
              alt={volumeInfo.title}
              style={{ height: "200px", objectFit: "cover" }}
            />
            <Card.Body className="d-flex flex-column">
              <div>
                <Card.Title>{volumeInfo.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {volumeInfo.authors?.join(", ")}
                </Card.Subtitle>
                <Card.Text>
                  <strong>Genre:</strong> {volumeInfo.categories?.join(", ")}
                  <br />
                  <strong>Publication Date:</strong> {volumeInfo.publishedDate}
                  <br />
                  {volumeInfo.description &&
                    volumeInfo.description.substring(0, 100)}
                  ...
                </Card.Text>
              </div>
              <div className="mt-auto">
                <div className="d-flex justify-content-between">
                  <Button
                    variant="primary"
                    href={volumeInfo.infoLink}
                    target="_blank"
                  >
                    Read
                  </Button>
                  <Button variant="secondary">Rate</Button>
                </div>
                <Button variant="secondary" className="mt-2 w-100">
                  Review
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      );
    });
  };

  const renderPagination = () => {
    const forwardButton = () => {
      setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    const previousButton = () => {
      setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const generatePaginationItems = () => {
      const items = [];
      const start = Math.max(currentPage - 1, 1);
      const end = Math.min(currentPage + 1, totalPages);

      for (let number = start; number <= end; number++) {
        items.push(
          <Pagination.Item
            key={number}
            active={number === currentPage}
            onClick={() => setCurrentPage(number)}
          >
            {number}
          </Pagination.Item>
        );
      }
      return items;
    };

    return (
      <Pagination className="justify-content-center mt-4">
        <Pagination.Prev
          onClick={previousButton}
          disabled={currentPage === 1}
        />
        {currentPage > 2 && (
          <>
            <Pagination.Item onClick={() => setCurrentPage(1)}>
              1
            </Pagination.Item>
            {currentPage > 3 && <Pagination.Ellipsis />}
          </>
        )}
        {generatePaginationItems()}
        {currentPage < totalPages - 1 && (
          <>
            {currentPage < totalPages - 2 && <Pagination.Ellipsis />}
            <Pagination.Item onClick={() => setCurrentPage(totalPages)}>
              {totalPages}
            </Pagination.Item>
          </>
        )}
        <Pagination.Next
          onClick={forwardButton}
          disabled={currentPage === totalPages}
        />
      </Pagination>
    );
  };

  return (
    <Container>
      {loading ? (
        <div className="text-center mt-4">
          <Spinner animation="border" style={{ marginTop: "100px" }} />
        </div>
      ) : error ? (
        <Alert variant="danger" style={{ marginTop: "100px" }}>
          {error}
        </Alert>
      ) : (
        <>
          <Row style={{ marginTop: "120px" }}>{renderBooks()}</Row>
          {renderPagination()}
        </>
      )}
    </Container>
  );
};

export default BookList;

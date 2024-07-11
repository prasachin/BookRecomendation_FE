import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  Container,
  Row,
  Col,
  Pagination,
  Form,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";
import { useTheme } from "@material-ui/core/styles";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import MobileStepper from "@material-ui/core/MobileStepper";

const booksPerPage = 12;

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [query, setQuery] = useState("programming");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [INDEX, setActiveStep] = React.useState(0);
  const theme = useTheme();
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

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchBooks();
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
            <Card.Body>
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
              <Button
                variant="primary"
                href={volumeInfo.infoLink}
                target="_blank"
              >
                View Details
              </Button>
            </Card.Body>
          </Card>
        </Col>
      );
    });
  };

  const renderPagination = () => {
    const forwardButton = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const previousButton = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    let items = [];
    for (let number = 1; number <= totalPages; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === currentPage}
          onClick={() => handlePageChange(number)}
        >
          {number}
        </Pagination.Item>
      );
    }
    return (
      <div
        style={{
          marginLeft: "0%",
        }}
      >
        <MobileStepper
          steps={5}
          variant="dots"
          style={{
            flexGrow: 1,
            maxWidth: 400,
          }}
          activeStep={INDEX}
          position="static"
          nextButton={
            <Button
              size="small"
              onClick={previousButton}
              disabled={INDEX === 4}
            >
              Next
              {theme.direction !== "rtl" ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
            </Button>
          }
          backButton={
            <Button size="small" onClick={forwardButton} disabled={INDEX === 0}>
              {theme.direction !== "rtl" ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
              Back
            </Button>
          }
        />
      </div>
    );
  };

  return (
    <Container>
      <div className="fixed-form-container">
        <Container>
          <Row>
            <Col>
              <Form onSubmit={handleSearch} className="d-flex mb-4">
                <Form.Control
                  type="text"
                  placeholder="Search for books..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <Button type="submit" variant="primary" className="ml-2">
                  Search
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
      {loading ? (
        <div className="text-center mt-4">
          <Spinner animation="border" />
        </div>
      ) : error ? (
        <Alert variant="danger" className="mt-4">
          {error}
        </Alert>
      ) : (
        <>
          <Row  style={{marginTop:"120px"}}>{renderBooks()}</Row>
          {renderPagination()}
        </>
      )}
    </Container>
  );
};

export default BookList;

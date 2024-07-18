import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  Container,
  Row,
  Col,
  Spinner,
  Alert,
  Button,
  Modal,
  Form,
  ProgressBar,
} from "react-bootstrap";
import ReactStars from "react-rating-stars-component";

const Recommendation = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentBook, setCurrentBook] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        "https://www.googleapis.com/books/v1/volumes",
        {
          params: {
            q: "famous books",
            maxResults: 20,
            key: process.env.REACT_APP_GOOGLE_BOOKS_API_KEY,
          },
        }
      );
      setBooks(response.data.items || []);
    } catch (error) {
      console.error("Error fetching books:", error);
      setError("Failed to fetch books. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleShowModal = (book) => {
    setCurrentBook(book);
    fetchReviews(book.id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentBook(null);
    setRating(0);
    setComment("");
  };

  const handleSubmitReview = async () => {
    if (!currentBook) return;

    try {
      await axios.post(`/api/books/review`, {
        bookId: currentBook.id,
        userId: "exampleUserId", // Replace with actual user ID from your authentication system
        rating,
        comment,
      });
      fetchReviews(currentBook.id);
      handleCloseModal();
    } catch (error) {
      console.error("Error submitting review:", error);
      setError("Failed to submit review. Please try again later.");
    }
  };

  const fetchReviews = async (bookId) => {
    try {
      const response = await axios.get(`/api/books/reviews/${bookId}`);
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setError("Failed to fetch reviews. Please try again later.");
    }
  };
  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (totalRating / reviews.length).toFixed(1);
  };

  const getRatingDistribution = () => {
    const distribution = [0, 0, 0, 0, 0];
    reviews.forEach((review) => {
      distribution[review.rating - 1] += 1;
    });
    return distribution;
  };

  const renderRatingDistribution = () => {
    const distribution = getRatingDistribution();
    return distribution.map((count, index) => {
      const percentage = ((count / reviews.length) * 100).toFixed(1);
      return (
        <div key={index} className="d-flex align-items-center">
          <span className="mr-2" style={{ color: "black" }}>
            {5 - index} stars
          </span>
          <ProgressBar
            now={percentage}
            // label={`${percentage}%`}
            className="flex-grow-1"
          />
        </div>
      );
    });
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
            <Card.Body
              className="d-flex flex-column"
              style={{ backgroundColor: "silver" }}
            >
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
                <div className="d-flex justify-content-between mb-2">
                  <Button
                    variant="primary"
                    href={volumeInfo.infoLink}
                    target="_blank"
                  >
                    Read
                  </Button>
                  <Button
                    variant="secondary"
                    style={{ marginLeft: "44px" }}
                    onClick={() => handleShowModal(book)}
                  >
                    Rate & Review
                  </Button>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      );
    });
  };

  return (
    <div className="recommendation-container">
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
          <Row style={{ marginTop: "120px" }}>{renderBooks()}</Row>
        )}
      </Container>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "black" }}>Rate and Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="rating">
              <Form.Label style={{ color: "black" }}>Rating</Form.Label>
              <Form.Control
                as="select"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              >
                <option value="0">Choose...</option>
                <option value="1">1 - Poor</option>
                <option value="2">2 - Fair</option>
                <option value="3">3 - Good</option>
                <option value="4">4 - Very Good</option>
                <option value="5">5 - Excellent</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="comment">
              <Form.Label style={{ color: "black" }}>Review</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={comment}
                placeholder="share your thoughts..."
                onChange={(e) => setComment(e.target.value)}
              />
            </Form.Group>
            <Button
              variant="primary"
              onClick={handleSubmitReview}
              style={{ marginTop: "10px" }}
            >
              Submit
            </Button>
          </Form>
          <h5 className="mt-4" style={{ color: "black" }}>
            Reviews
          </h5>
          <div className="text-center mb-4">
            <h3 style={{ color: "black" }}>
              Average Rating: {calculateAverageRating()}
            </h3>
            <ReactStars
              count={5}
              value={parseFloat(calculateAverageRating())}
              edit={false}
              size={24}
              activeColor="green"
            />
            <p style={{ color: "black" }}>{reviews.length} reviews</p>
            {renderRatingDistribution()}
          </div>
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <div key={index} style={{ color: "black" }}>
                <strong>Rating:</strong> {review.rating} <br />
                <ReactStars
                  count={5}
                  value={review.rating}
                  edit={false}
                  size={24}
                  activeColor="green"
                />
                <strong style={{ color: "black" }}>Comment:</strong>{" "}
                {review.comment}
                <hr />
              </div>
            ))
          ) : (
            <p style={{ color: "black" }}>No reviews yet.</p>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Recommendation;

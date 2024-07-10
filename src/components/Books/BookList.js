import React, { useState, useEffect } from "react";
import { Card, Container, Row, Col, Pagination } from "react-bootstrap";

const booksPerPage = 10;

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchBooks();
  }, [currentPage]);

  const fetchBooks = async () => {
    try {
      const response = await fetch("'https://dummyjson.com/products'"); // Replace with your API endpoint
      const data = await response.json();
      setBooks(data.books);
      setTotalPages(Math.ceil(data.totalBooks / booksPerPage));
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderBooks = () => {
    return books.map((book, index) => (
      <Col key={index} md={4} className="mb-4">
        <Card>
          <Card.Img variant="top" src={book.coverImageUrl} />
          <Card.Body>
            <Card.Title>{book.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {book.author}
            </Card.Subtitle>
            <Card.Text>
              Genre: {book.genre}
              <br />
              Publication Date: {book.publicationDate}
              <br />
              {book.description}
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    ));
  };

  const renderPagination = () => {
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
    return items;
  };

  return (
    <Container>
      <Row className="mt-4">{renderBooks()}</Row>
      <Pagination className="justify-content-center mt-4">
        {renderPagination()}
      </Pagination>
    </Container>
  );
};

export default BookList;

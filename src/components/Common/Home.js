import React from "react";
import { Container, Button } from "react-bootstrap";

const Home = () => {
  return (
    <div className="home-container">
      <Container className="text-center home-content">
        <h1 className="home-title">Welcome to Book Haven !</h1>
        <p className="home-description">
          Discover, rate, and review your favorite books. Join our community and
          find your next great read!
        </p>
        <Button variant="primary" href="/books" className="home-button">
          Explore Books
        </Button>
      </Container>
    </div>
  );
};

export default Home;

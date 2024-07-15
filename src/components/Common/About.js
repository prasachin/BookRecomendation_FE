import React, { useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "aos/dist/aos.css";
import AOS from "aos";

const About = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <Container className="mt-5 d-flex flex-column align-items-center">
      <Row className="my-5 w-100 justify-content-center">
        <Col
          md={8}
          className="bg-dark bg-opacity-60 text-light p-4"
          style={{
            border: "solid black",
            borderRadius: "25px",
            boxShadow: "8px 4px 8px rgba(0, 0, 1)",
          }}
          data-aos="fade-up"
        >
          <h1 className="fw-bold text-center">
            About Book Recommendation Application
          </h1>
          <p className="text-center">
            Welcome to the Book Recommendation Application! Our platform is
            designed to help book enthusiasts find their next great read.
            Whether you're looking for the latest bestsellers, hidden gems, or
            personalized recommendations, we've got you covered.
          </p>
        </Col>
      </Row>
      <Row className="my-5 w-100 justify-content-center">
        <Col
          md={8}
          className="bg-dark bg-opacity-60 text-light p-4"
          style={{
            border: "solid black",
            borderRadius: "25px",
            boxShadow: "8px 4px 8px rgba(0, 0, 1)",
          }}
          data-aos="fade-up"
        >
          <h1 className="fw-bold text-center">Features:</h1>
          <ul className="list-unstyled">
            <li data-aos="fade-right" className="my-2">
              <p className="text-center">
                Create an account and log in to access personalized features.
              </p>
            </li>
            <li data-aos="fade-right" className="my-2">
              <p className="text-center">
                Search for books by title, author, or genre.
              </p>
            </li>
            <li data-aos="fade-right" className="my-2">
              <p className="text-center">
                View detailed information about each book, including cover,
                title, author, genre, publication date, and a brief description.
              </p>
            </li>
            <li data-aos="fade-right" className="my-2">
              <p className="text-center">
                Rate and review books you've read to share your thoughts with
                the community.
              </p>
            </li>
            <li data-aos="fade-right" className="my-2">
              <p className="text-center">
                Edit your profile details and manage your account.
              </p>
            </li>
            <li data-aos="fade-right" className="my-2">
              <p className="text-center">
                Get personalized book recommendations based on your reading
                preferences.
              </p>
            </li>
            <li data-aos="fade-right" className="my-2">
              <p className="text-center">
                Create and manage your own book collections or reading lists.
              </p>
            </li>
            <li data-aos="fade-right" className="my-2">
              <p className="text-center">
                Receive real-time notifications for book club activities or new
                book recommendations.
              </p>
            </li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
};

export default About;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Navbar,
  Nav,
  Image,
  Dropdown,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Header = ({ setQuery }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const history = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() === "") {
      setError("Search field cannot be empty");
      setTimeout(() => {
        setError("");
      }, 3000);
    } else {
      setError("");
      setQuery(searchTerm);
      history("/books");
      setSearchTerm("");
    }
  };

  return (
    <>
      {error && (
        <Alert
          variant="danger"
          className="mt-4 text-center"
          style={{
            zIndex: 2000,
            position: "fixed",
            top: "10%",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          {error}
        </Alert>
      )}
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4" fixed="top">
        <Navbar.Brand style={{ marginLeft: "20px" }}>
          <Image
            src="/assets/logo.png"
            alt="logo"
            roundedCircle
            style={{
              width: "95px",
              height: "47px",
              objectFit: "cover",
            }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <LinkContainer to="/Home">
              <Nav.Link as="span" className="nav-link-custom">
                Home
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/profile">
              <Nav.Link as="span" className="nav-link-custom">
                Profile
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/recommendations">
              <Nav.Link as="span" className="nav-link-custom">
                Recommendations
              </Nav.Link>
            </LinkContainer>
          </Nav>
          <Form onSubmit={handleSearch} className="d-flex mx-auto search-form">
            <Form.Control
              type="text"
              placeholder="Search by title, author, genre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mr-2"
            />
            <Button type="submit" variant="primary" className="ml-2">
              Search
            </Button>
          </Form>
          <Dropdown className="ml-auto">
            <Dropdown.Toggle
              variant="light"
              id="dropdown-basic"
              style={{
                borderRadius: "50%",
                padding: 0,
                border: "none",
                width: "50px",
                height: "50px",
                marginRight: "30px",
                marginTop: "5px",
              }}
            >
              <Image
                src="https://res.cloudinary.com/dbduadsbd/image/upload/v1709375511/ohionixpgqmfzsxnpftt.png"
                alt="Profile"
                roundedCircle
                style={{
                  width: "100px",
                  height: "60px",
                  objectFit: "cover",
                }}
              />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/login">
                Login
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/login">
                Signup
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Header;

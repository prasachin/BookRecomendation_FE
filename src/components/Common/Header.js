import React from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  Nav,
  Button,
  Image,
  Dropdown,
  Form,
  FormControl,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Header = ({ onSearch }) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Navbar.Brand href="/">Books</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <LinkContainer to="/">
            <Nav.Link>Home</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/profile">
            <Nav.Link>Profile</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/recommendations">
            <Nav.Link>Recommendations</Nav.Link>
          </LinkContainer>
        </Nav>
        <Form
          className="mx-auto"
          inline
          onSubmit={(e) => {
            e.preventDefault();
            onSearch(e.target.elements.search.value);
          }}
        >
          <FormControl
            type="text"
            placeholder="Search"
            className="mr-sm-2"
            name="search"
          />
        </Form>
        <Button
          variant="outline-success"
          type="submit"
          style={{ marginRight: "70px" }}
        >
          Search
        </Button>
        <Dropdown style={{ paddingRight: "25px" }}>
          <Dropdown.Toggle
            variant="light"
            id="dropdown-basic"
            style={{
              borderRadius: "50%",
              padding: 0,
              border: "none",
              width: "50px",
              height: "50px",
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
  );
};

export default Header;

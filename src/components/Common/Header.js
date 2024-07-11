import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Image, Dropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4" fixed="top">
      <Navbar.Brand href="/">BOOKS</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <LinkContainer to="/">
            <Nav.Link as="span">Home</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/profile">
            <Nav.Link as="span">Profile</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/recommendations">
            <Nav.Link as="span">Recommendations</Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
      <Dropdown
        style={{ paddingRight: "25px", paddingLeft: "0px", marginLeft: "0px" }}
      >
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
          <Dropdown.Item as={Link} to="/signup">
            Signup
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Navbar>
  );
};

export default Header;

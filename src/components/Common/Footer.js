import { Container, Row, Col } from "react-bootstrap";
import {
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaBell,
  FaEnvelope,
  FaTelegram,
  FaGithub,
} from "react-icons/fa";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4" style={{ marginTop: "0px" }}>
      <Container>
        <Row>
          <Col xs={12} md={6} lg={3} className="text-center">
            <h2>Famous Searches !</h2>
            <span>Fictions ,</span>
            <span> Horror </span>
            <br />
            <span> Romantic ,</span>
            <span> Famous ,</span>
            <br />
            stay tuned <br />
            <a href="/">
              <FaBell />
            </a>
          </Col>
          <Col xs={12} md={6} lg={3} className="text-center">
            <h2>Contact</h2>
            <p>
              <FaEnvelope />: prakashsachin431@gmail.com
            </p>
            <p>
              <FaTelegram />:
              <a
                href="https://t.me/Psachin4955"
                style={{ marginLeft: "20px", textDecoration: "none" }}
              >
                Telegram
              </a>
            </p>
          </Col>
          <Col xs={12} md={6} lg={3} className="text-center">
            <h2>Connect Us</h2>
            <div>
              <a
                href="https://github.com/prasachin"
                style={{ marginRight: "50px" }}
              >
                <FaGithub />
              </a>
              <a
                href="https://x.com/SACHINP05372841"
                style={{ marginRight: "50px" }}
              >
                <FaTwitter />
              </a>
              <a
                href="https://www.instagram.com/p.sachin_4955"
                style={{ marginRight: "50px" }}
              >
                <FaInstagram />
              </a>
              <a href="https://www.linkedin.com/in/sachin-prakash-24076b289">
                <FaLinkedin />
              </a>
            </div>
          </Col>
          <Col xs={12} md={6} lg={3} className="text-center">
            <h2>Explore</h2>
            <ul className="list-unstyled">
              <Link to="/" style={{ textDecoration: "none" }}>
                Home
              </Link>{" "}
              <br />
              <br />
              <Link to="/About" style={{ textDecoration: "none" }}>
                About
              </Link>
            </ul>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col className="text-center">
            <p>
              &copy; {new Date().getFullYear()} BookRecommendation App. All
              rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;

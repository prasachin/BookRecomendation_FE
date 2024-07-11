import React, { useState } from "react";
import { FaAt, FaLock, FaUser } from "react-icons/fa";
import axios from "axios";
import { Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Assuming you're using react-router-dom for navigation

const SignUp = ({ signurl }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleSignUp = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      setMessage("Email and Password are required");
      setTimeout(() => setMessage(null), 4000);
      return;
    }

    try {
      await axios.post("http://localhost:3003/api/users/register", {
        name,
        email,
        password,
      });
      setMessage(`${name} signed up. Login!`);
      setTimeout(() => {
        setMessage(null);
        navigate("/login");
      }, 4000);
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      setMessage("Can't sign up: " + error.message);
      setTimeout(() => setMessage(null), 4000);
      console.error("Can't sign up ", error.message);
    }
  };

  return (
    <div className="center-wrap">
      <div className="section text-center">
        <h4 className="mb-4 pb-3">Sign Up</h4>
        {message && (
          <>
            <Alert variant="success">{message}</Alert>
            <script>
              {window.scrollTo({
                top: 0,
                behavior: "smooth",
              })}
            </script>
          </>
        )}
        <form onSubmit={handleSignUp}>
          <div className="form-group">
            <input
              type="text"
              name="name"
              className="form-style"
              placeholder="Your Full Name"
              id="logname"
              autoComplete="off"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <i className="input-icon">
              <FaUser />
            </i>
          </div>
          <div className="form-group mt-2">
            <input
              type="email"
              name="email"
              className="form-style"
              placeholder="Your Email"
              id="logemail"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <i className="input-icon">
              <FaAt />
            </i>
          </div>
          <div className="form-group mt-2">
            <input
              type="password"
              name="password"
              className="form-style"
              placeholder="Your Password"
              id="logpass"
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <i className="input-icon">
              <FaLock />
            </i>
          </div>
          <button type="submit" className="btn mt-4">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;

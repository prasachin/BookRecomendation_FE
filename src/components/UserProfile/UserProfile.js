import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3003/api/users/profile",
          {
            headers: {
              Authorization: `bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user profile:", error.message);
        setLoading(false);
        setError("Error fetching user profile. Please try again later.");
      }
    };

    fetchUserProfile();
  }, []);

  const handleLogout = () => {
    // Clear token from localStorage
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading) {
    return <div className="container mt-5">Loading...</div>;
  }

  return (
    <div className="container mt-5">
      {error && <Alert variant="danger">{error}</Alert>}
      {user ? (
        <Card style={{ marginTop: "280px", marginBottom: "180px" }}>
          <Card.Header as="h5" className="d-flex justify-content-between">
            User Profile
            <Button variant="danger" onClick={handleLogout}>
              Logout
            </Button>
          </Card.Header>
          <Card.Body>
            <Card.Title>{user.name}</Card.Title>
            <Card.Text>
              <strong>Email:</strong> {user.email}
            </Card.Text>
            <Button variant="primary">Edit Profile</Button>
          </Card.Body>
          <Card.Footer className="d-flex justify-content-between"></Card.Footer>
        </Card>
      ) : (
        <Alert variant="info">No user profile found. Login !</Alert>
      )}
    </div>
  );
};

export default Profile;

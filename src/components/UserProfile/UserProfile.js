import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ProfileEdit from "./EditProfile";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          "/api/users/profile",
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

  const handleEdit = () => {
    setIsEditing(true);
  };

  if (loading) {
    return <div className="container mt-5">Loading...</div>;
  }

  return (
    <div className="container mt-5">
      {error && <Alert variant="danger" style={{marginTop:"120px"}}>{error}</Alert>}
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
            {!isEditing ? (
              <Button variant="primary" onClick={handleEdit}>
                Edit Profile
              </Button>
            ) : (
              <ProfileEdit />
            )}
          </Card.Body>
          <Card.Footer className="d-flex justify-content-between"></Card.Footer>
        </Card>
      ) : (
        <Alert variant="info" style={{marginTop:"320px"}}>No user profile found. Login !</Alert>
      )}
    </div>
  );
};

export default Profile;

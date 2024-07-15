import React, { useEffect, useState } from "react";
import { Toast } from "react-bootstrap";
import io from "socket.io-client";

const socket = io.connect("/");

const Notification = () => {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    socket.on("notification", (data) => {
      setMessage(data.message);
      setShow(true);
    });
  }, []);

  return (
    <Toast
      onClose={() => setShow(false)}
      show={show}
      delay={3000}
      autohide
      style={{ position: "fixed", top: "10px", right: "10px", zIndex: 2000 }}
    >
      <Toast.Header>
        <strong className="mr-auto">Notification</strong>
      </Toast.Header>
      <Toast.Body>{message}</Toast.Body>
    </Toast>
  );
};

export default Notification;

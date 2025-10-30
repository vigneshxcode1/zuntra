import React, { useState, useEffect } from "react";
import { Card, Form, Button, ListGroup, Spinner } from "react-bootstrap";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

const BASE_URL = "http://localhost:5000";

function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  
  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/api/v1/getmessage`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessages(res.data.messages || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load messages");
    } finally {
      setLoading(false);
    }
  };
  

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return toast.warning("Message cannot be empty!");

    try {
      const res = await axios.post(
        `${BASE_URL}/api/v1/newMessage`,
        { message },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessages((prev) => [...prev, res.data.msg]);
      setMessage("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send message");
    }
  };

  return (
    <div className="container mt-5">
      <ToastContainer />
      <Card className="shadow-lg">
        <Card.Header className="bg-primary text-white text-center">
          <h4>Community Chat</h4>
        </Card.Header>
        <Card.Body style={{ height: "400px", overflowY: "auto" }}>
          {loading ? (
            <div className="text-center">
              <Spinner animation="border" />
            </div>
          ) : messages.length > 0 ? (
            <ListGroup>
              {messages.map((msg, index) => (
                <ListGroup.Item key={index}>
                  <strong>{msg.userName}:</strong> {msg.message}
                </ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <p className="text-muted text-center">No messages yet.</p>
          )}
        </Card.Body>
        <Card.Footer>
          <Form onSubmit={sendMessage} className="d-flex">
            <Form.Control
              type="text"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button type="submit" className="ms-2" variant="success">
              Send
            </Button>
          </Form>
        </Card.Footer>
      </Card>
    </div>
  );
}

export default ChatPage;

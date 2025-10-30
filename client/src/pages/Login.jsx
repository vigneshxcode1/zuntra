import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

// const BASE_URL = "http://localhost:5000";
const LIVE_URL="https://zuntra-backend.onrender.com"
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

 const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post(`${LIVE_URL}/api/v1/login`, { email, password });

    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      toast.success("Login successful!", { autoClose: 1500 });
      setTimeout(() => navigate("/taskpage"), 1500);
    } else {
      setError(response.data.message);
      toast.error(response.data.message || "Login failed", { autoClose: 3000 });
    }
  } catch (err) {
    console.error("Login error:", err);

    const errorMessage =
      err.response?.data?.message || "Unable to connect to server. Please try again.";

    setError(errorMessage);
    toast.error(errorMessage, { autoClose: 3000 });
  }
};


  return (
    <div className="container mt-5">
      <ToastContainer />
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg">
            <div className="card-header bg-primary text-white text-center">
              <h4>Login Portal</h4>
            </div>
            <div className="card-body">
              <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                {error && <p className="text-danger">{error}</p>}

                <Button variant="primary" type="submit" className="w-100">
                  LOGIN
                </Button>
              </Form>

              <div className="text-center mt-3">
                <small>Don’t have an account? </small>
                <Button
                  variant="link"
                  className="p-0"
                  onClick={() => navigate("/register")}
                >
                  Register here
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

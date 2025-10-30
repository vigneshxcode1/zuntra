import React, { useState, useEffect } from "react";
import { Form, Button, Card, ListGroup, Spinner, Badge } from "react-bootstrap";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import ChatPage from "./Chat";
import { Link } from "react-router-dom";

// const BASE_URL = "http://localhost:5000";
const LIVE_URL="https://zuntra-backend.onrender.com"

function TaskPage() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      toast.error("Please login first!");
      return;
    }
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${LIVE_URL}/api/v1/gettask`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(res.data || []);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      toast.error(error.response?.data?.message || "Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.warning("Task title cannot be empty!");
      return;
    }

    try {
      const res = await axios.post(
        `${LIVE_URL}/api/v1/createtask`,
        { title },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Task created successfully!");
      setTitle("");
      setTasks((prev) => [...prev, res.data]);
    } catch (error) {
      console.error("Error creating task:", error);
      toast.error(error.response?.data?.message || "Failed to create task");
    }
  };

  const updateTask = async (id, currentStatus) => {
    try {
      const res = await axios.put(
        `${LIVE_URL}/api/v1/updatetask/${id}`,
        { isCompleted: !currentStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Task updated successfully!");
      setTasks((prev) =>
        prev.map((task) =>
          task._id === id ? { ...task, isCompleted: !currentStatus } : task
        )
      );
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error(error.response?.data?.message || "Failed to update task");
    }
  };

  const deleteTask = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      await axios.delete(`${LIVE_URL}/api/v1/deletetask/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Task deleted successfully!");
      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error(error.response?.data?.message || "Failed to delete task");
    }
  };

  return (
    <div className="container mt-5">
         <Link to={"/login"}>login</Link>
        <br />
       <Link to={"/register"}>register</Link>
         <br />
      <ToastContainer />
      <Card className="shadow-lg">
       
        <Card.Header className="bg-primary text-white text-center">
          <h4>Task Dashboard</h4>
        </Card.Header>
        <Card.Body>
         
          <Form onSubmit={createTask} className="mb-4">
            <Form.Group className="mb-3">
              <Form.Label>Task Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter a new task"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Button variant="success" type="submit" className="w-100">
              Add Task
            </Button>
          </Form>

          <h5 className="mb-3">Your Tasks List</h5>
          <br />
          {loading ? (
            <div className="text-center">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : tasks.length > 0 ? (
            <ListGroup>
              {tasks.map((task) => (
                <ListGroup.Item
                  key={task._id}
                  className="d-flex justify-content-between align-items-center"
                >
                  <div>
                    <strong
                      style={{
                        textDecoration: task.isCompleted
                          ? "line-through"
                          : "none",
                      }}
                    >
                      {task.title}
                    </strong>{" "}
                    <Badge
                      bg={task.isCompleted ? "success" : "warning"}
                      className="ms-2"
                    >
                      {task.isCompleted ? "Completed" : "Pending"}
                    </Badge>
                    <div className="text-muted" style={{ fontSize: "12px" }}>
                      {new Date(task.createdAt).toLocaleString()}
                    </div>
                  </div>

                  <div className="d-flex gap-2">
                    <Button
                      variant={task.isCompleted ? "secondary" : "info"}
                      size="sm"
                      onClick={() => updateTask(task._id, task.isCompleted)}
                    >
                      {task.isCompleted ? "Undo" : "Complete"}
                    </Button>
                    
                    
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => deleteTask(task._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <p className="text-center text-muted">No tasks found.</p>
          )}
        </Card.Body>

      

        <ChatPage/>


      </Card>
    </div>
  );
}

export default TaskPage;

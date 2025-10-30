import React from 'react';
import { Link } from 'react-router-dom';
import '../../src/App.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Hello, Welcome to Task Management with <br />commmunity chat</h1>
      <Link to="/register">Register</Link>
      <Link to="/login">Login</Link>
    </div>
  );
};

export default Home;

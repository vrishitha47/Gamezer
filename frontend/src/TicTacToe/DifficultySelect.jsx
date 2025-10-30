import React from "react";
import { Link } from "react-router-dom";
import "../TicTacToe/TicTacToe.css";

const DifficultySelect = () => {
  return (
    <div className="tictactoe-container">
      <h1>🎮 Choose Difficulty</h1>
      <div className="difficulty-buttons">
        <Link to="/tic/medium" className="btn">😎 Medium</Link>
        <Link to="/tic/hard" className="btn">🧠 Hard</Link>
      </div>
      <Link to="/" className="back-link">🏠 Back to Home</Link>
    </div>
  );
};

export default DifficultySelect;

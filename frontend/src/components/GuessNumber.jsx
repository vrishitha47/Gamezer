import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../GuessNumber.css";

const GuessNumber = () => {
  // 1️⃣ Generate a random number between 1 and 100
  const [randomNumber, setRandomNumber] = useState(
    Math.floor(Math.random() * 100) + 1
  );

  // 2️⃣ Store the user's guess and message feedback
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  const [attempts, setAttempts] = useState(0);

  // 3️⃣ Function that checks the guess
  const handleGuess = () => {
    const userGuess = Number(guess);

    if (!userGuess || userGuess < 1 || userGuess > 100) {
      setMessage("⚠️ Please enter a number between 1 and 100!");
      return;
    }

    setAttempts(attempts + 1);

    if (userGuess === randomNumber) {
      setMessage(`🎉 Correct! You guessed it in ${attempts + 1} tries.`);
    } else if (userGuess < randomNumber) {
      setMessage("📉 Too low! Try a higher number.");
    } else {
      setMessage("📈 Too high! Try a lower number.");
    }
  };

  // 4️⃣ Restart game
  const resetGame = () => {
    setRandomNumber(Math.floor(Math.random() * 100) + 1);
    setGuess("");
    setMessage("");
    setAttempts(0);
  };

  return (
    <div className="guess-container">
      <h1>🎯 Guess the Number</h1>
      <p>I'm thinking of a number between 1 and 100. Can you guess it?</p>

      <input
        type="number"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        placeholder="Enter your guess (1-100)"
        className="guess-input"
        min="1"
        max="100"
        onKeyPress={(e) => {
          if (e.key === 'Enter') handleGuess();
        }}
      />

      <div className="button-group">
        <button onClick={handleGuess} className="btn guess-btn">
          🎲 Check Guess
        </button>
        <button onClick={resetGame} className="btn reset-btn">
          🔄 New Game
        </button>
      </div>

      {message && <div className="message">{message}</div>}

      <div className="attempts">
        🎮 Attempts: {attempts}
      </div>

      <Link to="/" className="back-link">
        🏠 Return to Home
      </Link>
    </div>
  );
};

export default GuessNumber;

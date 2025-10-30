import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./RockPaperScissors.css";

const RockPaperScissors = () => {
  const choices = ["Rock", "Paper", "Scissors"];
  const [userChoice, setUserChoice] = useState("");
  const [computerChoice, setComputerChoice] = useState("");
  const [result, setResult] = useState("");
  const [userScore, setUserScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [ultimateWinner, setUltimateWinner] = useState(null);

  const playRound = (choice) => {
    if (ultimateWinner) return;

    const compChoice = choices[Math.floor(Math.random() * 3)];
    setUserChoice(choice);
    setComputerChoice(compChoice);

    if (choice === compChoice) {
      setResult("It's a Draw 🤝");
    } else if (
      (choice === "Rock" && compChoice === "Scissors") ||
      (choice === "Paper" && compChoice === "Rock") ||
      (choice === "Scissors" && compChoice === "Paper")
    ) {
      setResult("You Win 🎉");
      setUserScore((prev) => {
        const newScore = prev + 1;
        if (newScore === 3) setUltimateWinner("You are the Ultimate Winner 🏆");
        return newScore;
      });
    } else {
      setResult("Computer Wins 🤖");
      setComputerScore((prev) => {
        const newScore = prev + 1;
        if (newScore === 3)
          setUltimateWinner("Computer is the Ultimate Winner 💻🏆");
        return newScore;
      });
    }
  };

  const resetGame = () => {
    setUserChoice("");
    setComputerChoice("");
    setResult("");
    setUserScore(0);
    setComputerScore(0);
    setUltimateWinner(null);
  };

  return (
    <div className="rps-container">
      <h1>🪨📄✂️ Rock Paper Scissors</h1>

      <div className="choices">
        {choices.map((choice) => (
          <button
            key={choice}
            className="choice-btn"
            onClick={() => playRound(choice)}
            disabled={!!ultimateWinner}
          >
            {choice}
          </button>
        ))}
      </div>

      <div className="hands">
        <div className="hand">
          <p><strong>You:</strong></p>
          <span className="emoji">
            {userChoice === "Rock" && "✊"}
            {userChoice === "Paper" && "✋"}
            {userChoice === "Scissors" && "✌️"}
          </span>
        </div>

        <div className="hand">
          <p><strong>Computer:</strong></p>
          <span className="emoji">
            {computerChoice === "Rock" && "✊"}
            {computerChoice === "Paper" && "✋"}
            {computerChoice === "Scissors" && "✌️"}
          </span>
        </div>
      </div>

      <h3 className="result">{result}</h3>

      <div className="scores">
        <p>🧍 You: {userScore}</p>
        <p>💻 Computer: {computerScore}</p>
      </div>

      {ultimateWinner && <h2 className="ultimate">{ultimateWinner}</h2>}

      <button className="btn reset" onClick={resetGame}>🔄 Reset</button>

      <Link to="/" className="back-link">🏠 Back to Home</Link>
    </div>
  );
};

export default RockPaperScissors;

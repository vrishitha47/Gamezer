import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./TicTacToe.css";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [winner, setWinner] = useState(null);

  const checkWinner = (b) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let [a, bIndex, c] of lines) {
      if (b[a] && b[a] === b[bIndex] && b[a] === b[c]) {
        return b[a];
      }
    }
    return null;
  };

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = "X";
    const userWin = checkWinner(newBoard);
    if (userWin) {
      setBoard(newBoard);
      setWinner("You Win 🎉");
      return;
    }

    // Computer's move
    const compMove = getComputerMove(newBoard);
    if (compMove !== -1) {
      newBoard[compMove] = "O";
    }

    const compWin = checkWinner(newBoard);
    if (compWin) {
      setBoard(newBoard);
      setWinner("Computer Wins 🤖");
      return;
    }

    setBoard(newBoard);
  };

  const getComputerMove = (b) => {
    // Blocking logic — look for "X _ X"
    const patterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let [a, mid, c] of patterns) {
      if (b[a] === "X" && b[c] === "X" && b[mid] === "") return mid;
    }

    // If no blocking move, play random
    const emptyCells = b
      .map((val, i) => (val === "" ? i : null))
      .filter((val) => val !== null);
    if (emptyCells.length === 0) return -1;
    return emptyCells[Math.floor(Math.random() * emptyCells.length)];
  };

  const resetGame = () => {
    setBoard(Array(9).fill(""));
    setWinner(null);
  };

  return (
    <div className="tictactoe-container">
      <h1>❌⭕ Tic Tac Toe</h1>

      <div className="board">
        {board.map((cell, i) => (
          <div key={i} className="cell" onClick={() => handleClick(i)}>
            {cell}
          </div>
        ))}
      </div>

      {winner && <h2 className="winner">{winner}</h2>}

      <button className="btn reset" onClick={resetGame}>
        🔄 Reset
      </button>

      <Link to="/" className="back-link">🏠 Back to Home</Link>
      <Link to="/tic" className="back-link">🔙 Back to Difficulty Select</Link>
    </div>
  );
};

export default TicTacToe;

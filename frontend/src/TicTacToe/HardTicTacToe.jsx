import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./TicTacToe.css";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [winner, setWinner] = useState(null);

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

  const checkWinner = (b) => {
    // clearer variable names: i,j,k
    for (let [i, j, k] of lines) {
      if (b[i] && b[i] === b[j] && b[i] === b[k]) {
        return b[i]; // 'X' or 'O'
      }
    }
    return null;
  };

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = "X";

    // If user wins immediately after their move:
    const userWin = checkWinner(newBoard);
    if (userWin) {
      setBoard(newBoard);
      setWinner("You Win 🎉");
      return;
    }

    // If board full after user's move -> draw
    if (!newBoard.includes("")) {
      setBoard(newBoard);
      setWinner("It's a Draw 🤝");
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

    // If board full after computer's move -> draw
    if (!newBoard.includes("")) {
      setBoard(newBoard);
      setWinner("It's a Draw 🤝");
      return;
    }

    setBoard(newBoard);
  };

  const getComputerMove = (b) => {
    // 1) Try to win: if there's a line with 2 'O' and 1 empty, place 'O' and win.
    for (let [i, j, k] of lines) {
      const trio = [b[i], b[j], b[k]];
      const countO = trio.filter((v) => v === "O").length;
      const emptyIdx = [i, j, k].find((idx) => b[idx] === "");
      if (countO === 2 && emptyIdx !== undefined) return emptyIdx;
    }

    // 2) Block player: if there's a line with 2 'X' and 1 empty, place 'O' there.
    for (let [i, j, k] of lines) {
      const trio = [b[i], b[j], b[k]];
      const countX = trio.filter((v) => v === "X").length;
      const emptyIdx = [i, j, k].find((idx) => b[idx] === "");
      if (countX === 2 && emptyIdx !== undefined) return emptyIdx;
    }

    // 3) Take center if available (good heuristic)
    if (b[4] === "") return 4;

    // 4) Take a corner if available (0,2,6,8)
    const corners = [0, 2, 6, 8].filter((i) => b[i] === "");
    if (corners.length > 0) return corners[Math.floor(Math.random() * corners.length)];

    // 5) Otherwise pick a random empty cell
    const emptyCells = b
      .map((val, i) => (val === "" ? i : null))
      .filter((v) => v !== null);
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

      <div className="board" role="grid" aria-label="Tic Tac Toe board">
        {board.map((cell, i) => (
          <div
            key={i}
            className="cell"
            onClick={() => handleClick(i)}
            role="button"
            aria-pressed={!!cell}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleClick(i);
            }}
          >
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

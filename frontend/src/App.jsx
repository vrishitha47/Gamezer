import { Routes, Route, Link } from 'react-router-dom'
import './App.css'
import GuessNumber from './components/GuessNumber.jsx'
import DifficultySelect from './TicTacToe/DifficultySelect.jsx'
import MediumTicTacToe from './TicTacToe/MediumTicTacToe.jsx'
import HardTicTacToe from './TicTacToe/HardTicTacToe.jsx'
import RockPaperScissors from './components/RockPaperScissors.jsx'

function HomePage() {
  return (
    <div className="home-container">
      <h1>🎮 Welcome to Gamezer!</h1>
      <div className="game-links">
        <Link to="/guess" className="game-link">
          🎯 Number Guessing Game
        </Link>
        <Link to="/tic" className="game-link">
          🎯 Tic Tac Toe Game ❌ ⭕
        </Link>
        <Link to="/rps" className="game-link">
          🪨📄✂️ Rock Paper Scissors
        </Link>
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/guess" element={<GuessNumber />} />
      <Route path="/tic" element={<DifficultySelect />} />
      <Route path="/tic/medium" element={<MediumTicTacToe />} />
      <Route path="/tic/hard" element={<HardTicTacToe />} />
      <Route path="/rps" element={<RockPaperScissors />} />
    </Routes>
  )
}

export default App

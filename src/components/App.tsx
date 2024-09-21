import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import '../styles/App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className="container">
      <header>
        <h1>Memory Card Game</h1>
        <div className="scoreboard">
          <div className="score">
            <p>Score: <span id="current-score">0</span></p>
          </div>
          <div className="high-score">
            <p>High Score: <span id="high-score">0</span></p>
          </div>
        </div>
      </header>

      <section className="game-board">
        <div className="card" data-id="1"></div>
        <div className="card" data-id="2"></div>
        <div className="card" data-id="3"></div>
        <div className="card" data-id="4"></div>
        <div className="card" data-id="5"></div>
        <div className="card" data-id="6"></div>
        <div className="card" data-id="7"></div>
        <div className="card" data-id="8"></div>
      </section>
    </div>
    </>
  )
}

export default App

import { useState } from 'react'
import './App.css'

function App() {
  let [board, setBoard] = useState(Array(9).fill(''))
  let [xTurn, setXTurn] = useState(true)
  let [gameEnded, setGameEnded] = useState(false)
  let [statusMsg, setStatusMsg] = useState("X's turn")

  function clickSquare(idx) {
    if (board[idx] !== '' || gameEnded) {
      return;
    }
    
    let boardCopy = [...board];
    boardCopy[idx] = xTurn ? 'X' : 'O';
    setBoard(boardCopy);

    let winner = findWinner(boardCopy);
    if (winner) {
      setStatusMsg(`Player ${winner} wins!`);
      setGameEnded(true);
      return;
    }

    if (boardCopy.every(square => square !== '')) {
      setStatusMsg('It\'s a tie!');
      setGameEnded(true);
      return;
    }

    setXTurn(!xTurn);
    setStatusMsg(`${!xTurn ? 'X' : 'O'}'s turn`);
  }

  function newGame() {
    setBoard(Array(9).fill(''));
    setXTurn(true);
    setGameEnded(false);
    setStatusMsg("X's turn");
  }

  return (
    <div className="game-container">
      <h1>Tic Tac Toe</h1>
      <div className="status">{statusMsg}</div>
      
      <div className="game-board">
        {board.map((square, i) => {
          return <div 
            key={i} 
            className={`square ${square === 'X' ? 'x-mark' : ''} ${square === 'O' ? 'o-mark' : ''}`}
            onClick={() => clickSquare(i)}
          >
            {square}
          </div>
        })}
      </div>
      
      <button className="reset-btn" onClick={newGame}>Start Over</button>
    </div>
  )
}

function findWinner(squares) {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  for (let i = 0; i < winPatterns.length; i++) {
    const [a, b, c] = winPatterns[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  
  return null
}

export default App 
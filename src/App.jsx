import { useState, useEffect } from 'react'
import './App.css'
import './index.css'

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [player, setPlayer] = useState("X");
  const [winner, setWinner] = useState(null);

  const handleClick = (i) => {
    if (board[i] || winner) return;

    let newBoard = [...board];
    newBoard[i] = player;

    setBoard(newBoard);
    setPlayer(player === "X" ? "O" : "X");
  }

  const clearBoard = () => {
    setBoard(Array(9).fill(null));
    setPlayer("X");
    setWinner(null);
  };

  const checkWinner = (board) => {
    const wins = [
      [0,1,2],[3,4,5],[6,7,8],
      [0,3,6],[1,4,7],[2,5,8],
      [0,4,8],[2,4,6]
    ];

    for (let [a,b,c] of wins) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  useEffect(() => {
    let win = checkWinner(board);

    if (win) {
      setWinner(win);
    } else if (board.every(cell => cell !== null)) {
      setWinner("Draw");
    }
  }, [board]);

  return (
    <div className="bg-zinc-600 text-white h-screen flex items-center justify-center">
      
      <div className="flex flex-col items-center">
        
        {!winner && (
          <h1 className="text-xl mb-4">Turn: {player}</h1>
        )}

        <div className="grid grid-cols-3 gap-2 w-[300px]">
          {board.map((cell, i) => (
            <div
              key={i}
              onClick={() => handleClick(i)}
              className="h-24 bg-gray-200 text-black flex items-center justify-center text-3xl cursor-pointer"
            >
              {cell}
            </div>
          ))}
        </div>

        {winner && (
          <h1 className="text-2xl mt-4">
            {winner === "Draw" ? "It's a Draw!" : `Winner: ${winner}`}
          </h1>
        )}

        <button
          onClick={clearBoard}
          className="mt-4 px-4 py-2 bg-blue-500 rounded"
        >
          Restart
        </button>

      </div>
    </div>
  )
}

export default App
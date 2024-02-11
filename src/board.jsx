import React, { useState } from "react";
import Square from "./Square.jsx";
import "./styles.css";

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isX, setIsX] = useState(true);

  const handleClick = (index) => {
    if (calculateWinner(squares || squares[index]) || isDraw) {
      return;
    }

    // Instead of modifying the existing squares array directly, consider creating a copy of it and then updating the state. This helps in ensuring immutability, which is generally a good practice in React.
    if (squares[index] == null) {
      const newSquares = [...squares];
      newSquares[index] = isX ? "X" : "O";
      setSquares(newSquares);
      setIsX(!isX);
    }
    return;
  };

  const handleRestart = () => {
    setIsX(true);
    setSquares(Array(9).fill(null));
  };

  // It's a good idea to move the winning patterns outside the function to avoid unnecessary re-creation on each function call
  const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const calculateWinner = (squares) => {
    for (const pattern of winningPatterns) {
      const [a, b, c] = pattern;
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  let status;
  const winner = calculateWinner(squares);
  const isDraw = !winner && squares.every((square) => square);

  if (winner) {
    status = `Winner: ${winner}`;
  } else if (isDraw) {
    status = "Draw";
  } else {
    status = `Next player: ${isX ? "X" : "O"}`;
  }

  return (
    <>
      <div className="board">
        {Array.from({ length: 9 }, (_, index) => (
          <div className="board-row" key={index}>
            <Square value={squares[index]} onClick={() => handleClick(index)} />
          </div>
        ))}
      </div>
      <div className="status">{status}</div>
      <button className="restart" onClick={handleRestart}>
        Restart Game
      </button>
    </>
  );
}

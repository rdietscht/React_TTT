import { useState } from 'react';

/**
 * Square component, containing a single value.
 * 
 * Represents a single tile in an ongoing Tic-Tac-Toe game.
 * 
 * @param {String} value The value to display in the browser
 * @param {Function} onSquareClick The function that a Square should call when it is clicked.
 * @returns {HTMLButtonElement} The button representing the Square with its value.
 */
function Square ({ value, onSquareClick })
{
  return(
    <button
      className="square"
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

// The single function that is executed when we refer to the App component in other files.
export default function Board()
{

  const [xTurn, setXTurn] = useState (true); // Keep track of turn state
  const [squares, setSquares] = useState (Array(9).fill (null)); // Keep track of board state

  /**
   * Board method: Updates the square referenced by the given index.
   * 
   * @param {Number} i The number value associated with an index in squares state.
   */
  function handleClick (i)
  {

    // Early Exit - This square index already has a non-null value associated with it.
    if (squares[i] || calculateWinner (squares))
      {
        return;
      }

    const nextSquares = squares.slice ();

    // Determine whose turn it is (X/O).
    if (xTurn)
      {
        nextSquares[i] = "X";
      }
    else
      {
        nextSquares[i] = "O";
      }

    setSquares (nextSquares);
    setXTurn (!xTurn);
  }

  function calculateWinner(squares)
  {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  // Use the current status of the board to compute who's won/turn it is.
  const winner = calculateWinner (squares);
  let status;
  if (winner)
    {
      status = "Winner: " + winner;
    }
  else
    {
      status = "Next Player: " + (xTurn ? "X" : "O");
    }


    return (
      <>
  
        {/* Status section to notify players of win */}
        <div className="status">{status}</div>

        {/* Each board in the game is a 3x3 2D table with squares */}
        <div className="board-row">
          <Square value={squares[0]} onSquareClick={() => { handleClick (0) }} />
          <Square value={squares[1]} onSquareClick={() => { handleClick (1) }} />
          <Square value={squares[2]} onSquareClick={() => { handleClick (2) }} />
        </div>
        <div className="board-row">
          <Square value={squares[3]} onSquareClick={() => { handleClick (3) }} />
          <Square value={squares[4]} onSquareClick={() => { handleClick (4) }} />
          <Square value={squares[5]} onSquareClick={() => { handleClick (5) }} />
        </div>
        <div className="board-row">
          <Square value={squares[6]} onSquareClick={() => { handleClick (6) }} />
          <Square value={squares[7]} onSquareClick={() => { handleClick (7) }} />
          <Square value={squares[8]} onSquareClick={() => { handleClick (8) }} />
        </div>
      </>
    );
  }

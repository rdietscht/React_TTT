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

// Board holds data about the current state of the game.
function Board({ xTurn, squares, onPlay })
{

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

    onPlay (nextSquares);
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

// Game controls Board data by letting it use its state.
export default function Game ()
{

  // Game states to keep track of
  // const [xIsNext, setXIsNext] = useState (true); // Old, redundant state. No longer used.
  const [history, setHistory] = useState ([Array(9).fill (null)]); // History is initialized to an array with one element: an array of 9 nulls (aka the initial state of our game.)
  const [currentMove, setCurrentMove] = useState (0); // Tracks the current move index in the history we are in.
  const currentSquares = history[currentMove]; // The current state of the Board should be the last step in history.
  const xIsNext = currentMove % 2 === 0; // We can figure out whose move it is by using currentMove. No need to use state, as it's redundant and leads to buggy code.

  // This function handles a player's single turn in a game. Called by Board to update its state.
  function handlePlay (nextSquares)
    {
      // Get the history up to where we currently are in the history. Needed for time travel.
      const nextHistory = [...history.slice (0, currentMove + 1), nextSquares];

      // Update the history of the Game after appending it with the nextSquare array. Also update player turn and move states.
      setHistory (nextHistory);
      setCurrentMove (nextHistory.length - 1);
    }

    // Used to get update the currentMove state in our Game component.
    function jumpTo (nextMove)
      {
        setCurrentMove (nextMove);
      }

      // The map function takes a callback function, (created using "() => {}" syntax) that will be used to transform a list of elements to another list of elements.
      // In this case, we are transforming a list of string/null values to a list of button objects.
      const moves = history.map ((squares, move) => {
        let description;

        if (move > 0)
          {
            description = 'Go to move #' + move;
          }
        else
          {
            description = 'Go to game start';
          }

        // This looks confusing, but it's actually very simple. All this is
        // doing is returning a button element (encapsulated within a list element,
        // since it is being rendered within a larger <ol> element,) that calls
        // the "jumpTo" Game function when it is clicked. This button is rendered
        // for each element in our history array. In other words, each entry in
        // history will have an associated button that calls jumpTo. This array of
        // button elements is then assigned to our "moves" variable to be rendered
        // in our Game component.
        // 
        // Additionally, we must use the key React attribute that tells
        // the React compiler which list element is which. This is
        // necessary anytime we have dynamic lists, (lists that can be
        // modified/added to/deleted from). We must choose a number that
        // stays consistent and doesn't get reordered, (i.e., the number
        // associated with a move step in the history.)
        return (
          <li key={move}>
            <button onClick={() => jumpTo (move)}>{description}</button>
          </li>
        );

      });

  return (
    <div className='game'>
      <div className='game-board'>
        <Board xTurn={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className='game-info'>
        <ol>
          {moves}
        </ol>
      </div>
    </div>
  );
}
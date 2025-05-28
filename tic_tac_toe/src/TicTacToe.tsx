import React, { useState } from "react";

// PUBLIC_INTERFACE
/**
 * Primary container for TicTacToe Classic game.
 * Features:
 *  - Two player mode (alternating X/O, same device)
 *  - Win/draw detection with result/status bar
 *  - Reset board functionality
 *  - Centered 3x3 clickable grid
 *  - Uses provided color scheme and light styling
 */
const TicTacToe: React.FC = () => {
  // The board is a flat array of 9: 'X', 'O', or null
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true); // true = X's turn, false = O's
  const [gameStatus, setGameStatus] = useState<"playing" | "won" | "draw">(
    "playing"
  );
  const [winner, setWinner] = useState<string | null>(null);

  // Returns "X", "O", or null if no winner
  // PUBLIC_INTERFACE
  function calculateWinner(currentBoard: (string | null)[]): string | null {
    /** Returns 'X' or 'O' if won, null if no winner yet */
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6], // diagonals
    ];
    for (let line of lines) {
      const [a, b, c] = line;
      if (
        currentBoard[a] &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[a] === currentBoard[c]
      ) {
        return currentBoard[a];
      }
    }
    return null;
  }

  // PUBLIC_INTERFACE
  function handleCellClick(index: number): void {
    /** Handles user clicks on a cell */
    if (board[index] || gameStatus !== "playing") {
      return; // cell isn't empty or the game is over
    }
    const newBoard = board.slice();
    newBoard[index] = isXNext ? "X" : "O";
    const theWinner = calculateWinner(newBoard);
    if (theWinner) {
      setBoard(newBoard);
      setWinner(theWinner);
      setGameStatus("won");
    } else if (newBoard.every(cell => cell)) {
      // All cells filled -> draw
      setBoard(newBoard);
      setGameStatus("draw");
    } else {
      setBoard(newBoard);
      setIsXNext(!isXNext);
    }
  }

  // PUBLIC_INTERFACE
  function handleReset(): void {
    /** Resets board state and status */
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setGameStatus("playing");
    setWinner(null);
  }

  // PUBLIC_INTERFACE
  function getStatusMessage(): string {
    /** Returns displayed status bar message */
    if (gameStatus === "won" && winner) {
      return `Player ${winner} wins! 🎉`;
    }
    if (gameStatus === "draw") {
      return "It's a draw!";
    }
    return `Player ${isXNext ? "X" : "O"}'s turn`;
  }

  // Styling using inline and CSS variables for light theme & provided colors
  // You may add className override in App.css for better customization
  const colorVars: React.CSSProperties = {
    "--ttt-primary": "#ffffff",
    "--ttt-secondary": "#000000",
    "--ttt-accent": "#2196f3",
    "--ttt-cell-size": "80px"
  } as React.CSSProperties;

  // Board cell renderer
  function renderCell(idx: number): JSX.Element {
    return (
      <button
        key={idx}
        className="ttt-cell"
        style={{
          width: "var(--ttt-cell-size)",
          height: "var(--ttt-cell-size)",
          fontSize: "2.2rem",
          fontWeight: 600,
          color:
            board[idx] === "X"
              ? "var(--ttt-secondary)"
              : board[idx] === "O"
              ? "var(--ttt-accent)"
              : "var(--ttt-secondary)",
          background: "var(--ttt-primary)",
          border: "2px solid var(--ttt-accent)",
          cursor: board[idx] || gameStatus !== "playing" ? "default" : "pointer",
          borderRadius: "7px",
          transition: "background 0.15s"
        }}
        aria-label={`cell ${idx + 1}`}
        onClick={() => handleCellClick(idx)}
        disabled={!!board[idx] || gameStatus !== "playing"}
      >
        {board[idx]}
      </button>
    );
  }

  return (
    <div
      className="ttt-main-container"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "calc(100vh - 64px)",
        background: "var(--ttt-primary)",
        padding: "32px 0",
        gap: "24px",
        ...colorVars,
      }}
    >
      <div
        className="ttt-status-bar"
        style={{
          color: "var(--ttt-secondary)",
          fontWeight: 500,
          fontSize: "1.35rem",
          marginBottom: "8px",
          minHeight: "1.3em"
        }}
      >
        {getStatusMessage()}
      </div>
      <div
        className="ttt-board"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridTemplateRows: "repeat(3, 1fr)",
          gap: "12px",
          background: "var(--ttt-accent)",
          borderRadius: "11px",
          padding: "12px"
        }}
      >
        {Array(9)
          .fill(null)
          .map((_, idx) => renderCell(idx))}
      </div>
      <button
        className="ttt-reset-btn"
        onClick={handleReset}
        style={{
          marginTop: "16px",
          background: "var(--ttt-accent)",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          padding: "10px 28px",
          fontSize: "1.05rem",
          fontWeight: 500,
          boxShadow: "none",
          cursor: "pointer",
          letterSpacing: "0.01em"
        }}
        aria-label="Reset game"
      >
        Reset Game
      </button>
    </div>
  );
};

export default TicTacToe;

import React, { useState } from "react";
const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const checkWinner = (newBoard) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (
        newBoard[a] &&
        newBoard[a] === newBoard[b] &&
        newBoard[a] === newBoard[c]
      ) {
        return newBoard[a];
      }
    }

    return newBoard.every((cell) => cell) ? "Draw" : null;
  };

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const gameWinner = checkWinner(newBoard);
    if (gameWinner) setWinner(gameWinner);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };
  return (
    <>
   
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-4">Tic-Tac-Toe</h1>
      <div className="grid grid-cols-3 gap-2 w-64">
        {board.map((cell, index) => (
          <div
            key={index}
            onClick={() => handleClick(index)}
            className={`w-20 h-20 flex items-center justify-center text-2xl font-bold cursor-pointer border border-gray-700 bg-gray-800 hover:bg-gray-700 transition ${
              cell ? "cursor-not-allowed" : ""
            }`}
          >
            {cell}
          </div>
        ))}
      </div>
      {winner && (
        <div className="mt-4 text-lg">
          {winner === "Draw" ? "It's a draw!" : `Winner: ${winner}`}
        </div>
      )}
      <button
        onClick={resetGame}
        className="mt-4 px-4 py-2 bg-blue-500 hover:bg-gradient-to-tr from-blue-500 to-violet-700  text-white font-bold rounded"
      >
        Restart Game
      </button>
    </div>
     </>
  );
};

export default TicTacToe;

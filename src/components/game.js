import React, { useState } from 'react';
import Board from './board';

function Game() {
    const [history, setHistory] = useState([{
        squares: Array(9).fill(null),
      }]);
    
    const [stepNumber, setStepNumber] = useState(0);
    const [xIsNext, setXisNext] = useState(true);
    const [isDescending, setIsDescending] = useState(false);
  
    const handleClick = (i) => {
      const col = parseInt(i % 3 + 1);
      const row = parseInt(i / 3 + 1);
  
      const newHistory = history.slice(0, stepNumber + 1);
      const current = newHistory[newHistory.length - 1];
      const squares = current.squares.slice();
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      squares[i] = xIsNext ? 'X' : 'O';

      setHistory(newHistory.concat([{
        squares: squares,
        location: [col, row],
      }]));
      setStepNumber(newHistory.length);
      setXisNext(!xIsNext);
    }
  
    const jumpTo = (step) => {
      setStepNumber(step);
      setXisNext((step % 2) === 0);
    }
  
    const toggleOrder = () => {
      setIsDescending(!isDescending);
    }

    const calculateWinner = (squares) => {
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
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return {type: squares[a], line: [a, b, c]};
        }
    }
    return null;
    }
  
    const current = history[stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
    const desc = move ?
        'Go to move #' + move + ' position (' + history[move].location + ')' :
        'Go to game start';
    return (
        <li key={move}>
        <button onClick={() => jumpTo(move)}>
            {move === stepNumber ? <b>{desc}</b> : desc}
        </button>
        </li>
    );
    });

    let status;
    if (winner) {
        status = 'Winner: ' + winner.type;
    } else if (!current.squares.includes(null)) {
        status = 'Draw !!!';
    } else {
        status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }

    return (
        <div className="game">
            <div className="game-board">
            <Board 
                squares={current.squares}
                onClick={(i) => handleClick(i)}
                winningSquares={winner ? winner.line : []}
            />
            </div>
            <div className="game-info">
            <div>{status}</div>
            <ol>{isDescending ? moves.reverse() : moves}</ol>
            <button onClick={() => toggleOrder()}>Change Order</button>
            </div>
        </div>
    );
}

export default Game;
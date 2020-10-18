import React from 'react';
import Square from './square';

function Board (props) {
    const renderSquare = (i) => {
      return (
        <Square 
          value={props.squares[i]} 
          onClick={() => props.onClick(i)}
          isWinSquare = {props.winningSquares.includes(i)}
        />
      )
    }
  
    let boardSquares = [];

    for(let row = 0; row < 3; row++){
      let boardRow = [];

      for(let col = 0; col < 3; col++){
          boardRow.push(<span key={(row * 3) + col}>{renderSquare((row * 3) + col)}</span>);
      }

      boardSquares.push(<div className="board-row" key={row}>{boardRow}</div>);
    }

    return (
        <div>
            {boardSquares}
        </div>
    );
}

export default Board;
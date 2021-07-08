import React from 'react';
import Cell from '../Cell/Cell';
import './Grid.css';

const Grid = ({grid, colors, clickHandler, isFinished, count}) => {
  let rows = Object.keys(grid.nodes).map((v) => {
    return (
      <Cell 
        key={v} 
        color={colors[grid.nodes[v].color]} 
        size={grid.size}
        clickHandler={clickHandler}
      />
    )
  });
  const className = `grid ${isFinished ? 'game-over' : ''}`
  return (
    <div className={className}>
      {rows}
      <div className="results">
        <div>Total Moves:</div>
        <div>{count}</div>
      </div>
    </div>
  );
}

export default Grid;
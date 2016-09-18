import React from 'react';
import Cell from '../Cell/Cell';
import './Grid.css';

const Grid = ({grid, colors, size}) => {
  let rows = grid.map((row, i) => {
    return row.map((cell, j) => {
      return <Cell key={i + " " + j} color={colors[cell]} size={size} />
    })
  })
  return (
    <div className="grid">
      {rows}
    </div>
  );
}

export default Grid;
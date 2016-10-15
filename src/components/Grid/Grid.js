import React from 'react';
import Cell from '../Cell/Cell';
import './Grid.css';

const Grid = ({grid, colors}) => {
  let rows = Object.keys(grid.nodes).map((v) => {
    return <Cell key={v} color={colors[grid.nodes[v].color]} size={grid.size} />
  });

  return (
    <div className="grid">
      {rows}
    </div>
  );
}

export default Grid;
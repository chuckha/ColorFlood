import React from 'react';
import Cell from '../Cell/Cell';
import './Grid.css';

const Grid = (props) => {
  let rows = props.grid.map((row, i) => {
    return row.map((cell, j) => {
      return <Cell key={i + " " + j} color={props.colors[cell]} />
    })
  })
  return (
    <div className="grid">
      {rows}
    </div>
  );
}

export default Grid;
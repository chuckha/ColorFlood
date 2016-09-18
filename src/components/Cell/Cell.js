import React from 'react';
import './Cell.css';

const Cell = ({color, size}) => {
  let classString = "cell-" + size + " " + color;
  return (
    <div className={classString}></div>
  );
}

export default Cell;
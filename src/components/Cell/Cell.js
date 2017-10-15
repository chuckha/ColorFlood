import React from 'react';
import './Cell.css';

const Cell = ({color, size, clickHandler}) => {
  let classString = "cell-" + size + " " + color;
  
  const click = e => {
    e.preventDefault();
    clickHandler(color);
  }

  return (
    <div className={classString} onClick={click}></div>
  );
}

export default Cell;
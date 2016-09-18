import React from 'react';
import './Cell.css';

const Cell = (props) => {
  let classString = "cell " + props.color;
  return (
    <div className={classString}></div>
  );
}

export default Cell;
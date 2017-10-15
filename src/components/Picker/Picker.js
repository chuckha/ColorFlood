import React from 'react';

import './Picker.css';

const Picker = ({color, clickHandler}) => {
  let className = color + ' picker';
  return (
    <div 
      className={className}
      onClick={(e) => {
        clickHandler(color);
      }}
    ></div>
  );
}

export default Picker;
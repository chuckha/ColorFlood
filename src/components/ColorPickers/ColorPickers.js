import React from 'react';
import Picker from '../Picker/Picker';
import './ColorPickers.css';

const ColorPickers = ({colors, clickHandler, incrementCount}) => {
  let pickers = colors.map(function (color, index) {
    return <Picker color={color} key={"picker_" + color} colorIndex={index} clickHandler={clickHandler} incrementCount={incrementCount}/>
  });
  return (
    <div className="pickers">{pickers}</div>
  );
}

export default ColorPickers;
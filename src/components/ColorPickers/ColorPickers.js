import React from 'react';
import Picker from '../Picker/Picker';
import './ColorPickers.css';

const ColorPickers = ({colors, clickHandler}) => {
  let pickers = colors.map(function (color, index) {
    return <Picker color={color} key={"picker_" + color} clickHandler={clickHandler} />
  });
  return (
    <div className="pickers">{pickers}</div>
  );
}

export default ColorPickers;
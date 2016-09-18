import React, { Component } from 'react';
import Grid from './components/Grid/Grid';
import ColorPickers from './components/ColorPickers/ColorPickers';

import './index.css';

class App extends Component {
  constructor(props) {
    super(props);
    let SIZE = 12;
    let COLORS = ['blue','red','green','yellow','orange'];
    this.incrementCount = this.incrementCount.bind(this);
    this.colorFill = this.colorFill.bind(this);
    this.updateCell = this.updateCell.bind(this);
    this._colorFill = this._colorFill.bind(this);
    this.newGrid = this.newGrid.bind(this);
    this.sliderInput = this.sliderInput.bind(this);
    this.restart = this.restart.bind(this);
    this.state = {
      size: SIZE,
      grid: this.newGrid(SIZE, COLORS),
      colors: COLORS,
      count: 0,
    }
  }

  newGrid(size, colors) {
    var grid = [];
    for (var i = 0, max=size; i < max; i++) {
      grid.push([]);
      for (var j = 0, max2=size; j < max2; j++) {
        grid[i].push(this.randomIndexFromCollection(colors));
      }
    }
    return grid;
  }

  randomIndexFromCollection(collection) {
    var index = 0;
    for (var i = 1, max = collection.length; i < max; i++) {
      if (Math.random() < 1/(i+1)) {
        index = i;
      }
    }
    return index;
  }

  updateCell(color, i, j) {
    var grid = this.state.grid;
    grid[i][j] = color;
    this.setState({
      grid: grid
    });
  }

  _colorFill(oldColor, newColor, i, j) {
    if (i >= 0 && j >= 0 && i < this.state.grid.length && j < this.state.grid[i].length && this.state.grid[i][j] === oldColor) {
      this.colorFill(newColor, i, j)
    }
  }

  colorFill(colorIndex, i, j) {
    var myColor = this.state.grid[i][j];
    if (myColor === colorIndex) {
      return
    }
    this.updateCell(colorIndex, i, j);
    this._colorFill(myColor, colorIndex, i-1,j)
    this._colorFill(myColor, colorIndex, i,j+1)
    this._colorFill(myColor, colorIndex, i+1,j)
    this._colorFill(myColor, colorIndex, i,j-1)
  }

  incrementCount() {
    this.setState({
      count: this.state.count + 1
    });
  }

  restart() {
    this.setState({
      grid: this.newGrid(this.state.size, this.state.colors),
      count: 0
    });
  }

  sliderInput(value) {
    this.setState({
      size: value,
      grid: this.newGrid(value, this.state.colors),
      count: 0
    });
  }

  render() {
    return (
      <div className="content">
        <div className="header">
          <h1>Color Flood</h1>
          <div className="newgame" onClick={(e) => this.restart()}>New Game</div>
          <div className="count">Changes <span>{this.state.count}</span></div>
        </div>
{/*        <div className="sizeChanger">
          <span className="size-value">{this.state.size}</span>
          <input
            type="range"
            value={this.state.size}
            min={MIN}
            max={MAX}
            step="1"
            onChange={(e) => this.sliderInput(e.target.value)} />
        </div>*/}
          <div><ColorPickers colors={this.state.colors} clickHandler={this.colorFill} incrementCount={this.incrementCount}/></div>
        <Grid grid={this.state.grid} colors={this.state.colors} size={this.state.size}/>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import Grid from './components/Grid/Grid';
import ColorPickers from './components/ColorPickers/ColorPickers';
import Counter from './components/Counter/Counter';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [
        [1,0,1,2,3],
        [2,2,1,1,0],
        [3,1,0,3,1],
        [0,1,2,3,1],
        [1,3,3,2,1],
      ],
      colors: ['blue','red','green','yellow'],
      count: 0,
    }
    this.incrementCount = this.incrementCount.bind(this);
    this.colorFill = this.colorFill.bind(this);
    this.updateCell = this.updateCell.bind(this);
    this._colorFill = this._colorFill.bind(this);
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

  render() {
    return (
      <div>
        <h1>Color Fill</h1>
        <div className="count">Number of clicks: <Counter count={this.state.count} /></div>
        <div><ColorPickers colors={this.state.colors} clickHandler={this.colorFill} incrementCount={this.incrementCount}/></div>
        <Grid width="5" height="5" grid={this.state.grid} colors={this.state.colors} />
      </div>
    );
  }
}

export default App;

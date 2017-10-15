import React, { Component } from 'react';
import Grid from './components/Grid/Grid';
import ColorPickers from './components/ColorPickers/ColorPickers';
import { Graph } from './Graph';

import './index.css';

const SIZE = 12;
const COLORS = ['blue','red','green','yellow','orange'];

class App extends Component {
  constructor(props) {
    super(props);
    this.incrementCount = this.incrementCount.bind(this);
    // this.sliderInput = this.sliderInput.bind(this);
    this.restart = this.restart.bind(this);
    this.colorFill = this.colorFill.bind(this);
    this.state = {
      size: SIZE,
      graph: new Graph(SIZE),
      colors: COLORS,
      count: 0,
      isFinished: false
    }
  }

  incrementCount() {
    this.setState({
      count: this.state.count + 1
    });
  }

  checkWinCondition() {
    if(this.isGridComplete()) {
      this.setState({isFinished: true})
    }
  }


  isGridComplete() {
    const grid = this.state.graph.nodes
    const remainingColors = Object.keys(grid).map(cell=> grid[cell].color).filter(function() {
      var seen = {};
      return (element, index, array) => {
        return !(element in seen) && (seen[element] = 1);
      };
    }())
    return remainingColors.length === 1;
  }

  restart() {
    this.setState({
      graph: new Graph(this.state.size),
      count: 0,
      isFinished: false
    });
  }

  // sliderInput(value) {
  //   this.setState({
  //     size: value,
  //     graph: this.newGrid(value, this.state.colors),
  //     count: 0
  //   });
  // }

  colorFill(color) {
    const currColor = this.state.graph.nodes['0'].color;
    const colorIdx = this.state.colors.indexOf(color)
    if(currColor !== colorIdx && !this.state.isFinished) {
      this.state.graph.colorFill(colorIdx);
      this.incrementCount();
      this.checkWinCondition();
    }
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
          <div>
            <ColorPickers 
              colors={this.state.colors} 
              clickHandler={this.colorFill} 
              incrementCount={this.incrementCount}
            />
          </div>
        <Grid 
          grid={this.state.graph} 
          colors={this.state.colors} 
          clickHandler={this.colorFill} 
          size={this.state.size}
          isFinished={this.state.isFinished}
          count={this.state.count}
        />
      </div>
    );
  }
}

export default App;

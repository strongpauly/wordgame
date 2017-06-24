import React, { Component } from 'react';
import Cell from './Cell';
import PropTypes from 'prop-types';
import WordSet from './model/WordSet';
import WordList from './WordList';

export default class Game extends Component {

  static propTypes = {
    onRestart: PropTypes.func,
    size: PropTypes.number
  }

  constructor(props) {
    super(props);
    this.words = new WordSet(this.props.size);
    this.state = {
      completed: false,
      selected: [],
      selecting: false
    };
  }

  getCellKey(x, y) {
    return x + ',' + y;
  }

  getCellCoord(key) {
    let split = key.split(',');
    return {x:parseInt(split[0], 10), y: parseInt(split[1], 10)};
  }

  startTimer() {
    if(!this.timerId) {
      this.setState({time: 1});
      this.timerId = setInterval(() => {
        this.setState((previousState) => ({
          time:previousState.time + 1
        }));
      }, 1000);
    }
  }

  stopTimer() {
    if(this.timerId) {
      clearInterval(this.timerId);
    }
  }

  componentWillUnmount() {
    this.stopTimer();
    window.removeEventListener('mouseup', this.onSelectEnd);
  }

  restart = () => {
    this.props.onRestart();
  }

  reset = () => {
    this.words.clearFound();
    this.setState({
      selected: []
    });
  }

  hasWon() {
    return false;
  }

  adjacentToLast(x, y, last) {
    return last === undefined
      || (x === last.x + 1 && y === last.y)
      || (x === last.x - 1 && y === last.y)
      || (x === last.x && y === last.y - 1)
      || (x === last.x && y === last.y + 1);
  }

  onSelectStart = (x, y, char) => {
    window.addEventListener('mouseup', this.onSelectEnd, false);
    this.setState({
      selecting:true,
      selected: [{x, y, char}]
    });
  }

  onSelectOver = (x, y, char) => {
    if(this.state.selecting) {
      const last = this.state.selected[this.state.selected.length - 1];
      const selected = this.isCellSelected(x, y);
      if(!selected && this.adjacentToLast(x, y, last)) {
        this.setState({
          selected: this.state.selected.concat({x, y, char})
        });
      } else if(this.state.selected.length > 1) { //Check for moving backwards.
        const penultimate = this.state.selected[this.state.selected.length - 2];
        if(penultimate.x === x && penultimate.y === y) {
          this.setState({
            selected: this.state.selected.slice(0, -1)
          });
        }
      }
    }
  }

  onSelectOut = (/*x, y, char*/) => {

  }

  isCellSelected(x, y) {
    return this.state.selected.filter(cell => cell.x === x && cell.y === y).length > 0;
  }

  onSelectEnd = () => {
    if(this.state.selecting) {
      let word = this.state.selected.map(cell => cell.char).join('');
      if (this.words.isWord(word) && !this.words.isFound(word)) {
        this.words.setWordFound(word, this.state.selected.map(cell => this.getCellKey(cell.x, cell.y)));
      }
      this.setState({
        selected: [],
        selecting: false
      });
      window.removeEventListener('mouseup', this.onSelectEnd);
    }
  }

  render() {
    let widthArray = new Array(this.words.width).fill();
    let heightArray = new Array(this.words.height).fill();
    let cells = heightArray.map((emptyY, y) => {
      let row = widthArray.map((emptyX, x) => {
        let key = this.getCellKey(x, y);
        let char = this.words.getCharAt(x, y);
        // if(char === undefined) {
        //   return;
        // }
        return <Cell key={key} x={x} y={y} char={char}
          selected={this.isCellSelected(x, y)}
          selecting={this.state.selecting}
          used={this.words.isUsed(x, y)}
          onSelectStart={this.onSelectStart}
          onSelectOver={this.onSelectOver}
          onSelectOut={this.onSelectOut}
          onSelectEnd={this.onSelectEnd}></Cell>;
      }).filter(cell => cell !== undefined);
      if(row.length === 0){
        return;
      }
      return <div className="row" key={'row' + y}>{row}</div>;
    });
    return <div className="gridContainer">
            <div>
                <div className="header">
                    <div className="timer">{this.state.time || ' '}</div>
                    <div className="status" onClick={this.reset}>Reset</div>
                </div>
                <div className={this.state.completed ? 'grid completed' : 'grid'}>
                  {cells}
                </div>
            </div>
            <div className="characters">{this.state.selected.map(cell => cell.char).join('')}</div>
            <WordList wordSet={this.words} />
        </div>;
  }
}

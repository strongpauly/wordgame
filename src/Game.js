import React, { Component } from 'react';
import Cell from './Cell';
import PropTypes from 'prop-types';
import WordList from './WordList';

export default class Game extends Component {

  static propTypes = {
    onRestart: PropTypes.func,
    words: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.state = {
      completed: false,
      selected: [],
      selecting: false,
      hinting: [],
      hintNumber: 0,
      canComplete: true
    };
  }

  getCellKey(x, y) {
    return x + ',' + y;
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
    clearInterval(this.timerId);
  }

  componentWillUnmount() {
    this.stopTimer();
    window.removeEventListener('mouseup', this.onSelectEnd);
  }

  restart = () => {
    this.props.onRestart();
  }

  reset = () => {
    this.props.words.clearFound();
    this.setState({
      selected: [],
      canComplete: true
    });
  }

  showHint = () => {
    this.props.words.words.some( word => {
      if(!this.props.words.isFound(word)) {
        this.setState({
          hinting: this.props.words.getCoords(word),
          hintNumber: this.state.hintNumber + 1
        });
        return true;
      }
      return false;
    });
  }

  hasWon() {
    return this.props.words.foundAll();
  }

  adjacentToLast(x, y, last) {
    return (x === last.x + 1 && y === last.y)
      || (x === last.x - 1 && y === last.y)
      || (x === last.x && y === last.y - 1)
      || (x === last.x && y === last.y + 1);
  }

  onSelectStart = (x, y, char) => {
    this.startTimer();
    window.addEventListener('mouseup', this.onSelectEnd, false);
    this.setState({
      selecting: true,
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

  isCellSelected(x, y) {
    return this.state.selected.filter(cell => cell.x === x && cell.y === y).length > 0;
  }

  onSelectEnd = () => {
    let word = this.state.selected.map(cell => cell.char).join('');
    if (this.props.words.isWord(word) && !this.props.words.isFound(word)) {
      this.props.words.setWordFound(word, this.state.selected.map(cell => this.getCellKey(cell.x, cell.y)));
    }
    const completed = this.hasWon();
    if(completed) {
      this.stopTimer();
    }
    this.setState({
      selected: [],
      hinting: [],
      selecting: false,
      completed: completed,
      canComplete: this.props.words.canComplete()
    });
    window.removeEventListener('mouseup', this.onSelectEnd);
  }

  render() {
    let widthArray = new Array(this.props.words.width).fill();
    let heightArray = new Array(this.props.words.height).fill();
    let cells = heightArray.map((emptyY, y) => {
      let row = widthArray.map((emptyX, x) => {
        let key = this.getCellKey(x, y);
        let char = this.props.words.getCharAt(x, y);
        return <Cell key={key} x={x} y={y} char={char}
          selected={this.isCellSelected(x, y)}
          selecting={this.state.selecting}
          used={this.props.words.isUsed(x, y)}
          hinting={this.state.hinting.filter(coord => coord.x === x && coord.y === y).length > 0}
          hintNumber={this.state.hintNumber}
          onSelectStart={this.onSelectStart}
          onSelectOver={this.onSelectOver}
          onSelectOut={this.onSelectOut}
          onSelectEnd={this.onSelectEnd}></Cell>;
      });
      return <div className="row" key={'row' + y}>{row}</div>;
    });
    let resetClassName = 'reset clickable status';
    if(!this.state.canComplete) {
      resetClassName += ' spinning';
    }
    return <div className="gridContainer">
      <div>
        <div className="header">
          <div className="clickable restart" onClick={this.restart}>+</div>
          <div className={resetClassName} onClick={this.reset}>♺</div>
          <div className="clickable showHint" onClick={this.showHint}>?</div>
          <div className="timer">{this.state.time || ' '}</div>
        </div>
        <div className={this.state.completed ? 'grid completed' : 'grid'}>
          {cells}
        </div>
      </div>
      <div className="characters">{this.state.selected.map(cell => cell.char).join('')}</div>
      <WordList wordSet={this.props.words} />
    </div>;
  }
}

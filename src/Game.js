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
      selecting: false,
      hinting: [],
      hintNumber: 0,
      correctLetters: true
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
      selected: [],
      correctLetters: true
    });
  }

  showHint = () => {
    this.words.words.some( word => {
      if(!this.words.isFound(word)) {
        this.setState({
          hinting: this.words.getCoords(word),
          hintNumber: this.state.hintNumber + 1
        });
        return true;
      }
    });
  }

  hasWon() {
    return this.words.foundAll();
  }

  adjacentToLast(x, y, last) {
    return last === undefined
      || (x === last.x + 1 && y === last.y)
      || (x === last.x - 1 && y === last.y)
      || (x === last.x && y === last.y - 1)
      || (x === last.x && y === last.y + 1);
  }

  onSelectStart = (x, y, char) => {
    this.startTimer();
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

  isCellSelected(x, y) {
    return this.state.selected.filter(cell => cell.x === x && cell.y === y).length > 0;
  }

  onSelectEnd = () => {
    if(this.state.selecting) {
      let word = this.state.selected.map(cell => cell.char).join('');
      let correctLetters = this.state.correctLetters;
      if (this.words.isWord(word) && !this.words.isFound(word)) {
        this.words.setWordFound(word, this.state.selected.map(cell => this.getCellKey(cell.x, cell.y)));
        let correctCoords = this.words.getCoords(word);
        correctLetters = correctLetters && this.state.selected.reduce( (correct, cell, index) => {
          let correctCoord = correctCoords[index];
          return correct && cell.x === correctCoord.x && cell.y === correctCoord.y;
        }, true);
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
        correctLetters: correctLetters
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
        return <Cell key={key} x={x} y={y} char={char}
          selected={this.isCellSelected(x, y)}
          selecting={this.state.selecting}
          used={this.words.isUsed(x, y)}
          hinting={this.state.hinting.filter(coord => coord.x === x && coord.y === y).length > 0}
          hintNumber={this.state.hintNumber}
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
    let resetClassName = 'clickable status';
    if(!this.state.correctLetters) {
      resetClassName += ' spinning';
    }
    return <div className="gridContainer">
            <div>
                <div className="header">
                    <div className="clickable" onClick={this.restart}>+</div>
                    <div className={resetClassName} onClick={this.reset}>♺</div>
                    <div className="clickable" onClick={this.showHint}>?</div>
                    <div className="timer">{this.state.time || ' '}</div>
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

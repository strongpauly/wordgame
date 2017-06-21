import React, { Component } from 'react';
import Cell from './Cell';
import PropTypes from 'prop-types';

export default class Game extends Component {

  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    onRestart: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {
      completed: false
    };

    this.restart = this.restart.bind(this);
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
  }

  onCheck(cellX, cellY) {
    if(!this.state.completed) {
      this.startTimer();
      let key = this.getCellKey(cellX, cellY);
      if(this.state.mines.has(key)) {
        this.setState({exploded:true, completed:true});
        this.stopTimer();
      } else {
        this.doCheck(key);
        if(this.hasWon()) {
          this.setState({completed:true});
          this.stopTimer();
        }
        this.setState({
          checked: this.state.checked,
          marked: this.state.marked
        });
      }
    }
  }

  restart() {
    this.props.onRestart();
  }

  hasWon() {
    return false;
  }

  render() {
    let widthArray = new Array(this.props.width).fill();
    let heightArray = new Array(this.props.height).fill();
    let cells = heightArray.map((emptyY, y) => {
      let row = widthArray.map((emptyX, x) => {
        let key = this.getCellKey(x, y);
        return <Cell key={key} x={x} y={y} char="C"></Cell>;
      });
      return <tr className="row" key={'row' + y}>{row}</tr>;
    });
    return <div className="gridContainer">
            <div>
                <div className="header">
                    <div className="timer">{this.state.time || ' '}</div>
                </div>
                <table className={this.state.completed ? 'grid completed' : 'grid'}>
                    <tbody>{cells}</tbody>
                </table>
            </div>
        </div>;
  }
}

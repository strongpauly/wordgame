import React, { Component } from 'react';
import './App.css';

import Game from './Game';
import propTypes from 'prop-types';
import WordSet from './words/WordSet';

export default class App extends Component {

  static propTypes = {
    size: propTypes.number
  }

  constructor(props) {
    super(props);
    this.restart = this.restart.bind(this);
    this.state = {
      gameId: 0,
      words: new WordSet()
    };
  }

  restart() {
    this.setState({gameId: this.state.gameId + 1, words: new WordSet()});
  }

  render() {
    return (
      <div className="App">
        <Game key={this.state.gameId}
          gameId={this.state.gameId}
          onRestart={this.restart}
          words={this.state.words}></Game>
      </div>
    );
  }
}

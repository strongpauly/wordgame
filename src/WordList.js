import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './WordList.css';

export default class WordList extends Component {

  static propTypes = {
    wordSet: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
  }

  render() {
    return <div className="wordList">{
      this.props.wordSet.words.map( (word, wordIndex) => {
        let wordFound = this.props.wordSet.isFound(word);
        return <div key={wordIndex} className="wordBox">{
            word.split('').map( (char, charIndex) => {
              return <div key={wordIndex + '-' + charIndex} className="charBox">{
                wordFound ? char : ' '
              }</div>;
            })
        }</div>;
      })
    }</div>;
  }
}

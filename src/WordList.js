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

  charBoxes(word, wordIndex, wordFound) {
    return word.split('').map( (char, charIndex) => {
      return <div key={wordIndex + '-' + charIndex} className="charBox">{
        wordFound ? char : ' '
      }</div>;
    });
  }

  render() {
    return <div className="wordList">{
      this.props.wordSet.words.map( (word, wordIndex) => {
        const wordFound = this.props.wordSet.isFound(word);
        let content = this.charBoxes(word, wordIndex, wordFound);
        if(wordFound) {
          content = <a href={`http://www.dictionary.com/browse/${word.toLowerCase()}`} rel='noopener noreferrer' target='_blank'>{content}</a>;
        }
        return <div key={wordIndex} className="wordBox">{content}</div>;
      })
    }</div>;
  }
}

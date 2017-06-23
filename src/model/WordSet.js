
import wordGenerator from './wordGenerator';
import generateGrid from '../lib/generateGrid/generateGrid';

export default class WordSet {

  constructor(size = 6, minWordLength = 3, maxWordLength = 8) {
    this.size = size;
    this.words = wordGenerator(size * size, minWordLength, maxWordLength).map( word => word.toUpperCase());
    console.log(this.words);
    this.found = new Set();
    this.wordMap = new Map();
    this.grid = generateGrid(this.words, this.size, this.size);
  }

  getCharAt(x, y) {
    return this.grid[x][y];
  }

  isWord(word) {
    return this.words.indexOf(word) !== -1;
  }

  setFound(word) {
    this.found.add(word);
  }

  isFound(word) {
    return this.isWord(word) && this.found.has(word);
  }

  get width() {
    return this.grid.length;
  }

  get height() {
    return this.grid.reduce( (max, column) => Math.max(max, column.length), 0);
  }
}

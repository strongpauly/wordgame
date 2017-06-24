
import wordGenerator from './wordGenerator';
import generateGrid from '../lib/generateGrid/generateGrid';

export default class WordSet {

  constructor(size = 6, minWordLength = 3, maxWordLength = 8) {
    this.size = size;
    this.words = wordGenerator(size * size, minWordLength, maxWordLength).map( word => word.toUpperCase());
    this.clearFound();
    this.grid = generateGrid(this.words, this.size, this.size);
  }

  getCharAt(x, y) {
    if(this.usedCells.has( x + ',' + y))
      return;
    return this.grid[x][y];
  }

  isWord(word) {
    return this.words.indexOf(word) !== -1;
  }

  setWordFound (word, keys) {
    this.found.add(word);
    keys.forEach( key => {
      this.usedCells.add(key);
    });
  }

  isFound(word) {
    return this.isWord(word) && this.found.has(word);
  }

  clearFound() {
    this.found = new Set();
    this.usedCells = new Set();
  }

  get width() {
    return this.grid.length;
  }

  get height() {
    return this.grid.reduce( (max, column) => Math.max(max, column.length), 0);
  }
}

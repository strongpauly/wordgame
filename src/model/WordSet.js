
import wordGenerator from './wordGenerator';
import generateGrid from '../lib/generateGrid/generateGrid';

export default class WordSet {

  constructor(size = 6, minWordLength = 3, maxWordLength = 8) {
    this.size = size;
    this.words = wordGenerator(size * size, minWordLength, maxWordLength).map( word => word.toUpperCase());
    this.clearFound();
    this.grid = generateGrid(this.words, this.size, this.size);
    this.gridArray = this.grid.toArray();
  }

  isUsed(x, y) {
    return this.usedCells.has(x + ',' + y);
  }

  getCharAt(x, y) {
    return this.gridArray[x][y];
  }

  isWord(word) {
    return this.words.indexOf(word) !== -1;
  }

  setWordFound(word, keys) {
    this.found.add(word);
    keys.forEach( key => {
      this.usedCells.add(key);
    });
  }

  isFound(word) {
    return this.isWord(word) && this.found.has(word);
  }

  //Get a list of x, y coordinates of where this word is shown in the grid.
  getCoords(word) {
    return this.grid.getWordCoords(word);
  }

  foundAll() {
    return this.found.size === this.words.length;
  }

  clearFound() {
    this.found = new Set();
    this.usedCells = new Set();
  }

  get width() {
    return this.grid.width;
  }

  get height() {
    return this.grid.height;
  }

  /**
   * @return Whether all words can still be found within the grid.
   */
  canComplete() {
    //Out of all the words left to find.
    return this.words.filter( word => !this.found.has(word) ).every( leftToFind => {
      //Can we find a single path
      return this.grid.findPath(leftToFind).some( path => {
        //That has all of it's coordinates unused.
        return path.every(coord => {
          return !this.isUsed(coord.x, coord.y);
        });
      });
    });
  }
}

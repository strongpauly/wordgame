
export default class WordSet {

  constructor() {
    this.words = ['KILLER', 'RESALE', 'HORROR', 'MIRROR', 'GOOGLE', 'HANDED'];
    this.grid = this.words.map( word => word.split(''));
  }

  getCharAt(x, y) {
    return this.grid[x][y];
  }

  isWord(word) {
    return this.words.indexOf(word) !== -1;
  }
}


import findPossible from './findPossible';

export default class Grid {
  constructor (width, height) {
    //Initialise with empty array of correct sizes - todo will have to change this to map better.
    this.cells = new Array(width).fill().map( () => new Array(height).fill());
    this.width = width;
    this.height = height;
    this.wordCoords = new Map();
  }

  isFull() {
    return this.cells.reduce((previous, column) => column.filter(cell => cell === undefined).length === 0 && previous, true);
  }

  clone() {
    let grid = new Grid(this.width, this.height);
    grid.cells = this.cells.map( column => column.map( cell => cell));
    return grid;
  }

  set(x, y, char) {
    this.cells[x][y] = char;
  }

  isCellEmpty(x, y) {
    return this.cells[x][y] === undefined;
  }

  toArray() {
    return this.cells.map( column => column.concat() );
  }

  /**
   * Returns an array of coordinates which are currently empty within the Grid.
   */
  getEmptyCoords() {
    let coords = [];
    this.cells.forEach( (column, x) => {
      column.forEach( (cell, y) => {
        if(cell === undefined) {
          coords.push({x, y});
        }
      });
    });
    return coords;
  }

  /**
   * @return all possible paths to connect a word through the grid.
   */
  findPath(word) {
    const firstChar = word.charAt(0);
    //Start by searching entire grid for starting character.
    const paths = this.cells.reduce( (starts, column, x) => {
      return starts.concat(column.reduce( (cells, char, y) => {
        if(char === firstChar) {
          cells.push(new Path(x, y, word));
        }
        return cells;
      }, []));
    }, []);
    const results = [];
    //Next check paths for next characters, potentially spawning new paths to check.
    while(paths.length > 0) {
      let path = paths.pop();
      for(let i=path.path.length; i<path.charsToFind.length; i++) {
        const nextChar = path.getNextCharToFind();
        let nextCoords = findPossible(path.x, path.y, this.width, this.height)
                    .filter(coord => this.cells[coord.x][coord.y] === nextChar && path.canMoveTo(coord.x, coord.y));
        if(nextCoords.length === 0) {
          break; //Dead end.
        } else {
          if(nextCoords.length > 1) {
            for(let j = 1; j<nextCoords.length; j++) {
              const newPath = path.clone();
              newPath.setNextChar(nextCoords[j].x, nextCoords[j].y);
              paths.push(newPath);
            }
          }
          path.setNextChar(nextCoords[0].x, nextCoords[0].y);
        }
      }
      if(path.isComplete()) {
        results.push(path.path);
      }
    }
    return results;
  }

  //TODO: This is a hack to enable easy calculation if correct coordinates have been used
  //to find words.  Replace with search method.
  setWordCoords(word, coords) {
    this.wordCoords.set(word, coords);
  }

  getWordCoords(word, coords) {
    return this.wordCoords.get(word, coords);
  }
}

class Path {
  constructor(startX, startY, word) {
    this.path = [];
    this.word = word;
    this.charsToFind = word.split('');
    this.usedCoords = new Set();
    this.setNextChar(startX, startY);
  }

  setNextChar(x, y) {
    this.path.push({x, y});
    this.usedCoords.add(x+ ',' + y);
  }

  canMoveTo(x, y) {
    return !this.usedCoords.has(x + ',' + y);
  }

  isComplete() {
    return this.path.length === this.charsToFind.length;
  }

  getNextCharToFind() {
    return this.charsToFind[this.path.length];
  }

  clone() {
    let path = new Path(this.path[0].x, this.path[0].y, this.word);
    for (let i = 1; i<this.path.length; i++) {
      path.setNextChar(this.path[i].x, this.path[i].y);
    }
    return path;
  }

  get x () {
    return this.path[this.path.length - 1].x;
  }

  get y () {
    return this.path[this.path.length - 1].y;
  }
}

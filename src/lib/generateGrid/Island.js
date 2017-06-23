

export default class Island {
  constructor (width, height) {
    //Initialise with empty array of correct sizes - todo will have to change this to map better.
    this.cells = new Array(width).fill().map( () => new Array(height).fill());
    this.width = width;
    this.height = height;
  }

  isFull() {
    return this.cells.reduce((previous, column) => column.filter(cell => cell === undefined).length === 0 && previous, true);
  }

  clone() {
    let island = new Island(this.width, this.height);
    island.cells = this.cells.map( column => column.map( cell => cell));
    return island;
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
   * Returns an array of coordinates which are currently empty within the Island.
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
}


import randomNumberWithRange from 'random-number-with-range';

import Island from './Island';

export default function generateGrid(words, width, height = width) {
  //Check that size can hold words
  if ((width * height) < words.reduce((count, word) => word.length + count, 0)) {
    throw new Error(`A grid of ${width} by ${height} cannot contain the words ${words}`);
  }

  //Initialise empty 2d grid.
  let grid = new Island(width, height);

  function tryWord(word, island) {
    //Randomly pick first character position
    let x = randomNumberWithRange(0, width, true);
    let y = randomNumberWithRange(0, height, true);

    word.split('').forEach( char => {
      island.set(x, y, char);
      let coord = move(x, y, island);
      if (coord) { //If grid is full we've finished.
        x = coord.x;
        y = coord.y;
      }
    });
  }

  function isValidCoord(x, y) {
    return x >= 0 && y >= 0 && x < width && y < height;
  }

  function move(x, y, island) {
    let possible = [
      {x: x, y: y - 1},
      {x: x, y: y + 1},
      {x: x - 1, y: y},
      {x: x + 1, y: y}
    ].filter( coord => isValidCoord(coord.x, coord.y));
    // console.log('possible within bounds', possible);
    possible = possible.filter( coord => island.isCellEmpty(coord.x, coord.y));
    // console.log('possible empty within bounds', possible);
    return possible[Math.floor(Math.random() * possible.length)];
  }
  words.sort( (a, b) => b.length - a.length);
  while(!grid.isFull()) {
    //Randomly try all possibilities to fit the words in!
    let island = grid.clone();
    words.forEach( word => {
      tryWord(word, island);
    });
    if(island.isFull()) {
      grid = island;
    }
  }
  return grid.toArray();
}

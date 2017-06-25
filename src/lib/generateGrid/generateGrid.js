
import Grid from './Grid';

export default function generateGrid(words, width, height = width) {
  //Check that size can hold words
  if ((width * height) < words.reduce((count, word) => word.length + count, 0)) {
    throw new Error(`A grid of ${width} by ${height} cannot contain the words ${words}`);
  }

  //Initialise empty 2d grid.
  let grid = new Grid(width, height);

  function tryWord(word, grid) {
    //Randomly pick first character position
    const emptyPositions = grid.getEmptyCoords();
    const firstCoord = emptyPositions[Math.floor(Math.random() * emptyPositions.length)];
    if(firstCoord === undefined) {
      return false;
    }
    let x = firstCoord.x;
    let y = firstCoord.y;
    const coords = [firstCoord];
    word.split('').forEach( (char, index) => {
      grid.set(x, y, char);
      coords.push({x, y});
      if(index < word.length) {
        let coord = move(x, y, grid);
        if (coord) {
          x = coord.x;
          y = coord.y;
        } else { //We can't fit the word in.
          return;
        }
      }
    });
    return coords;
  }

  function isValidCoord(x, y) {
    return x >= 0 && y >= 0 && x < width && y < height;
  }

  function move(x, y, grid) {
    let possible = [
      {x: x, y: y - 1},
      {x: x, y: y + 1},
      {x: x - 1, y: y},
      {x: x + 1, y: y}
    ].filter( coord => isValidCoord(coord.x, coord.y));
    // console.log('possible within bounds', possible);
    possible = possible.filter( coord => grid.isCellEmpty(coord.x, coord.y));
    // console.log('possible empty within bounds', possible);
    return possible[Math.floor(Math.random() * possible.length)];
  }
  const sortedWords = words.concat();
  sortedWords.sort( (a, b) => b.length - a.length );

  let iterationCount = 0;
  while(!grid.isFull()) {
    //Randomly try all possibilities to fit the words in!
    const newGrid = grid.clone();
    sortedWords.some( word => {
      let coords = tryWord(word, newGrid);
      newGrid.setWordCoords(word, coords);
      //If the word did't fit, this iteration is a dead end, restart.
      return coords === undefined;
    });

    if(newGrid.isFull()) {
      grid = newGrid;
    }
    iterationCount ++;
  }
  console.log(`Took ${iterationCount} attempts to find a solution`, words);
  return grid;
}

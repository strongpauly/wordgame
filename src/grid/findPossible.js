/**
 * @return an array of possible adjacent coordinates filtered by the size of the grid.
 */
export default function findPossible(x, y, width, height) {
  return [
     {x, y: y - 1},
     {x, y: y + 1},
     {x: x - 1, y},
     {x: x + 1, y}
  ].filter( coord => isValidCoord(coord.x, coord.y, width, height));
}

function isValidCoord(x, y, width, height) {
  return x >= 0 && y >= 0 && x < width && y < height;
}

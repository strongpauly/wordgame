/* eslint-env jest */
import generateGrid from './generateGrid';

describe('generateGrid', () => {

  it('will throw an error if try to fit words into a grid too small', () => {
    let width = 1, height = 1;
    let words = ['NOPE'];
    expect(() => generateGrid(words, width, height)).toThrowError(`A grid of ${width} by ${height} cannot contain the words ${words}`);
  });

  it('will wrap a single 4 letter word around a 2 x 2 grid' , () => {
    let grid = generateGrid(['FOUR'], 2);
    let gridString = grid.reduce( (s, row) => {
      return s + row.join('');
    }, '');
    expect(gridString).toContain('F');
    expect(gridString).toContain('O');
    expect(gridString).toContain('U');
    expect(gridString).toContain('R');
  });

  it('will wrap a single 9 letter word around a 3 x 3 grid' , () => {
    let grid = generateGrid(['SWIZZLERS'], 3);
    let gridString = grid.reduce( (s, row) => {
      return s + row.join('');
    }, '');
    expect(gridString.split('').filter( c => c === 'S')).toHaveLength(2);
    expect(gridString).toContain('W');
    expect(gridString).toContain('I');
    expect(gridString.split('').filter( c => c === 'Z')).toHaveLength(2);
    expect(gridString).toContain('L');
    expect(gridString).toContain('E');
    expect(gridString).toContain('R');
  });

  it('will wrap two 2 letter words around a 2 x 2 grid' , () => {
    let grid = generateGrid(['ON', 'IT'], 2, 2);
    let gridString = grid.reduce( (s, row) => {
      return s + row.join('');
    }, '');
    expect(gridString).toContain('O');
    expect(gridString).toContain('N');
    expect(gridString).toContain('I');
    expect(gridString).toContain('T');
  });

  it('will wrap three 3 letter words around a 3 x 3 grid' , () => {
    let grid = generateGrid(['GAP', 'ODE', 'HIT'], 3);
    let gridString = grid.reduce( (s, row) => {
      return s + row.join('');
    }, '');
    expect(gridString).toContain('G');
    expect(gridString).toContain('A');
    expect(gridString).toContain('P');
    expect(gridString).toContain('O');
    expect(gridString).toContain('D');
    expect(gridString).toContain('E');
    expect(gridString).toContain('H');
    expect(gridString).toContain('I');
    expect(gridString).toContain('T');
  });

  function canConnectWord(grid, word, x, y) {
    function getChar(x, y) {
      return grid[x] ? grid[x][y] : undefined;
    }
    if(word.length <= 1) {
      return true;
    }
    let c = word.charAt(1);
    // console.log(word.charAt(0), 'is at', x, y, 'looking for', c);
    let up = getChar(x, y-1) === c;
    let down = getChar(x, y+1) === c;
    let left = getChar(x-1, y) === c;
    let right = getChar(x+1, y) === c;
    let all = [up, down, left, right];
    //None equal.
    if(all.filter( value => value ).length === 0) {
      return false;
    } else {
      let newWord = word.substring(1);
      //Need to check all possible avenues as may branch.
      return all.filter( (isMatch, index) => {
        if(!isMatch) {
          return false;
        }
        let newX;
        let newY;
        if(index <= 1){ // up or down
          newX = x;
          if(index === 0) {
            newY = y-1;
          } else {
            newY = y+1;
          }
        } else {
          newY = y;
          if(index === 2) { //left
            newX = x - 1;
          } else {
            newX = x + 1;
          }
        }
        return canConnectWord(grid, newWord, newX, newY);
      }).length > 0;
    }
  }

  function canConnectWordFromFirstCharacter(grid, word) {
    let char = word.charAt(0);
    let x = grid.findIndex( row => row.some( cell => cell === char) );
    if(x === undefined || grid[x] === undefined) {
      return false;
    }
    return canConnectWord(grid, word, x, grid[x].findIndex( cell => cell === char));
  }

  expect.extend({
    toConnectWord(grid, word) {
      const pass = canConnectWordFromFirstCharacter(grid, word);
      let gridString = grid.map( column => column.join('') + '\n');
      if (pass) {
        return {
          message: () => (
            `expected to be able to connect ${word} in grid \n ${gridString}`
          ),
          pass: true,
        };
      } else {
        return {
          message: () => (`expected to be able to connect ${word} in grid \n ${gridString}`),
          pass: false,
        };
      }
    }
  });

  it('will fit six 6 letter words in a 6 x 6 grid' , () => {
    let words = ['BUZZED', 'HARMED', 'CAPPED', 'GENTLE', 'FINKED', 'YAPPED'];
    let grid = generateGrid(words, 6);
    words.forEach(word => {
      expect(grid).toConnectWord(word);
    });
  });
});

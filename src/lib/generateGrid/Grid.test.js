/* eslint-env jest */
import Grid from './Grid';

describe('Grid', () => {

  it('will report as not full when initalised' , () => {
    let grid = new Grid(2, 2);
    expect(grid.isFull()).toEqual( false );
  });

  it('will return empty coordinates' , () => {
    let grid = new Grid(2, 2);
    expect(grid.getEmptyCoords()).toHaveLength(4);
    grid.set(0, 0, 'A');
    expect(grid.getEmptyCoords()).toHaveLength(3);
  });

  it('will return empty coordinates' , () => {
    let grid = new Grid(2, 2);
    expect(grid.getEmptyCoords()).toHaveLength(4);
    grid.set(0, 0, 'A');
    expect(grid.getEmptyCoords()).toHaveLength(3);
  });

  it('will give all possible paths to connect a word' , () => {
    // A A A
    // B B B
    // C C C
    let grid = new Grid(3, 3);
    grid.set(0, 0, 'A');
    grid.set(0, 1, 'B');
    grid.set(0, 2, 'C');
    grid.set(1, 0, 'A');
    grid.set(1, 1, 'B');
    grid.set(1, 2, 'C');
    grid.set(2, 0, 'A');
    grid.set(2, 1, 'B');
    grid.set(2, 2, 'C');
    expect(grid.findPath('ABC')).toHaveLength(3);
    expect(grid.findPath('AAA')).toHaveLength(2);
    expect(grid.findPath('BBB')).toHaveLength(2);
    expect(grid.findPath('CCC')).toHaveLength(2);
  });

  it('will find paths for words that diverge' , () => {
    // A D E
    // B B B
    // C D C
    const grid = new Grid(3, 3);
    grid.set(0, 0, 'A');
    grid.set(0, 1, 'B');
    grid.set(0, 2, 'C');
    grid.set(1, 0, 'D');
    grid.set(1, 1, 'B');
    grid.set(1, 2, 'D');
    grid.set(2, 0, 'E');
    grid.set(2, 1, 'B');
    grid.set(2, 2, 'C');
    const paths = grid.findPath('ABBD');
    expect(paths).toHaveLength(2);
    expect(paths[0][0].x).toEqual(0);
    expect(paths[0][0].y).toEqual(0);
    expect(paths[1][0].x).toEqual(0);
    expect(paths[1][0].y).toEqual(0);
    expect(paths[0][1].x).toEqual(0);
    expect(paths[0][1].y).toEqual(1);
    expect(paths[1][1].x).toEqual(0);
    expect(paths[1][1].y).toEqual(1);
    expect(paths[0][2].x).toEqual(1);
    expect(paths[0][2].y).toEqual(1);
    expect(paths[1][2].x).toEqual(1);
    expect(paths[1][2].y).toEqual(1);
    const d1 = paths[0][3];
    const d2 = paths[1][3];
    expect(d1.x).toEqual(1);
    expect(d2.x).toEqual(1);
    if(d1.y === 0) { //Not sure which will be which.
      expect(d2.y).toEqual(2);
    } else {
      expect(d2.y).toEqual(0);
      expect(d1.y).toEqual(2);
    }
  });

});

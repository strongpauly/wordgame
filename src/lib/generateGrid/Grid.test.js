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
});

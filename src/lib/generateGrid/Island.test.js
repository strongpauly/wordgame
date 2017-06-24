/* eslint-env jest */
import Island from './Island';

describe('Island', () => {

  it('will report as not full when initalised' , () => {
    let island = new Island(2, 2);
    expect(island.isFull()).toEqual( false );
  });

  it('will return empty coordinates' , () => {
    let island = new Island(2, 2);
    expect(island.getEmptyCoords()).toHaveLength(4);
    island.set(0, 0, 'A');
    expect(island.getEmptyCoords()).toHaveLength(3);
  });
});
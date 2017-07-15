/* eslint-env jest */
import findPossible from './findPossible';

describe('findPossible', () => {

  it('will return 4 coordinates when in middle of grid', () => {
    const coords = findPossible(1, 1, 3, 3);
    expect(coords).toHaveLength(4);
    expect(coords.filter(coord => coord.x === 0 && coord.y === 1)).toHaveLength(1);
    expect(coords.filter(coord => coord.x === 2 && coord.y === 1)).toHaveLength(1);
    expect(coords.filter(coord => coord.x === 1 && coord.y === 0)).toHaveLength(1);
    expect(coords.filter(coord => coord.x === 1 && coord.y === 2)).toHaveLength(1);
  });

  it('won\'t return coordinates above grid', () => {
    const coords = findPossible(1, 0, 3, 3);
    expect(coords).toHaveLength(3);
    expect(coords.filter(coord => coord.x === 0 && coord.y === 0)).toHaveLength(1);
    expect(coords.filter(coord => coord.x === 2 && coord.y === 0)).toHaveLength(1);
    expect(coords.filter(coord => coord.x === 1 && coord.y === 1)).toHaveLength(1);
  });

  it('won\'t return coordinates below grid', () => {
    const coords = findPossible(1, 2, 3, 3);
    expect(coords).toHaveLength(3);
    expect(coords.filter(coord => coord.x === 0 && coord.y === 2)).toHaveLength(1);
    expect(coords.filter(coord => coord.x === 2 && coord.y === 2)).toHaveLength(1);
    expect(coords.filter(coord => coord.x === 1 && coord.y === 1)).toHaveLength(1);
  });

  it('won\'t return coordinates left of grid', () => {
    const coords = findPossible(0, 1, 3, 3);
    expect(coords).toHaveLength(3);
    expect(coords.filter(coord => coord.x === 0 && coord.y === 0)).toHaveLength(1);
    expect(coords.filter(coord => coord.x === 0 && coord.y === 2)).toHaveLength(1);
    expect(coords.filter(coord => coord.x === 1 && coord.y === 1)).toHaveLength(1);
  });

  it('won\'t return coordinates right of grid', () => {
    const coords = findPossible(2, 1, 3, 3);
    expect(coords).toHaveLength(3);
    expect(coords.filter(coord => coord.x === 2 && coord.y === 0)).toHaveLength(1);
    expect(coords.filter(coord => coord.x === 2 && coord.y === 2)).toHaveLength(1);
    expect(coords.filter(coord => coord.x === 1 && coord.y === 1)).toHaveLength(1);
  });
});

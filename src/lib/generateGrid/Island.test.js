/* eslint-env jest */
import Island from './Island';

describe('Island', () => {

  it('will report as not full when initalised' , () => {
    let island = new Island(2, 2);
    expect(island.isFull()).toEqual( false );
  });
});

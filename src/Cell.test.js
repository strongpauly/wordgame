import React from 'react';
import Cell from './Cell';
import {shallow} from 'enzyme';

/* eslint-env jest */

describe('<Cell>', () => {

  it('renders without crashing', () => {
    shallow(<Cell x={0} y={0} char="C"/>);
  });

  it('has "cell" css class', () => {
    const cell = shallow(<Cell x={0} y={0} char="C"/>);
    expect(cell).toMatchSnapshot();
    expect(cell.find('.cell')).toHaveLength(1);
  });
});

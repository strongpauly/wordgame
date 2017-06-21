import React from 'react';
import Cell from './Cell';
import {mount, shallow} from 'enzyme';

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

  it('click adds "selected" css class', () => {
    let table = mount(<table><tbody><tr><Cell x={0} y={0} char="C"/></tr></tbody></table>);
    expect(table.find('.selected')).toHaveLength(0);
    table.find('td').simulate('click');
    expect(table.find('.selected')).toHaveLength(1);
  });

});

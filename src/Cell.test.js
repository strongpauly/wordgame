import React from 'react';
import Cell from './Cell';
import {shallow, mount} from 'enzyme';
import sinon from 'sinon';

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

  it('fires select start onMouseDown', () => {
    const onSelectStart = sinon.spy();
    const cell = mount(<Cell x={0} y={0} char="C" onSelectStart={onSelectStart}/>);
    cell.find('.cell').simulate('mousedown');
    expect(onSelectStart.calledOnce).toEqual(true);
  });

  it('fires select over onMouseOver', () => {
    const onSelectOver = sinon.spy();
    const cell = mount(<Cell x={0} y={0} char="C" onSelectOver={onSelectOver}/>);
    cell.find('.cell').simulate('mouseover');
    expect(onSelectOver.calledOnce).toEqual(true);
  });

  it('fires select end onMouseUp', () => {
    const onSelectEnd = sinon.spy();
    const cell = mount(<Cell x={0} y={0} char="C" onSelectEnd={onSelectEnd}/>);
    const el = cell.find('.cell');
    el.simulate('mousedown');
    el.simulate('mouseup');
    expect(onSelectEnd.calledOnce).toEqual(true);
  });

  it('won\'t error if no handlers are applied', () => {
    const cell = mount(<Cell x={0} y={0} char="C"/>);
    const el = cell.find('.cell');
    el.simulate('mousedown');
    el.simulate('mouseover');
    el.simulate('mouseup');
  });

  it('won\'t fire handlers is cell is used', () => {
    const onSelectStart = sinon.spy();
    const onSelectOver = sinon.spy();
    const onSelectEnd = sinon.spy();
    const cell = mount(<Cell x={0} y={0} char="C" used={true}
      onSelectStart={onSelectStart} onSelectOver={onSelectOver} onSelectEnd={onSelectEnd}/>);
    const el = cell.find('.cell');
    el.simulate('mousedown');
    el.simulate('mouseover');
    el.simulate('mouseup');
    expect(onSelectStart.called).toEqual(false);
    expect(onSelectOver.called).toEqual(false);
    expect(onSelectEnd.called).toEqual(false);
  });

});

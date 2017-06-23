import React from 'react';
import Game from './Game';
import {shallow} from 'enzyme';

/* eslint-env jest */

describe('<Game>', () => {
  jest.useFakeTimers();
  it('renders without crashing', () => {
    shallow(<Game/>);
  });

  it('has header', () => {
    const game = shallow(<Game size={6}/>);
    expect(game.find('.header')).toHaveLength(1);
  });

  // it('creates grid based on size', () => {
  //   const game = shallow(<Game size={4}/>);
  //   expect(game.find('tr')).toHaveLength(2); //Height 2.
  //   expect(game.find('Cell')).toHaveLength(4); //Height 2 x Width 2.
  // });

  // it('has completed class when game is won', () => {
  //   const game = shallow(<Game width={1} height={1}/>);
  //   expect(game).toMatchSnapshot();
  //   const completed = game.find('.completed');
  //   expect(completed).toHaveLength(1);
  // });

  // it('will call restart handler when status button is clicked', () => {
  //   const onRestart = sinon.spy();
  //   const game = mount(<Game width={30} height={30} numMines={1} onRestart={onRestart}/>);
  //   game.find('.status').simulate('click');
  //   expect(onRestart.calledOnce).toEqual(true);
  // });

  // it('will update timer after game starts', () => {
  //   const game = mount(<Game width={3} height={3} numMines={2}/>);
  //   const timer = game.find('.header .timer');
  //   expect(timer).toHaveLength(1);
  //   expect(timer.text()).toEqual(' ');
  //   game.find('Cell td').at(0).simulate('contextMenu');
  //   expect(timer.text()).toEqual('1');
  //   jest.runTimersToTime(1000);
  //   expect(timer.text()).toEqual('2');
  // });
  //
  // it('wont update timer after game completed', () => {
  //   const game = mount(<Game width={1} height={1} numMines={1}/>);
  //   const timer = game.find('.header .timer');
  //   expect(timer.text()).toEqual(' ');
  //   game.find('Cell td').at(0).simulate('contextMenu');
  //   expect(timer.text()).toEqual(' ');
  //   jest.runTimersToTime(1000);
  //   expect(timer.text()).toEqual(' ');
  // });

});

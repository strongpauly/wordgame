import React from 'react';
import Game from './Game';
import {shallow} from 'enzyme';
import sinon from 'sinon';

import WordSet from './model/WordSet';

/* eslint-env jest */

describe('<Game>', () => {
  jest.useFakeTimers();
  it('renders without crashing', () => {
    shallow(<Game words={new WordSet()}/>);
  });

  it('has header', () => {
    const game = shallow(<Game size={6} words={new WordSet()}/>);
    expect(game.find('.header')).toHaveLength(1);
  });

  it('fires restart handler on header click', () => {
    const onRestart = sinon.spy();
    const game = shallow(<Game size={6} onRestart={onRestart} words={new WordSet()}/>);
    game.find('.restart').simulate('click');
    expect(onRestart.calledOnce).toEqual(true);
  });
});

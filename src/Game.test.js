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
  
});

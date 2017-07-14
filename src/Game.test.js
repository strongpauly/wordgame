import React from 'react';
import Game from './Game';
import {shallow, mount} from 'enzyme';
import sinon from 'sinon';

import WordSet from './model/WordSet';
import Grid from './lib/generateGrid/Grid';

/* eslint-env jest */

//Create a TestWordSet with set words.
class TestWordSet extends WordSet {
  constructor() {
    super();//Will generate words which we will overwrite.
    this.words = ['HELP', 'NOTE', 'FULL', 'DENT'];
    this.grid = new Grid(4, 4);
    this.words.forEach( (word, y) => {
      const wordCoords = [];
      word.split('').forEach( (char, x) => {
        this.grid.set(x, y, char);
        wordCoords.push({x, y});
      });
      this.grid.setWordCoords(word, wordCoords);
    });
    this.gridArray = this.grid.toArray();
  }
}


describe('<Game>', () => {
  jest.useFakeTimers();

  it('renders without crashing', () => {
    const game = shallow(<Game words={new TestWordSet()}/>);
    expect(game).toMatchSnapshot();
  });

  it('has header', () => {
    const game = shallow(<Game words={new WordSet()}/>);
    expect(game.find('.header')).toHaveLength(1);
  });

  it('fires restart handler on header click', () => {
    const onRestart = sinon.spy();
    const game = shallow(<Game size={6} onRestart={onRestart} words={new WordSet()}/>);
    game.find('.restart').simulate('click');
    expect(onRestart.calledOnce).toEqual(true);
  });

  it('selecting a cell stores it\'s letter as selected', () => {
    const words = new TestWordSet();
    const game = mount(<Game size={6} words={words}/>);
    const cells = game.find('Cell');
    expect(cells).toHaveLength(16);
    cells.get(0).onSelectStart(); //H
    const letters = game.state('selected');
    expect(letters).toHaveLength(1);
    expect(letters[0].char).toEqual('H');
  });

  it('selecting two cells stores their letters in selected', () => {
    const words = new TestWordSet();
    const game = mount(<Game size={6} words={words}/>);
    const cells = game.find('Cell');
    expect(cells).toHaveLength(16);
    cells.get(0).onSelectStart(); //H
    cells.get(1).onSelectOver(); //E
    const letters = game.state('selected');
    expect(letters).toHaveLength(2);
    expect(letters[0].char).toEqual('H');
    expect(letters[1].char).toEqual('E');
  });

  it('deselecting a cell removes it\s letter from selected', () => {
    const words = new TestWordSet();
    const game = mount(<Game size={6} words={words}/>);
    const cells = game.find('Cell');
    expect(cells).toHaveLength(16);
    cells.get(0).onSelectStart(); //H
    cells.get(1).onSelectOver(); //E
    let letters = game.state('selected');
    expect(letters).toHaveLength(2);
    expect(letters[0].char).toEqual('H');
    expect(letters[1].char).toEqual('E');
    cells.get(0).onSelectOver(); //Move back to H
    letters = game.state('selected');
    expect(letters).toHaveLength(1);
    expect(letters[0].char).toEqual('H');
  });

  it('selecting a word marks that word as found', () => {
    const words = new TestWordSet();
    const game = mount(<Game size={6} words={words}/>);
    const cells = game.find('Cell');
    expect(cells).toHaveLength(16);
    cells.get(0).onSelectStart(); //H
    cells.get(1).onSelectOver(); //E
    cells.get(2).onSelectOver(); //L
    cells.get(3).onSelectOver(); //P
    cells.get(3).onSelectEnd();
    expect(words.isFound('HELP')).toEqual(true);
  });

  it('selecting all words marks the game complete', () => {
    const words = new TestWordSet();
    const game = mount(<Game size={6} words={words}/>);
    const gameInstance = game.instance();
    const cells = game.find('Cell');
    expect(cells).toHaveLength(16);
    cells.get(0).onSelectStart(); //H
    cells.get(1).onSelectOver(); //E
    cells.get(2).onSelectOver(); //L
    cells.get(3).onSelectOver(); //P
    cells.get(3).onSelectEnd();
    expect(words.isFound('HELP')).toEqual(true);
    expect(gameInstance.hasWon()).toEqual(false);
    cells.get(4).onSelectStart(); //N
    cells.get(5).onSelectOver(); //O
    cells.get(6).onSelectOver(); //T
    cells.get(7).onSelectOver(); //E
    cells.get(7).onSelectEnd();
    expect(words.isFound('NOTE')).toEqual(true);
    expect(gameInstance.hasWon()).toEqual(false);
    cells.get(8).onSelectStart(); //F
    cells.get(9).onSelectOver(); //U
    cells.get(10).onSelectOver(); //L
    cells.get(11).onSelectOver(); //L
    cells.get(11).onSelectEnd();
    expect(words.isFound('FULL')).toEqual(true);
    expect(gameInstance.hasWon()).toEqual(false);
    cells.get(12).onSelectStart(); //D
    cells.get(13).onSelectOver(); //E
    cells.get(14).onSelectOver(); //N
    cells.get(15).onSelectOver(); //T
    cells.get(15).onSelectEnd();
    expect(words.isFound('DENT')).toEqual(true);
    expect(gameInstance.hasWon()).toEqual(true);
  });

  it('will show a hint if asked', () => {
    const words = new TestWordSet();
    const game = mount(<Game size={6} words={words}/>);
    game.find('.hint').simulate('click');
    let hint = game.state('hinting');
    expect(hint).toHaveLength(4);
    expect(hint[0]).toEqual({x:0, y:0});
    expect(hint[1]).toEqual({x:1, y:0});
    expect(hint[2]).toEqual({x:2, y:0});
    expect(hint[3]).toEqual({x:3, y:0});
  });

  it('will clear found words if reset is clicked', () => {
    const words = new TestWordSet();
    const game = mount(<Game size={6} words={words}/>);
    const cells = game.find('Cell');
    expect(cells).toHaveLength(16);
    cells.get(0).onSelectStart(); //H
    cells.get(1).onSelectOver(); //E
    cells.get(2).onSelectOver(); //L
    cells.get(3).onSelectOver(); //P
    cells.get(3).onSelectEnd();
    expect(words.isFound('HELP')).toEqual(true);
    game.find('.reset').simulate('click');
    expect(words.isFound('HELP')).toEqual(false);
  });
});

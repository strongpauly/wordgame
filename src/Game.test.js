import React from 'react';
import Game from './Game';
import {shallow, mount} from 'enzyme';
import sinon from 'sinon';

import WordSet from './words/WordSet';
import Grid from './grid/Grid';

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

class TestWordSet2 extends WordSet {
  constructor() {
    super();//Will generate words which we will overwrite.
    // A N D
    // B A A
    // D A N
    this.words = ['AND', 'BAA', 'DAN'];
    this.grid = new Grid(3, 3);
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

expect.extend({
  toHaveSelected(game, string) {
    const selected = game.state('selected').map(cell => cell.char).join('');
    return {
      message: () => `expected to have ${string} selected, but had ${selected}`,
      pass: selected === string
    };
  }
});

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
    const game = shallow(<Game onRestart={onRestart} words={new WordSet()}/>);
    game.find('.restart').simulate('click');
    expect(onRestart.calledOnce).toEqual(true);
  });

  it('selecting a cell stores it\'s letter as selected', () => {
    const words = new TestWordSet();
    const game = mount(<Game words={words}/>);
    const cells = game.find('Cell');
    expect(cells).toHaveLength(16);
    cells.at(0).simulate('mousedown'); //H
    expect(game).toHaveSelected('H');
  });

  it('selecting two cells stores their letters in selected', () => {
    const words = new TestWordSet();
    const game = mount(<Game words={words}/>);
    const cells = game.find('Cell');
    expect(cells).toHaveLength(16);
    cells.at(0).simulate('mousedown'); //H
    cells.at(1).simulate('mouseover'); //E
    expect(game).toHaveSelected('HE');
  });

  it('doesn\'t select a cell without mousedown first', () => {
    const words = new TestWordSet();
    const game = mount(<Game words={words}/>);
    const cells = game.find('Cell');
    expect(cells).toHaveLength(16);
    cells.first().simulate('mouseover'); //H
    expect(game).toHaveSelected('');
  });

  it('deselecting a cell removes it\'s letter from selected', () => {
    const words = new TestWordSet();
    const game = mount(<Game words={words}/>);
    const cells = game.find('Cell');
    expect(cells).toHaveLength(16);
    cells.at(0).simulate('mousedown'); //H
    cells.at(1).simulate('mouseover'); //E
    expect(game).toHaveSelected('HE');
    cells.get(0).onSelectOver(); //Move back to H
    expect(game).toHaveSelected('H');
  });

  function findHelp(game) {
    const cells = game.find('Cell');
    expect(cells).toHaveLength(16);
    cells.at(0).simulate('mousedown'); //H
    cells.at(1).simulate('mouseover'); //E
    cells.at(2).simulate('mouseover'); //L
    cells.at(3).simulate('mouseover'); //P
    expect(game).toHaveSelected('HELP');
    cells.at(3).simulate('mouseup');
  }

  it('selecting a word marks that word as found', () => {
    const words = new TestWordSet();
    const game = mount(<Game words={words}/>);
    findHelp(game, words);
    expect(words.isFound('HELP')).toEqual(true);
  });

  it('selecting a cell diagonally doesn\'t word', () => {
    const words = new TestWordSet();
    const game = mount(<Game words={words}/>);
    const cells = game.find('Cell');
    expect(cells).toHaveLength(16);
    cells.at(0).simulate('mousedown'); //H
    expect(game).toHaveSelected('H');
    cells.at(4).simulate('mouseover'); //N
    expect(game).toHaveSelected('HN');
    cells.at(0).simulate('mouseover');
    expect(game).toHaveSelected('H');
    cells.at(5).simulate('mouseover');
    expect(game).toHaveSelected('H');
    cells.at(5).simulate('mouseup');
  });

  it('won\'t cause an error if circle round to cell that is already selected', () => {
    const words = new TestWordSet();
    const game = mount(<Game words={words}/>);
    const cells = game.find('Cell');
    expect(cells).toHaveLength(16);
    cells.at(1).simulate('mousedown'); //H
    expect(game).toHaveSelected('E');
    cells.at(2).simulate('mouseover'); //N
    expect(game).toHaveSelected('EL');
    cells.at(6).simulate('mouseover');
    expect(game).toHaveSelected('ELT');
    cells.at(5).simulate('mouseover');
    expect(game).toHaveSelected('ELTO');
    cells.at(1).simulate('mouseover');
    expect(game).toHaveSelected('ELTO');
    cells.at(1).simulate('mouseup');
  });

  it('selecting all words marks the game complete', () => {
    const words = new TestWordSet();
    const game = mount(<Game words={words}/>);
    const gameInstance = game.instance();
    const cells = game.find('Cell');
    expect(cells).toHaveLength(16);
    findHelp(game, words);
    expect(words.isFound('HELP')).toEqual(true);
    expect(gameInstance.hasWon()).toEqual(false);
    cells.at(4).simulate('mousedown'); //N
    cells.at(5).simulate('mouseover'); //O
    cells.at(6).simulate('mouseover'); //T
    cells.at(7).simulate('mouseover'); //E
    cells.at(7).simulate('mouseup');
    expect(words.isFound('NOTE')).toEqual(true);
    expect(gameInstance.hasWon()).toEqual(false);
    cells.at(8).simulate('mousedown'); //F
    cells.at(9).simulate('mouseover'); //U
    cells.at(10).simulate('mouseover'); //L
    cells.at(11).simulate('mouseover'); //L
    cells.at(11).simulate('mouseup');
    expect(words.isFound('FULL')).toEqual(true);
    expect(gameInstance.hasWon()).toEqual(false);
    cells.at(12).simulate('mousedown'); //D
    cells.at(13).simulate('mouseover'); //E
    cells.at(14).simulate('mouseover'); //N
    cells.at(15).simulate('mouseover'); //T
    cells.at(15).simulate('mouseup');
    expect(words.isFound('DENT')).toEqual(true);
    expect(gameInstance.hasWon()).toEqual(true);
  });

  it('will show a hint if asked', () => {
    const words = new TestWordSet();
    const game = mount(<Game words={words}/>);
    game.find('.showHint').simulate('click');
    let hint = game.state('hinting');
    expect(hint).toHaveLength(4);
    expect(hint[0]).toEqual({x:0, y:0});
    expect(hint[1]).toEqual({x:1, y:0});
    expect(hint[2]).toEqual({x:2, y:0});
    expect(hint[3]).toEqual({x:3, y:0});
  });

  it('will hint for the second word if the first has been found', () => {
    const words = new TestWordSet();
    const game = mount(<Game words={words}/>);
    findHelp(game, words);
    expect(words.isFound('HELP')).toEqual(true);
    game.find('.showHint').simulate('click');
    let hint = game.state('hinting');
    expect(hint).toHaveLength(4);
    expect(hint[0]).toEqual({x:0, y:1});
    expect(hint[1]).toEqual({x:1, y:1});
    expect(hint[2]).toEqual({x:2, y:1});
    expect(hint[3]).toEqual({x:3, y:1});
  });

  it('will clear found words if reset is clicked', () => {
    const words = new TestWordSet();
    const game = mount(<Game words={words}/>);
    findHelp(game, words);
    expect(words.isFound('HELP')).toEqual(true);
    game.find('.reset').simulate('click');
    expect(words.isFound('HELP')).toEqual(false);
  });

  it('will spin reset button if can no longer complete the game', () => {
    const words = new TestWordSet2();
    const game = mount(<Game words={words}/>);
    const cells = game.find('Cell');
    expect(game.find('.reset.spinning')).toHaveLength(0);
    expect(cells).toHaveLength(9);
    cells.at(2).simulate('mousedown'); //D
    cells.at(5).simulate('mouseover'); //A
    cells.at(8).simulate('mouseover'); //N
    cells.at(8).simulate('mouseup');
    expect(words.isFound('DAN')).toEqual(true);
    //Selecting DAN in this way prevents AND from being selectable, therefore the game cannot complete.
    expect(words.canComplete()).toEqual(false);
    expect(game.find('.reset.spinning')).toHaveLength(1);
    game.find('.reset').simulate('click');
    expect(words.isFound('DAN')).toEqual(false);
    expect(words.canComplete()).toEqual(true);
    expect(game.find('.reset.spinning')).toHaveLength(0);
  });

  it('will start a timer when first interact with grid', () => {
    const words = new TestWordSet();
    const game = mount(<Game words={words}/>);
    const timer = game.find('.header .timer');
    expect(timer).toHaveLength(1);
    expect(timer.text()).toEqual(' ');
    game.find('Cell').first().simulate('mousedown');
    expect(timer.text()).toEqual('1');
    jest.runTimersToTime(1000);
    expect(timer.text()).toEqual('2');
  });

  it('will stop timer when game unmounts', () => {
    const words = new TestWordSet();
    const game = mount(<Game words={words}/>);
    const timer = game.find('.header .timer');
    expect(timer).toHaveLength(1);
    expect(timer.text()).toEqual(' ');
    game.find('Cell').first().simulate('mousedown');
    expect(timer.text()).toEqual('1');
    game.unmount();
    jest.runTimersToTime(1000);
    expect(timer.text()).toEqual('1');

  });
});

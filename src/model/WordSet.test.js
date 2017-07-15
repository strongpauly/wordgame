/* eslint-env jest */
import WordSet from './WordSet';

describe('WordSet', () => {

  it('allows words to be found', () => {
    const set = new WordSet();
    const firstWord = set.words[0];
    set.setWordFound(firstWord, set.getCoords(firstWord));
    expect(set.isFound(firstWord)).toEqual(true);
  });

  it('finding all words sets all words found to true', () => {
    const set = new WordSet();
    expect(set.foundAll()).toEqual(false);
    set.words.forEach( word => {
      set.setWordFound(word, set.getCoords(word));
      expect(set.canComplete()).toEqual(true);
    });
    expect(set.foundAll()).toEqual(true);
  });
});

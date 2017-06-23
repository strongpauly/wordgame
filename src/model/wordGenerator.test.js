/* eslint-env jest */
import wordGenerator from './wordGenerator';

describe('wordGenerator', () => {

  it('wont generate words shorter than min' , () => {
    let minWordLength = 4;
    let words = wordGenerator(128, minWordLength, 8);
    let min = words.reduce( (min, word) => Math.min(min, word.length), Infinity);
    expect(min).toBeGreaterThanOrEqual(minWordLength);
  });

  it('wont generate words longer than max' , () => {
    let maxWordLength = 10;
    let words = wordGenerator(128, 3, maxWordLength);
    let max = words.reduce( (max, word) => Math.max(max, word.length), 0);
    expect(max).toBeLessThanOrEqual(maxWordLength);
  });

  it('will generate words equalling number of characters' , () => {
    let characters = 36;
    let words = wordGenerator(characters);
    let count = words.reduce( (count, word) => count + word.length, 0);
    expect(count).toEqual(characters);
  });

});

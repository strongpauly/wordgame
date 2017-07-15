import hardRandomWord from 'random-word-of-length';
import easyRandomWord from './easyWordGenerator';

function getWordLength(min, max) {
  return Math.round(min + (Math.random() * (max - min)));
}

export default function wordGenerator(characters, minWordLength = 3, maxWordLength = 8, easy = true) {
  let charactersLeft = characters;
  let wordLengths = [];
  let randomword = easy ? easyRandomWord : hardRandomWord;
  while (charactersLeft > maxWordLength) {
    let newWordLength = getWordLength(minWordLength, maxWordLength);
    let newCharactersLeft = charactersLeft - newWordLength;
    /* istanbul ignore if */
    if (newCharactersLeft < minWordLength) {
      continue; //Loop again until we generate a length that won't leave a word too small.
    }
    wordLengths.push( newWordLength );
    charactersLeft = newCharactersLeft;
  }
  if(charactersLeft > 0) {
    wordLengths.push(charactersLeft);
  }
  return wordLengths.map( length => randomword(length));
}

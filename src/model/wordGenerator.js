
import randomword from 'random-word-of-length';

function getWordLength(min, max) {
  return Math.round(min + (Math.random() * (max - min)));
}

export default function wordGenerator(characters, minWordLength = 3, maxWordLength = 8) {
  let charactersLeft = characters;
  let wordLengths = [];
  while (charactersLeft > maxWordLength) {
    let newWordLength = getWordLength(minWordLength, maxWordLength);
    let newCharactersLeft = charactersLeft - newWordLength;
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

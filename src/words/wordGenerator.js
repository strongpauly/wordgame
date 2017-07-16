import easyRandomWord from './easyWordGenerator';

function getWordLength(min, max) {
  return Math.round(min + (Math.random() * (max - min)));
}

export default function wordGenerator(characters, minWordLength = 3, maxWordLength = 8) {
  let charactersLeft = characters;
  let wordLengths = [];
  while (charactersLeft > maxWordLength) {
    let newWordLength = getWordLength(minWordLength, maxWordLength);
    let newCharactersLeft = charactersLeft - newWordLength;
    /* istanbul ignore if: randomness causes this to sometimes to not be covered */
    if (newCharactersLeft < minWordLength) {
      continue; //Loop again until we generate a length that won't leave a word too small.
    }
    wordLengths.push( newWordLength );
    charactersLeft = newCharactersLeft;
  }
  /* istanbul ignore next: randomness causes this to sometimes to not be covered */
  if(charactersLeft > 0) {
    wordLengths.push(charactersLeft);
  }
  return wordLengths.map( length => easyRandomWord(length));
}

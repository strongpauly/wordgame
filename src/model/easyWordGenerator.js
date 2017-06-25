import wordlist from 'wordlist-english';
const englishWords = wordlist['english'].filter(word => word.indexOf('�') === -1);

export default function randomword(length) {
  let word;
  do {
    word = englishWords[Math.floor(Math.random() * englishWords.length)];
  } while(word.length !== length);
  return word;
}

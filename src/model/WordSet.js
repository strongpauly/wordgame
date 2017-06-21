
export default class WordSet {

  constructor() {
    this.characters = [
      'KILLER'.split(''),
      'RESALE'.split(''),
      'HORROR'.split(''),
      'MIRROR'.split(''),
      'GOOGLE'.split(''),
      'HANDED'.split('')
    ];
  }

  getCharAt(x, y) {
    return this.characters[x][y];
  }
}

import { Card } from "./card";

export class Deck {
  suits: string[] = [];
  values: string[] = [];
  cards: Card[] = [];

  constructor(){
    for (let suit of Card.suits){
      for (let value of Card.values){
        this.cards.push(new Card(suit, value));
      }
    }
    this.randomArrayShuffle(this.cards); 
  }

  randomArrayShuffle(array: Card[]) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }
}

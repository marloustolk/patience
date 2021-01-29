export class Card {
  static values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
  static suits = ['♠', '♦', '♣', '♥'];
  suit: string;
  value: string;

  constructor(suit: string, value: string) {
      this.suit = suit;
      this.value = value;
    }

  public isRed(): boolean {
    return this.suit ==  Card.suits[1] || this.suit == Card.suits[3];
  }

  public isAce(): boolean {
    return this.value == Card.values[0];
  }

  public isKing(): boolean {
    return this.value == Card.values[Card.values.length - 1];
  }

  public isOneValueHigherThen(card: Card){
    if (card.isKing()){
      return false;
    }
    return Card.values.indexOf(this.value) == (Card.values.indexOf(card.value) + 1);
  }
}

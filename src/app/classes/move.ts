import { Card } from "./card";

export class Move {
  from: string;
  to: string;
  cards: Card[];

  constructor(from: string, to: string, cards: Card[]) {
    this.from = from;
    this.to = to;
	this.cards = cards;
  }
}

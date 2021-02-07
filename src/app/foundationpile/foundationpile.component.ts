import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

import { Card } from "../card";
import { Move } from "../move";

@Component({
  selector: 'app-foundationpile',
  templateUrl: './foundationpile.component.html',
  styleUrls: ['./foundationpile.component.css']
})
export class FoundationpileComponent implements OnInit {
@Input() nr: number;
@Output() moveEvent: EventEmitter<Move> = new EventEmitter();
cards: Card[] = new Array();
id: string;

  ngOnInit(){
    this.id = "foundationpile-" + (this.nr).toString();
  }

  public clear(){
    this.cards = new Array();
  }
  
  public remove(cardsToRemove: Card[]) {
    this.cards.splice(0, 1);
  }
  
  public add(cardsToAdd: Card[]) {
	cardsToAdd.forEach(card => {
       this.cards.unshift(card);
    });
  }

  public getTopCard(): Card {
    return (this.cards.length == 0) ? null : this.cards[0];
  }

  getSecondCard(): Card {
    return (this.cards.length > 1) ? this.cards[1] : null;
  }

  drop(event: CdkDragDrop<Card[]>) {
    let index = this.getIndex(event);
    let card = event.previousContainer.data[index];
    if (this.canPlace(card)){
       let cardRemoved  = event.previousContainer.data.splice(index,1)[0];
       event.container.data.unshift(cardRemoved);
       this.moveEvent.emit(new Move(event.previousContainer.id, event.container.id, [card]));
    }
  }

  canPlace(card: Card): boolean {
    if (this.cards.length > 0) {
      let topCard = this.getTopCard();
      return card.suit == topCard.suit && card.isOneValueHigherThen(topCard);
    }
    return this.cards.length == 0 && card.isAce();
  }

  getIndex(event: CdkDragDrop<Card[]>): number {
    if (event.previousContainer.id.startsWith("foundationpile")){
      return 0;
    }
    return event.previousContainer.id.startsWith("mainpile") ? event.previousContainer.data.length - 1: event.previousIndex;
  }
}
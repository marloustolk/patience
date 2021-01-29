import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

import { Card } from "../card";

@Component({
  selector: 'app-playpile',
  templateUrl: './playpile.component.html',
  styleUrls: ['./playpile.component.css']
})
export class PlaypileComponent implements OnInit {
  @Input() nr: number;
  @Input() cards: Card[];
  @Output() putEvent: EventEmitter<any> = new EventEmitter();
  closedCards:Card[];
  id: string;

  ngOnInit(){
    this.id = "playpile-" + (this.nr).toString();
    let cards = this.cards.splice(1, this.cards.length-1);
    this.closedCards = cards.length == 0 ? new Array() : cards;
    console.log(this.id + ", open=" + this.cards.length + ", closed=" + this.closedCards.length);
  }

  public clear(){
    this.cards = new Array();
    this.closedCards = new Array();
  }

  public noClosedCards(): boolean {
    return this.closedCards.length == 0;
  }

  flip(){
    if (this.closedCards.length > 0 && this.cards.length == 0){
      this.cards = this.closedCards.splice(this.closedCards.length-1, this.closedCards.length);
      this.putEvent.emit();
    }
  }

  getTopCard(): Card {
    return (this.cards == null || this.cards.length == 0) ? null : this.cards[this.cards.length -1];
  }

  drop(event: CdkDragDrop<Card[]>) {
    if (event.container.id === event.previousContainer.id) {
      return;
    }
    let index = this.getIndex(event);
    let deleteCount = this.getDeleteCount(event);
    let card = event.previousContainer.data[index];

    if (this.canPlace(card)){
      let cardsRemoved  = event.previousContainer.data.splice(index,deleteCount);
      for (let cardRemoved of cardsRemoved){
        event.container.data.push(cardRemoved);
      }
      this.putEvent.emit();
    }
  }

  canPlace(card: Card): boolean {
    if ((this.cards.length + this.closedCards.length) > 0) {
      let topCard = this.getTopCard();
      return card.isRed() != topCard.isRed() && topCard.isOneValueHigherThen(card);
    }
    return this.cards.length == 0 && card.isKing();
  }

  getIndex(event: CdkDragDrop<Card[]>): number {
    if (event.previousContainer.id.startsWith("foundationpile")){
      return 0;
    }
    return event.previousContainer.id.startsWith("mainpile") ? event.previousContainer.data.length - 1: event.previousIndex;
  }

  getDeleteCount(event: CdkDragDrop<Card[]>): number {
    return event.previousContainer.id.startsWith("playpile") ? (event.previousContainer.data.length - event.previousIndex) : 1;
  }
}
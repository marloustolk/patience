import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Card } from '../../classes/card';
import { Move } from '../../classes/move';

@Component({
  selector: 'app-playpile',
  templateUrl: './playpile.component.html',
  styleUrls: ['./playpile.component.scss']
})
export class PlaypileComponent implements OnInit {
  @Input() nr!: number;
  @Input() cards: Card[] = [];
  @Output() moveEvent: EventEmitter<Move> = new EventEmitter();
  @Output() clickEvent: EventEmitter<Move> = new EventEmitter();
  closedCards:Card[] = [];
  id!: string;

  ngOnInit(){
    this.id = "playpile-" + (this.nr).toString();
    let cards = this.cards.splice(1, this.cards.length-1);
    this.closedCards = cards.length == 0 ? new Array() : cards;
    // console.log(this.id + ", open=" + this.cards.length + ", closed=" + this.closedCards.length);
  }

  public clear(){
    this.cards = new Array();
    this.closedCards = new Array();
  }

  public noClosedCards(): boolean {
    return this.closedCards.length == 0;
  }
  
  public remove(cardsToRemove: Card[]) {
	let numberOfCards = cardsToRemove.length;
	const index = this.cards.indexOf(cardsToRemove[0],0);
	this.cards.splice(index, numberOfCards);
  }
  
  public add(cardsToAdd: Card[]) {
	if (!this.canPlace(cardsToAdd[0]) && this.cards.length > 0) {
      this.closedCards.push(this.cards.pop()!);
	}
	cardsToAdd.forEach(card => {
       this.cards.push(card);
    });
  }

  flip(){
    if (this.closedCards.length > 0 && this.cards.length == 0){
      this.cards = this.closedCards.splice(this.closedCards.length-1, this.closedCards.length);
    }
  }

  getTopCard(): Card | undefined {
    return (this.cards === undefined || this.cards.length === 0) ? undefined : this.cards[this.cards.length -1];
  }
  
  doubleClick(){
	this.clickEvent.emit(new Move(this.id, "", [this.getTopCard()!]));
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
      this.moveEvent.emit(new Move(event.previousContainer.id, event.container.id, cardsRemoved));
    }
  }

  canPlace(card: Card): boolean {
    if ((this.cards.length + this.closedCards.length) > 0) {
      let topCard = this.getTopCard();
      return card.isRed() != topCard!.isRed() && topCard!.isOneValueHigherThen(card);
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

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Card } from '../../classes/card';
import { Move } from '../../classes/move';


@Component({
  selector: 'app-mainpile',
  templateUrl: './mainpile.component.html',
  styleUrls: ['./mainpile.component.scss']
})
export class MainpileComponent {
  @Input() cards!: Card[];
  @Output() moveEvent: EventEmitter<Move> = new EventEmitter();
  @Output() clickEvent: EventEmitter<Move> = new EventEmitter();
  openCards: Card[] = new Array();
  mainpile: string = "mainpile";

  public clear(){
    this.cards = new Array();
    this.openCards = new Array();
  }

  public isEmpty(): boolean {
    return this.cards.length == 0 && this.openCards.length == 0;
  }
  
  public remove(cardsToRemove: Card[]) {
    if (this.openCards.length > 0) {
	  let card = this.openCards.pop();
	} else {
	  this.cards = new Array();
	}
  }
  
  public add(cardsToAdd: Card[], fromMainPile: boolean) {
	if (fromMainPile && cardsToAdd.length === 1) {
	  this.cards.push(cardsToAdd[0]);
	} else {
	  cardsToAdd.forEach(card => {
		this.openCards.push(card);
	  });
	}
  }
  
  doubleClick(){
	this.clickEvent.emit(new Move(this.mainpile, "", [this.getTopCard()!]));
  }

  getColor(card: Card){
    return card.isRed() ? 'red' : 'black';
  }

  getTopCard(): Card | undefined {
    return (this.openCards.length == 0) ? undefined : this.openCards[this.openCards.length -1];
  }

  getSecondCard(): Card | undefined {
    return (this.openCards.length > 1) ? this.openCards[this.openCards.length -2] : undefined;
  }

  flip(){
	let flippedCards: Card[] = [];
    if (this.cards.length > 0){
      let card = this.cards.pop();
      this.openCards.push(card!);
	  flippedCards = [card!];
    } else if (this.cards.length === 0 && this.openCards.length > 0){
	  flippedCards = [...this.openCards];
      this.cards = this.openCards.reverse();
      this.openCards = new Array();
    }
	this.moveEvent.emit(new Move(this.mainpile, this.mainpile, flippedCards));
  }
}

import { Component, Input } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

import { Card } from "../card";

@Component({
  selector: 'app-mainpile',
  templateUrl: './mainpile.component.html',
  styleUrls: ['./mainpile.component.css']
})
export class MainpileComponent {
  @Input() cards: Card[];
  openCards: Card[] = new Array();
  mainpile: string = "mainpile";

  public clear(){
    this.cards = new Array();
    this.openCards = new Array();
  }

  public isEmpty(): boolean {
    return this.cards.length == 0 && this.openCards.length == 0;
  }

  getColor(card: Card){
    return card.isRed() ? 'red' : 'black';
  }

  getTopCard(): Card {
    return (this.openCards.length == 0) ? null : this.openCards[this.openCards.length -1];
  }

  getSecondCard(): Card {
    return (this.openCards.length > 1) ? this.openCards[this.openCards.length -2] : null;
  }

  flip(){
    if (this.cards.length > 0){
      let topcard = this.cards.pop();
      this.openCards.push(topcard);
    } else if (this.cards.length === 0 && this.openCards.length > 0){
      this.cards = this.openCards.reverse();
      this.openCards = new Array();
    }
  }
}
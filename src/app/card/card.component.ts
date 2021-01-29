import { Component, Input } from '@angular/core';
import { Card } from '../card';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() card: Card;
  @Input() index: number = 0;
  @Input() closed: boolean;

  getColor(card): string {
    let cardString = card.suit.concat(card.value);
    return (cardString.includes("♥") || cardString.includes("♦")) ? "#b01030" : "#000000";
  }

  getRowStart(){
    return (this.index).toString();
  }

  getRowEnd(){
    return (this.index + 7).toString();
  }
  
  getZIndex(){
    return (this.index + 1).toString();
  }
}

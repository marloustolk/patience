import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Card } from './classes/card';
import { Deck } from './classes/deck';
import { FoundationpileComponent } from './components/foundationpile/foundationpile.component';
import { MainpileComponent } from './components/mainpile/mainpile.component';
import { Move } from './classes/move';
import { PlaypileComponent } from './components/playpile/playpile.component';


@Component({
  selector: 'app-board',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChildren('playpile') playpileComponents!:QueryList<PlaypileComponent>;
  @ViewChildren('foundationpile') foundationpileComponents!:QueryList<FoundationpileComponent>;
  @ViewChild('mainpile') mainpileComponent!:MainpileComponent;

  name = 'Epibratie - Solitaire';
  deck: any[] = [];
  foundationpiles = [1, 2, 3, 4];
  playpileCards: Map<number, Card[]> = new Map;
  moves: Move[] = [];
  move: Move | undefined;

  constructor(public dialog: MatDialog, private title:Title, private router: Router) {}

  ngOnInit() {
    this.startGame();
  }

  startGame(): void {
	this.moves = new Array();
    this.deck = new Deck().cards;
    this.playpileCards = new Map<number, Card[]>();
    for (let i = 1; i < 8; i++){
      let cards = this.deck.splice(0, i);
      this.playpileCards.set(i, cards);
    }
  }

  checkEvent(event: string) {
    if (event === 'restart') {
      this.restartGame();
    } else {
      this.undo();
    }
  }

  restartGame(): void {
    this.stopGame();
    this.startGame();
  }

  stopGame(){
    this.mainpileComponent.clear();
    this.playpileComponents.forEach(pile => {
      pile.clear();
    });
    this.foundationpileComponents.forEach(pile => {
      pile.clear();
    });
  }

  undo(){
    if (this.moves.length == 0){
      return;
    }
    this.move = this.moves.pop();
    let from = this.move!.from;
    let to = this.move!.to;
    let cards = this.move!.cards;
    // remove
    this.removeFromPile(to, cards);
    // add
    if (from.startsWith("mainpile")){
      this.mainpileComponent.add(cards, to.startsWith("mainpile"));
    }
    let foundationPile = this.getFoundationPile(from);
    if (foundationPile){
      foundationPile.add(cards);
    }
    let playPile = this.getPlaypile(from);
    if (playPile != null){
      playPile.add(cards);
    }
  }
  
  removeFromPile(idFrom:String, cards: Card[]){
    if (idFrom.startsWith("mainpile")){
      this.mainpileComponent.remove(cards);
    }
    let foundationPileTo = this.getFoundationPile(idFrom);
    if (foundationPileTo){
      foundationPileTo.remove(cards);
    }
    let playPileTo = this.getPlaypile(idFrom);
    if (playPileTo != null){
      playPileTo.remove(cards);
    }
  }
  
  findPlaceFoundationPiles(event: Move){
    let card = event.cards[0];
    let moved = false;
    this.foundationpileComponents.forEach(pile => {
      if (pile.canPlace(card) && moved == false) {
        this.removeFromPile(event.from, event.cards);
        pile.add(event.cards);
        moved = true;
        this.checkWon(new Move(event.from, pile.id, event.cards));
      }
    });
  }
  
  getPlaypile(id: String): PlaypileComponent | undefined {
    let playpile = undefined;
    if (id.startsWith("playpile")){
      this.playpileComponents.forEach(pile => {
        if (pile.id == id){
          playpile=pile;
        }
      });
    }
    return playpile;	
  }
  
  getFoundationPile(id: String): FoundationpileComponent | undefined {
    let foundationpile = undefined;
    if (id.startsWith("foundationpile")){
      this.foundationpileComponents.forEach(pile => {
        if (pile.id == id){
          foundationpile=pile;
        }
      });
    }
    return foundationpile;
  }

  checkWon(event: Move) {
    let won = this.mainpileComponent.isEmpty();
    this.playpileComponents.forEach(pile => {
      won = won && pile.noClosedCards();
      pile.flip();
    });
	
    if (won){
	  this.setKings();
      this.showDialog();
    }
	  this.moves.push(event);
  }
  
  setKings(){
    let suits = [...Card.suits];
    let kings: Card[] = new Array();
    this.foundationpileComponents.forEach(pile => {
      if (pile.getTopCard() != undefined){
        suits.splice(suits.indexOf(pile.getTopCard()!.suit, 0), 1);
        kings.push(new Card(pile.getTopCard()!.suit,"K"));
      } else {
        kings.push(new Card("A", "A"));
      }
    });
    kings = kings.map(card => {
      if (card.suit === "A"){
        let newCard = new Card(suits.splice(0,1)[0],"K");
        return newCard;
      }
      return card;
    });
    
    let foundationpiles = this.foundationpileComponents.toArray();
    this.stopGame();
    
    var i:number; 
    for(i = 0;i<4;i++) {
      foundationpiles[i].add([kings[i]]);
    }
  }

  showDialog() {
    const dialogRef = this.dialog.open(BoardComponentDialog);
      dialogRef.afterClosed().subscribe(playAgain => {
      if(playAgain){
        this.restartGame();
      }
    });
  }
}

@Component({
  selector: 'app-board-dialog',
  template: `
            <h1 mat-dialog-title>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;YOU WON!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h1>
            <mat-dialog-actions align="end">
              <button mat-button [mat-dialog-close]="true" class="button dialog">Play</button>
              <button mat-button mat-dialog-close routerLink="" class="button dialog">Cancel</button>
            </mat-dialog-actions>
            `,
  styleUrls: ['./app.component.scss']
})
export class BoardComponentDialog {
}

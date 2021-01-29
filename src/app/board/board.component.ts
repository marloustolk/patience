import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';

import { Card } from "../card";
import { Deck } from "../deck";
import { FoundationpileComponent } from "../foundationpile/foundationpile.component"
import { MainpileComponent } from "../mainpile/mainpile.component"
import { PlaypileComponent } from "../playpile/playpile.component"

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  @ViewChildren('playpile') playpileComponents:QueryList<PlaypileComponent>;
  @ViewChildren('foundationpile') foundationpileComponents:QueryList<FoundationpileComponent>;
  @ViewChild('mainpile') mainpileComponent:MainpileComponent;

  deck: any[];
  foundationpiles = [1, 2, 3, 4];
  playpileCards: Map<number, Card[]>;

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    this.startGame();
  }

  startGame(): void {
    this.deck = new Deck().cards;
    this.playpileCards = new Map<number, Card[]>();
    for (let i = 1; i < 8; i++){
      let cards = this.deck.splice(0, i);
      this.playpileCards.set(i, cards);
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

  checkWon() {
    let won = this.mainpileComponent.isEmpty();
    this.playpileComponents.forEach(pile => {
         won = won && pile.noClosedCards();
    });
    if (won){
      this.showDialog();
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
              <button mat-button mat-dialog-close class="button dialog">Cancel</button>
              <button mat-button [mat-dialog-close]="true" class="button dialog">Play</button>
            </mat-dialog-actions>
            `,
  styleUrls: ['./board.component.css']
})
export class BoardComponentDialog {
}
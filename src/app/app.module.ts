import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDialogModule } from '@angular/material/dialog';

import { AppComponent, BoardComponentDialog } from './app.component';
import { CardComponent } from './components/card/card.component';
import { FoundationpileComponent } from './components/foundationpile/foundationpile.component';
import { GameMenuComponent } from './components/game-menu/game-menu.component';
import { MainpileComponent } from './components/mainpile/mainpile.component';
import { PlaypileComponent } from './components/playpile/playpile.component';

@NgModule({
  imports:      [ 
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    DragDropModule,
    MatDialogModule
    ],
  providers: [
    Title                   
  ],
  declarations: [
    AppComponent,
    BoardComponentDialog,
    CardComponent,
    FoundationpileComponent,
    GameMenuComponent,
    MainpileComponent,
    PlaypileComponent
    ],
  bootstrap:    [ 
    AppComponent 
    ]
})
export class AppModule { }

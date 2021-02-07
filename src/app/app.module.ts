import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDialogModule } from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { BoardComponent } from './board/board.component';
import { BoardComponentDialog } from './board/board.component';
import { CardComponent } from './card/card.component';
import { FoundationpileComponent } from './foundationpile/foundationpile.component';
import { MainpileComponent } from './mainpile/mainpile.component';
import { PlaypileComponent } from './playpile/playpile.component';

@NgModule({
  imports:      [ 
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    DragDropModule,
    MatDialogModule
    ],
  providers: [
    Title                   
  ],
  declarations: [
    AppComponent,
    BoardComponent,
    BoardComponentDialog,
    CardComponent, 
    FoundationpileComponent,
    MainpileComponent,
    PlaypileComponent,
    WelcomeComponent
    ],
  bootstrap:    [ 
    AppComponent 
    ]
})
export class AppModule { }

import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'game-menu',
    templateUrl: './game-menu.component.html',
    styleUrls: ['../../app.component.scss']
  })
export class GameMenuComponent implements OnInit {
    @Input() name: string = 'Epibratie';
    @Output() event: EventEmitter<string> = new EventEmitter();
    
    constructor(public dialog: MatDialog, private title:Title, private router: Router) {}

    ngOnInit() {
      this.title.setTitle(this.name)
    }
    
    restart(): void {
      this.event.emit('restart');
    }
      
    undo() {
      this.event.emit('undo');
    }
}
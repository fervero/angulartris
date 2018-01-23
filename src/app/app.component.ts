import { Component, HostListener } from '@angular/core';
import { GameService } from './game.service';
import { GameControlService } from './game-control.service';
import { AbstractPiece } from './AbstractGame/AbstractGame';
import { GAME_OVER, PAUSED } from './constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = "Angulartris";
  readonly GAME_OVER = GAME_OVER;
  readonly PAUSED = PAUSED;
  gameLoop: any = 0;
  constructor(public game: GameService, private control: GameControlService) { }

  ngOnInit() { }
  down = this.game.movePieceDown.bind(this.game);
  togglePause = this.control.togglePause.bind(this.control);
  start = this.control.start.bind(this.control);
  
  @HostListener("window:keydown", ['$event.key'])
  onKey(key): void {
    switch (key.toLowerCase()) {      
      case 'a': this.game.movePieceLeft();
        break;
      case 's': this.game.rotatePiece();
        break;
      case 'd': this.game.movePieceRight();
        break;
      case ' ': this.game.dropPiece();
        break;
      case 'p': this.togglePause();
        break;
    }
  }
  @HostListener("window:click", ['$event.srcElement'])
  onClick(element): void {
    if(element.tagName.toLowerCase() === "button") {
      element.blur();
    }
  }
}

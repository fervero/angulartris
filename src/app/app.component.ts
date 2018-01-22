import { Component, HostListener } from '@angular/core';
import { GameService } from './game.service';
import { AbstractPiece } from './AbstractGame/AbstractGame';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = "Angulartris";
  gameLoop: any = 0;
  constructor(private game: GameService) {

  }

  ngOnInit() {
    // this.game.init();
  }
  getNewPiece(): void {
    this.game.getNewPiece();
  }
  down(): void {
    this.game.movePieceDown();
  }
  start(): void {
    this.game.init();
    clearInterval(this.gameLoop);
    this.gameLoop = setInterval(this.down.bind(this), 250);
  }

  togglePause(): void {
    if (this.gameLoop) {
      clearInterval(this.gameLoop);
      this.gameLoop = 0;
    } else {
      this.gameLoop = setInterval(this.down.bind(this), 250);
    }
  }

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
    element.blur();
  }
}

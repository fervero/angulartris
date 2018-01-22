import { Component } from '@angular/core';
import { GameService } from './game.service';
import { AbstractPiece } from './AbstractGame/AbstractGame';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = "Angulartris";
  public piece: AbstractPiece;
  constructor (private game: GameService) {
    game.init();
  }

  ngOnInit() {
  }
  getNewPiece(): void {
    this.game.getNewPiece();
  }

}

import { Injectable } from '@angular/core';
import { GameService } from './game.service';
import { PAUSED, LIVE } from './constants';
import { DEFAULT_INTERVAL } from './AbstractGame/AbstractGame';

@Injectable()
/**
 * Separate class, handling game flow like: pause, resume, new game.
 */
export class GameControlService {
  gameLoop: any;
  state: string;
  constructor(private game: GameService) {
    game.oState.subscribe(state => this.state = state);
  }

  down = this.game.movePieceDown.bind(this.game);

  start(): void {
    this.game.init();
    clearInterval(this.gameLoop);
    this.gameLoop = setInterval(this.down, DEFAULT_INTERVAL);
    this.game.oState.next(LIVE);
  }

  togglePause(): void {
    if (this.state === LIVE) {
      clearInterval(this.gameLoop);
      this.gameLoop = 0;
      this.game.oState.next(PAUSED);
    } else if (this.state === PAUSED) {
      this.gameLoop = setInterval(this.down, DEFAULT_INTERVAL);
      this.game.oState.next(LIVE);
    }
  }
}




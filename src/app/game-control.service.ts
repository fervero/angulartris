import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/timer';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/if';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/filter';
import { GameService } from './game.service';
import { PAUSED, LIVE, GAME_OVER, FIRST_GAME, LEFT, RIGHT, ROTATE, DROP, PAUSE, NEW_GAME } from './constants';
import { DEFAULT_INTERVAL } from './AbstractGame/AbstractGame';

@Injectable()
/**
 * Separate class, handling game flow like: pause, resume, new game. Because the GameService grew larger and larger.
 */
export class GameControlService {
  interval: number;
  interval$: Observable<number>;
  timer: Observable<number>;
  allowedActions: Map<string, Array<string>>;

  constructor(private game: GameService) {
    this.interval$ = game.oWidth.map(width => DEFAULT_INTERVAL * 10 / width);
    this.allowedActions = new Map();
    this.allowedActions.set(PAUSED, [PAUSE, NEW_GAME]);
    this.allowedActions.set(LIVE, [LEFT, RIGHT, ROTATE, DROP, PAUSE, NEW_GAME]);
    this.allowedActions.set(GAME_OVER, [NEW_GAME]);
    this.allowedActions.set(FIRST_GAME, [NEW_GAME]);
    this.startTimer();
  }

  down = this.game.movePieceDown.bind(this.game);

  filterAction({action, state}: {action: string, state: string}): boolean {
    let allowedActions = this.allowedActions.get(state);
    return allowedActions.includes(action);
  }

  dispatchAction(action): void {
    switch(action) {
      case LEFT: this.game.movePieceLeft();
        break;
      case RIGHT: this.game.movePieceRight();
        break;
      case ROTATE: this.game.rotatePiece();
        break;
      case DROP: this.game.dropPiece();
        break;
      case PAUSE: this.togglePause();
        break;
      case NEW_GAME: this.start();
    }
  }

  bindUIObservable (userInterface$: Observable<string>): void {
    userInterface$
      .withLatestFrom(this.game.state$, (action: string, state: string) => ({action, state}))
      .filter(this.filterAction, this)
      .map(({state, action}) => action)
      .subscribe((action) => this.dispatchAction(action))
  }

  startTimer(): void {
    this.game.state$.switchMap(
      state => 
        Observable.if(
          () => state === LIVE,
          this.interval$.switchMap((time, stuff) =>  Observable.timer(0, time)),
          Observable.empty()
        )
    )
      .subscribe(this.down);
  }

  start(): void {
    this.game.init();
    this.game.state$.next(LIVE);
  }

  togglePause(): void {
    const state = this.game.state$.getValue();
    if (state === LIVE) {
      this.game.state$.next(PAUSED);
    } else if (state === PAUSED) {
      this.game.state$.next(LIVE);
    }
  }
}
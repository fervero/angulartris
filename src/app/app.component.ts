import { Component, HostListener } from '@angular/core';
import { GameService } from './game.service';
import { GameControlService } from './game-control.service';
import { AbstractPiece } from './AbstractGame/AbstractGame';
import { GAME_OVER, PAUSED, LEFT, RIGHT, ROTATE, DROP, PAUSE, NEW_GAME } from './constants';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = "Angulartris";
  readonly GAME_OVER = GAME_OVER;
  readonly PAUSED = PAUSED;
  public readonly NEW_GAME = NEW_GAME;
  public readonly PAUSE = PAUSE;
  gameLoop: any = 0;
  keyMap: Map<string, string>;
  pause$: Subject<string>;

  constructor(public game: GameService, private control: GameControlService) {
    this.keyMap = new Map();
    this.keyMap.set('a', LEFT);
    this.keyMap.set('s', ROTATE);
    this.keyMap.set('d', RIGHT);
    this.keyMap.set('space', DROP);
    this.keyMap.set(' ', DROP);
    this.keyMap.set('p', PAUSE);
    this.pause$ = new Subject();
  }

  ngOnInit() { 
    const keyboard$ = Observable.fromEvent(document, 'keydown')
      .map(({key}) => this.parseKeyboard(key));
    this.control.bindUIObservable(keyboard$);
    this.control.bindUIObservable(this.pause$);
  }

  parseKeyboard(key: string): string {
    return (this.keyMap.has(key)) ? this.keyMap.get(key) : "";
  }

  togglePause(): void {
    this.pause$.next(PAUSE);
  }
  
  @HostListener("window:click", ['$event.srcElement'])
  onClick(element): void {
    if(element.tagName.toLowerCase() === "button") {
      element.blur();
    }
  }
}

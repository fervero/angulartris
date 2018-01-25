import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { GameService } from '../game.service';
import { GameControlService } from '../game-control.service';
import { AbstractPiece } from '../AbstractGame/AbstractGame';
import { FIRST_GAME, NEW_GAME } from '../constants';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent implements OnInit {
  public piece: AbstractPiece;
  public readonly FIRST_GAME = FIRST_GAME;
  public readonly NEW_GAME = NEW_GAME;
  blocks: number[][];
  constructor(public game: GameService, private control: GameControlService, private ref: ElementRef) { 
    game.oNextPiece.subscribe(piece => {
      this.blocks = piece.setPosition([2, 2]).getAbsoluteXY();
    });
  }

  start = this.control.start.bind(this.control);

  ngOnInit() {
    const button$ = Observable.fromEvent(this.ref.nativeElement, 'click')
      .map(({target}) => target.dataset.action);
    this.control.bindUIObservable(button$);    
  }

}

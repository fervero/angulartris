import { Component, OnInit, Input } from '@angular/core';
import { GameService } from '../game.service';
import { GameControlService } from '../game-control.service';
import { AbstractPiece } from '../AbstractGame/AbstractGame';
import { FIRST_GAME } from '../constants';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent implements OnInit {
  public piece: AbstractPiece;
  public readonly FIRST_GAME = FIRST_GAME;
  blocks: number[][];
  constructor(public game: GameService, private control: GameControlService) { 
    game.oNextPiece.subscribe(piece => {
      this.blocks = piece.setPosition([2, 2]).getAbsoluteXY();
    });
  }

  start = this.control.start.bind(this.control);

  ngOnInit() {
  }

  ngOnChanges() {
  }

}

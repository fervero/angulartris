import { Component, OnInit, Input } from '@angular/core';
import { GameService } from '../game.service';
import { AbstractPiece } from '../AbstractGame/AbstractGame';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent implements OnInit {
  public piece: AbstractPiece;
  blocks: number[][];
  constructor(private game: GameService) { 
    game.oNextPiece.subscribe(piece => {
      this.blocks = piece.setPosition([2, 2]).getAbsoluteXY();
    });
  }

  ngOnInit() {
  }

  ngOnChanges() {
  }

}

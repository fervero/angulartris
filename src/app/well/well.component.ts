import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { AbstractWell, AbstractPiece } from '../AbstractGame/AbstractGame';

@Component({
  selector: 'app-well',
  templateUrl: './well.component.html',
  styleUrls: ['./well.component.scss']
})
export class WellComponent implements OnInit {
  private well: AbstractWell;
  private currentPiece: AbstractPiece;
  blocks: number[][];

  constructor(private game: GameService) { }

  ngOnInit() {
    this.game.oCurrentPiece.subscribe(this.getCurrentPiece.bind(this));
    this.well = this.game.getWell();
  }

  getCurrentPiece(piece): void {
    this.currentPiece = piece;
    this.blocks = piece.getAbsoluteXY();
  }

  ngOnChanges() {
  }

}

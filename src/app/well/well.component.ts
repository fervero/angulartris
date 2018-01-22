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
  bricks: number[][];
  public deadBricks: number[][];

  constructor(private game: GameService) { 
    game.oCurrentPiece.subscribe(this.getCurrentPiece.bind(this));
    game.oWell.subscribe(this.getCurrentWell.bind(this));
  }

  ngOnInit() {
    this.well = this.game.getWell();
  }

  getCurrentPiece(piece): void {
    this.currentPiece = piece;
    this.bricks = piece.getAbsoluteXY();
  }

  getCurrentWell(well): void {
    this.well = well;
    console.log(this.deadBricks = well.getDeadBricks());
  }

  ngOnChanges() {
  }

}

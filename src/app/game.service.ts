import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';
import { AbstractWell, AbstractPiece } from './AbstractGame/AbstractGame';
import { arrayCopy } from './AbstractGame/utils';

@Injectable()
export class GameService {
  private width: number;
  private currentPiece: AbstractPiece;
  private nextPiece: AbstractPiece;
  private well: AbstractWell;
  public oCurrentPiece: Subject<AbstractPiece>;
  public oNextPiece: Subject<AbstractPiece>;

  constructor() {
    this.oCurrentPiece = new Subject();
    this.oNextPiece = new Subject();
  }

  init(width: number = 10) {
    this.width = width;
    this.well = new AbstractWell(width);
    this.nextPiece = new AbstractPiece();
    this.getNewPiece();
  }

  updateCurrentPiece(piece: AbstractPiece): void {
    this.oCurrentPiece.next(this.currentPiece = piece);
  }

  updateNextPiece(piece: AbstractPiece): void {
    this.oNextPiece.next(this.nextPiece = piece);
  }

  getNewPiece(): void {
    this.updateCurrentPiece(this.well.pickUp(this.nextPiece));
    this.updateNextPiece(new AbstractPiece());
  }

  checkAndUpdatePiece(piece: AbstractPiece) {
    if(!this.well.collision(piece)) {
      this.updateCurrentPiece(piece);
    };
  }

  movePieceLeft(): void {
    const movedPiece = this.currentPiece.moveLeft();
    this.checkAndUpdatePiece(movedPiece);
  }

  movePieceRight(): void {
    const movedPiece = this.currentPiece.moveRight();
    this.checkAndUpdatePiece(movedPiece);
  }

  rotatePiece(): void {
    const movedPiece = this.currentPiece.rotate();
    this.checkAndUpdatePiece(movedPiece);
  }

  getWell(): AbstractWell {
    return arrayCopy(this.well);
  }

}

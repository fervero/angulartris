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
  public oWell: Subject<AbstractWell>;

  constructor() {
    this.oCurrentPiece = new Subject();
    this.oNextPiece = new Subject();
    this.oWell = new Subject();
  }

  init(width: number = 10) {
    this.width = width;
    this.well = new AbstractWell(width);
    this.nextPiece = new AbstractPiece();
    this.getNewPiece();
  }

  updateWell(well): void {
    this.oWell.next(this.well = well);
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

  getAnotherPiece(): void {
    this.updateWell(this.well.putDown(this.currentPiece));
    this.getNewPiece();
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

  movePieceDown(): void {
    const movedPiece = this.currentPiece.moveDown();
    if (this.well.collision(movedPiece)) {
      this.getAnotherPiece();
    } else {
      this.checkAndUpdatePiece(movedPiece);
    }
  }

  rotatePiece(): void {
    const movedPiece = this.currentPiece.rotate();
    this.checkAndUpdatePiece(movedPiece);
  }

  getWell(): AbstractWell {
    return arrayCopy(this.well);
  }

}

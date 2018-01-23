import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';
import { AbstractWell, AbstractPiece } from './AbstractGame/AbstractGame';
import { arrayCopy } from './AbstractGame/utils';
import { GAME_OVER, LIVE, PAUSED } from './constants';

@Injectable()
export class GameService {
  private width: number;
  private currentPiece: AbstractPiece;
  public oCurrentPiece: Subject<AbstractPiece>;
  private nextPiece: AbstractPiece;
  public oNextPiece: Subject<AbstractPiece>;
  private well: AbstractWell;
  public oWell: Subject<AbstractWell>;
  private score: number;
  public oScore: Subject<number>;
  private state: string;
  public oState: Subject<string>;

  constructor() {
    this.score = 0;
    this.oScore = new Subject();
    this.state = '';
    this.oState = new Subject();
    this.oCurrentPiece = new Subject();
    this.oNextPiece = new Subject();
    this.well = new AbstractWell();
    this.oWell = new Subject();
    this.oState.subscribe(state => this.state = state);
  }

  init(width: number = 10) {
    this.width = width;
    this.updateWell(new AbstractWell(width));
    this.updateNextPiece(new AbstractPiece());
    this.getNewPiece();
    this.oScore.next(this.score = 0);
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

  updateState(state: string): void {
    this.oState.next(this.state = state);
  }

  getNewPiece(): void {
    this.updateState(LIVE);
    this.updateCurrentPiece(this.well.pickUp(this.nextPiece));
    this.updateNextPiece(new AbstractPiece());
  }

  getAnotherPiece(): void {
    const updatedWell = this.well.putDown(this.currentPiece);
    const fullLines = updatedWell.prune();
    const score = this.score + fullLines.number;
    this.updateWell(fullLines.well);
    this.getNewPiece();
    this.oScore.next(this.score = score);
    if (this.well.collision(this.currentPiece)) {
      this.updateState(GAME_OVER);
    }
  }

  checkAndUpdatePiece(piece: AbstractPiece) {
    if ((this.state === LIVE) && !this.well.collision(piece)) {
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
    if (this.state === GAME_OVER) return;
    const movedPiece = this.currentPiece.moveDown();
    if (this.well.collision(movedPiece)) {
      this.getAnotherPiece();
    } else {
      this.checkAndUpdatePiece(movedPiece);
    }
  }

  dropPiece(): void {
    let movedPiece = this.currentPiece;
    let temp;
    while (!this.well.collision(temp = movedPiece.moveDown())) {
      movedPiece = temp;
    }
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

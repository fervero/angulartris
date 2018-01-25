import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { of } from 'rxjs/observable/of';
import { AbstractWell, AbstractPiece, DEFAULT_WIDTH } from './AbstractGame/AbstractGame';
import { arrayCopy } from './AbstractGame/utils';
import { FIRST_GAME, GAME_OVER, LIVE, PAUSED } from './constants';

@Injectable()
export class GameService {
  private width: number;
  public oWidth: BehaviorSubject<number>;
  private currentPiece: AbstractPiece;
  public oCurrentPiece: Subject<AbstractPiece>;
  private nextPiece: AbstractPiece;
  public oNextPiece: Subject<AbstractPiece>;
  private well: AbstractWell;
  public oWell: Subject<AbstractWell>;
  public oScore: BehaviorSubject<number>;
  public state$: BehaviorSubject<string>;

  constructor() {
    this.oScore = new BehaviorSubject(0);
    this.state$ = new BehaviorSubject(FIRST_GAME);
    this.oCurrentPiece = new Subject();
    this.oNextPiece = new Subject();
    this.well = new AbstractWell();
    this.oWell = new Subject();
    this.oWidth = new BehaviorSubject(DEFAULT_WIDTH);
  }

  init(width: number = 10) {
    this.width = width;
    this.oWidth.next(width);
    this.updateWell(new AbstractWell(width));
    this.updateNextPiece(new AbstractPiece());
    this.getNewPiece();
    this.updateState(LIVE);
    this.oScore.next(0);
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
    this.state$.next(state);
  }

  getNewPiece(): void {
    this.updateCurrentPiece(this.well.pickUp(this.nextPiece));
    this.updateNextPiece(new AbstractPiece());
  }

  getAnotherPiece(): void {
    const updatedWell = this.well.putDown(this.currentPiece);
    const fullLines = updatedWell.prune();
    const score = this.oScore.getValue() + fullLines.number;
    this.updateWell(fullLines.well);
    this.getNewPiece();
    this.oScore.next(score);
    if (this.well.collision(this.currentPiece)) {
      this.updateState(GAME_OVER);
    }
  }

  checkAndUpdatePiece(piece: AbstractPiece) {
    if ((this.state$.getValue() === LIVE) && !this.well.collision(piece)) {
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
    if (this.state$.getValue() === GAME_OVER) return;
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

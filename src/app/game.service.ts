import { Injectable } from '@angular/core';
import { AbstractWell, AbstractPiece } from './AbstractGame/AbstractGame';

@Injectable()
export class GameService {

  constructor() { }

  getPiece(): AbstractPiece {
    return new AbstractPiece();
  }

}

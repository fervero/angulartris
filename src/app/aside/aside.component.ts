import { Component, OnInit, Input } from '@angular/core';
import { AbstractPiece } from '../AbstractGame/AbstractGame';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent implements OnInit {
  @Input() piece: AbstractPiece;
  blocks: number[][];
  constructor() { }

  ngOnInit() { }

  ngOnChanges() {
    this.blocks = this.piece.setPosition([2, 2]).getAbsoluteXY();
  }

}

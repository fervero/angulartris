import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private game: GameService) { }

  ngOnInit() {
  }

  left(): void {
    this.game.movePieceLeft();
  }

  right(): void {
    this.game.movePieceRight();
  }

  rotate(): void {
    this.game.rotatePiece();
  }

}

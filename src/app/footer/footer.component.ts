import { Component, OnInit, ElementRef } from '@angular/core';
import { GameService } from '../game.service';
import { GameControlService } from '../game-control.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import { LEFT, RIGHT, ROTATE } from '../constants';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  readonly LEFT = LEFT;
  readonly RIGHT = RIGHT;
  readonly ROTATE = ROTATE;

  constructor(private game: GameService, private control: GameControlService, private ref: ElementRef) {}

  ngOnInit() {
    const button$ = Observable.fromEvent(this.ref.nativeElement, 'click')
      .map(({target}) => target.dataset.action);
    this.control.bindUIObservable(button$);
  }

}

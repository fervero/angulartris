import { Component, OnInit, Input, HostListener } from '@angular/core';
import { GameControlService } from '../game-control.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-modal',
  template: '<span><ng-content></ng-content></span>',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() action: string;
  click$: Subject<string>;

  constructor(private control: GameControlService) {
    this.click$ = new Subject();
   }

  ngOnInit() {
    this.control.bindUIObservable(this.click$);
  }

  @HostListener('click') onclick() {
    this.click$.next(this.action);
  }

}

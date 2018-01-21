import { Component, OnInit, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'app-brick',
  templateUrl: './brick.component.html',
  styleUrls: ['./brick.component.scss']
})
export class BrickComponent implements OnInit {
  @Input() height: number;
  @Input() width: number;
  @Input() x: number;
  @Input() y: number;
  @Input() styling: string;
  style: any;

  constructor(el: ElementRef) {
    this.style = el.nativeElement.style;
  }

  ngOnInit() { }

  ngOnChanges() {
    this.style.width = this.width + "%";
    this.style.height = this.height + "%";
    this.style.position = "absolute";
    this.style.display = "block";
    this.style.backgroundColor = "black";
    this.style.top = (this.y - 2) * this.height + "%";
    console.log(this.style.left = this.x * this.width + "%");
  }

}

/*
import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appBrick]'
})
export class BrickDirective {
  @Input() height: number;
  @Input() width: number;
  @Input() x: number;
  @Input() y: number;
  @Input() styling: string;
  constructor(private el: ElementRef) { 
  }
  ngAfterViewInit() {
  // ngAfterViewChecked() {
    const $el = this.el.nativeElement;
    console.log("width: ", this.width);
    $el.style.width = this.width;
    $el.style.height = this.height;
    $el.style.backgroundColor = "black";
    $el.style.top = (this.y - 2) * this.height + "%";
    $el.style.left = this.x * this.width + "%";
    console.log($el.style);
  }
}
*/
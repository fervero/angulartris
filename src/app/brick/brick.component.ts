import { Component, OnInit, Input, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-brick',
  template: "",
  styleUrls: ['./brick.component.scss']
})
export class BrickComponent implements OnInit {
  @Input() height: number;
  @Input() width: number;
  @Input() x: number;
  @Input() y: number;
  @Input() styling: string;
  style: any;

  constructor(private el: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit() { 
    if(this.styling === "brick_dead") {
      const newStyle = { 
        transform: `rotate( ${Math.round((Math.random() * 18 - 9))}deg)`,
        backgroundPosition: `${(Math.random() * 80 + 10).toFixed(2)}% ${(Math.random() * 80 + 10).toFixed(2)}%`
      };
      Object.assign(this.style, newStyle);
    }
  }

  ngOnChanges() {
    const nativeElement = this.el.nativeElement;
    this.style = nativeElement.style;
    this.style.width = this.width + "%";
    this.style.height = this.height + "%";
    this.renderer.addClass(nativeElement, "brick");
    this.renderer.addClass(this.el.nativeElement, this.styling);
    this.style.top = (this.y - 2) * this.height + "%";
    this.style.left = this.x * this.width + "%";
  }

}
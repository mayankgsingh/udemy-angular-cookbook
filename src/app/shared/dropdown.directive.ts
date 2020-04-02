import { Directive, HostListener, HostBinding, ElementRef, Renderer2, Input } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})

export class DropdownDirective {
  @HostBinding('class.show') isOpen = false;
  @Input("id") id:string;

  constructor(private eleRef: ElementRef, private renderer: Renderer2) {

  }

  @HostListener('click', ['$event']) toggleOpen(event: Event) {
    this.isOpen = !this.isOpen;

    const currentElement = this.eleRef.nativeElement;
    const nextEl = this.renderer.nextSibling(currentElement);
    //console.log(nextEl);

    if(this.isOpen) {
      this.renderer.addClass(nextEl , "show");
    } else {
      this.renderer.removeClass(nextEl , "show");
    }
  }
}

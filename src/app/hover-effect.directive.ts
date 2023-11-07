import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appHoverEffect]'
})
export class HoverEffectDirective {

  constructor() { }
  @HostBinding('style.transform') transform: string;
  @HostBinding('style.transition') transition: string = 'transform 0.3s ease';

  @HostListener('mouseenter') onMouseEnter() {
    this.transform = 'scale(1.1)';//this will give value for the tranform local variable
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.transform = 'scale(1)';
  }

}

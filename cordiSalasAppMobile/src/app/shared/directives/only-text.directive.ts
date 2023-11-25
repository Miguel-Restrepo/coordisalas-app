import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({ selector: '[onlyText]' })
export class OnlyTextDirective {
  protected regex: RegExp = new RegExp(/^[a-zA-ZÁáÉéÍíÓóÚúÜü ]+$/);
  protected specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home'];

  //@Input() allowedOnlyText: boolean;

  constructor(protected el: ElementRef) { }

  @HostListener('keypress', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (
      this.specialKeys.indexOf(event.key) !== -1 
      //|| !this.allowedOnlyText
    ) {
      return;
    }

    const current: string = this.el.nativeElement.value;

    const next: string = current.concat(event.key);
    if (next && !String(next).match(this.regex)) {
      event.preventDefault();
    }
  }
}

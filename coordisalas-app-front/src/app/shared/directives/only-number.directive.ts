import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({ selector: '[onlyNumber]' })
export class OnlyNumberDirective {
  protected regex: RegExp = new RegExp(/^\d*$/g);
  protected specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home'];

  @Input() allowedOnlyNumbers: boolean;

  constructor(protected el: ElementRef) { }

  @HostListener('keypress', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (
      this.specialKeys.indexOf(event.key) !== -1 ||
      !this.allowedOnlyNumbers
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

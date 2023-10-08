import { NgModule } from '@angular/core';
import { SHARED_COMPONENTS, SHARED_DIRECTIVES } from '.';

@NgModule({
  imports: [],
  declarations: [...SHARED_COMPONENTS, ...SHARED_DIRECTIVES],
  exports: [
    ...SHARED_COMPONENTS,
    ...SHARED_DIRECTIVES,
  ],
  providers: [],
})
export class SharedModule { }

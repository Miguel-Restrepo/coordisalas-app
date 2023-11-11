import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeBussyComponent } from './calendar/time-bussy/time-bussy.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    TimeBussyComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports:[
    TimeBussyComponent
  ]
})
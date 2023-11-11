import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeBussyComponent } from './time-bussy.component';

describe('TimeBussyComponent', () => {
  let component: TimeBussyComponent;
  let fixture: ComponentFixture<TimeBussyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeBussyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeBussyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

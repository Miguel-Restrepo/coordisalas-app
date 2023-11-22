import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRequestRoomComponent } from './edit-request-room.component';

describe('EditRequestRoomComponent', () => {
  let component: EditRequestRoomComponent;
  let fixture: ComponentFixture<EditRequestRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditRequestRoomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditRequestRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

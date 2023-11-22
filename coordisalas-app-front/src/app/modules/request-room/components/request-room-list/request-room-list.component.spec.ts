import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestRoomListComponent } from './request-room-list.component';

describe('RequestRoomListComponent', () => {
  let component: RequestRoomListComponent;
  let fixture: ComponentFixture<RequestRoomListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestRoomListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestRoomListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

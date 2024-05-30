import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimetableEventComponent } from './timetable-event.component';

describe('TimetableEventComponent', () => {
  let component: TimetableEventComponent;
  let fixture: ComponentFixture<TimetableEventComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TimetableEventComponent]
    });
    fixture = TestBed.createComponent(TimetableEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

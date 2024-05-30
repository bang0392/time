import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowViewTimetableComponent } from './show-view-timetable.component';

describe('ShowViewTimetableComponent', () => {
  let component: ShowViewTimetableComponent;
  let fixture: ComponentFixture<ShowViewTimetableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowViewTimetableComponent]
    });
    fixture = TestBed.createComponent(ShowViewTimetableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

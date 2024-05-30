import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsEditTimetableComponent } from './details-edit-timetable.component';

describe('DetailsEditTimetableComponent', () => {
  let component: DetailsEditTimetableComponent;
  let fixture: ComponentFixture<DetailsEditTimetableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsEditTimetableComponent]
    });
    fixture = TestBed.createComponent(DetailsEditTimetableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

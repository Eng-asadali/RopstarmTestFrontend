import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtodaypinsComponent } from './addtodaypins.component';

describe('AddtodaypinsComponent', () => {
  let component: AddtodaypinsComponent;
  let fixture: ComponentFixture<AddtodaypinsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddtodaypinsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddtodaypinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

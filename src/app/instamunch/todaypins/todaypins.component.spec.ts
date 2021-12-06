import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodaypinsComponent } from './todaypins.component';

describe('TodaypinsComponent', () => {
  let component: TodaypinsComponent;
  let fixture: ComponentFixture<TodaypinsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodaypinsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodaypinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

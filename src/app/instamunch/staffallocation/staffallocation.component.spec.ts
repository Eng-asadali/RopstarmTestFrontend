import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffallocationComponent } from './staffallocation.component';

describe('StaffallocationComponent', () => {
  let component: StaffallocationComponent;
  let fixture: ComponentFixture<StaffallocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffallocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffallocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

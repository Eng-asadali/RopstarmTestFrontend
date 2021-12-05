import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddstaffallocationComponent } from './addstaffallocation.component';

describe('AddstaffallocationComponent', () => {
  let component: AddstaffallocationComponent;
  let fixture: ComponentFixture<AddstaffallocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddstaffallocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddstaffallocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

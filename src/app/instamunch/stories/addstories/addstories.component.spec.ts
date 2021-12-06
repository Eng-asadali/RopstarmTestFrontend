import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddstoriesComponent } from './addstories.component';

describe('AddstoriesComponent', () => {
  let component: AddstoriesComponent;
  let fixture: ComponentFixture<AddstoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddstoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddstoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

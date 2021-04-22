import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddparentcategoryComponent } from './addparentcategory.component';

describe('AddparentcategoryComponent', () => {
  let component: AddparentcategoryComponent;
  let fixture: ComponentFixture<AddparentcategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddparentcategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddparentcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

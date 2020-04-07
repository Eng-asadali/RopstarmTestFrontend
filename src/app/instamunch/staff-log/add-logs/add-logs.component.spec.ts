import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLogsComponent } from './add-logs.component';

describe('AddLogsComponent', () => {
  let component: AddLogsComponent;
  let fixture: ComponentFixture<AddLogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

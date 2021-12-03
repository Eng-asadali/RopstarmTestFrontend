import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QrcodegenerateComponent } from './qrcodegenerate.component';

describe('QrcodegenerateComponent', () => {
  let component: QrcodegenerateComponent;
  let fixture: ComponentFixture<QrcodegenerateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QrcodegenerateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QrcodegenerateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryVendorAddComponent } from './inventory-vendor-add.component';

describe('InventoryVendorAddComponent', () => {
  let component: InventoryVendorAddComponent;
  let fixture: ComponentFixture<InventoryVendorAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryVendorAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryVendorAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

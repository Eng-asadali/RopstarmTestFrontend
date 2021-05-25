import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryVendorComponent } from './inventory-vendor.component';

describe('InventoryVendorComponent', () => {
  let component: InventoryVendorComponent;
  let fixture: ComponentFixture<InventoryVendorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryVendorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

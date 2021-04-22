import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryParentComponent } from './inventoryparent.component';

describe('InventoryComponent', () => {
  let component: InventoryParentComponent;
  let fixture: ComponentFixture<InventoryParentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryParentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

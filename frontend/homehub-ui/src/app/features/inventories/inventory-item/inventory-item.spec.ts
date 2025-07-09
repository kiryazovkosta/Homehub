import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryItem } from './inventory-item';

describe('InventoryItem', () => {
  let component: InventoryItem;
  let fixture: ComponentFixture<InventoryItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventoryItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

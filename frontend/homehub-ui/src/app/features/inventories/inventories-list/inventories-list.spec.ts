import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoriesList } from './inventories-list';

describe('InventoriesList', () => {
  let component: InventoriesList;
  let fixture: ComponentFixture<InventoriesList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventoriesList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoriesList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

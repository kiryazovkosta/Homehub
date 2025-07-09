import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillItem } from './bill-item';

describe('BillItem', () => {
  let component: BillItem;
  let fixture: ComponentFixture<BillItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BillItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

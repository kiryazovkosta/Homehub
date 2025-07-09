import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceItem } from './finance-item';

describe('FinanceItem', () => {
  let component: FinanceItem;
  let fixture: ComponentFixture<FinanceItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinanceItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinanceItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

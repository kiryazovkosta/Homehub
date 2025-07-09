import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancesList } from './finances-list';

describe('FinancesList', () => {
  let component: FinancesList;
  let fixture: ComponentFixture<FinancesList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinancesList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinancesList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

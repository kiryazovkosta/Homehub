import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillsList } from './bills-list';

describe('BillsList', () => {
  let component: BillsList;
  let fixture: ComponentFixture<BillsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BillsList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillsList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

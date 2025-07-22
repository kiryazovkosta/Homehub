import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionalityItem } from './functionality-item';

describe('FunctionalityItem', () => {
  let component: FunctionalityItem;
  let fixture: ComponentFixture<FunctionalityItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FunctionalityItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FunctionalityItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

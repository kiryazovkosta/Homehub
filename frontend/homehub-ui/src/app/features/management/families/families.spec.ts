import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Families } from './families';

describe('Families', () => {
  let component: Families;
  let fixture: ComponentFixture<Families>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Families]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Families);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

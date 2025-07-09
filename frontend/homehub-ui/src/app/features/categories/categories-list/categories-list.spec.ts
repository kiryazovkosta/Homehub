import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesList } from './categories-list';

describe('CategoriesList', () => {
  let component: CategoriesList;
  let fixture: ComponentFixture<CategoriesList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriesList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriesList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

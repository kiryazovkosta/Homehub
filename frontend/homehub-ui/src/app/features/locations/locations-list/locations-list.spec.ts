import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationsList } from './locations-list';

describe('LocationsList', () => {
  let component: LocationsList;
  let fixture: ComponentFixture<LocationsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocationsList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationsList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

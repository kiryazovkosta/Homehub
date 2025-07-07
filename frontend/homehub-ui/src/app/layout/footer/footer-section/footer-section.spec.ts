import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterSection } from './footer-section';

describe('FooterSection', () => {
  let component: FooterSection;
  let fixture: ComponentFixture<FooterSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderSection } from './header-section';

describe('HeaderSection', () => {
  let component: HeaderSection;
  let fixture: ComponentFixture<HeaderSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

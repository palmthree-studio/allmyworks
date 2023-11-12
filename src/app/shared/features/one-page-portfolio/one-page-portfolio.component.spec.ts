import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnePagePortfolioComponent } from './one-page-portfolio.component';

describe('OnePagePortfolioComponent', () => {
  let component: OnePagePortfolioComponent;
  let fixture: ComponentFixture<OnePagePortfolioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OnePagePortfolioComponent]
    });
    fixture = TestBed.createComponent(OnePagePortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

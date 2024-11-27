import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppproductComponent } from './appproduct.component';

describe('AppproductComponent', () => {
  let component: AppproductComponent;
  let fixture: ComponentFixture<AppproductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppproductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelSliderComponent } from './model-slider.component';

describe('ModelSliderComponent', () => {
  let component: ModelSliderComponent;
  let fixture: ComponentFixture<ModelSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModelSliderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModelSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

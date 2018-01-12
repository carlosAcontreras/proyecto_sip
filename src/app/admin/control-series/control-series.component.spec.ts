import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlSeriesComponent } from './control-series.component';

describe('ControlSeriesComponent', () => {
  let component: ControlSeriesComponent;
  let fixture: ComponentFixture<ControlSeriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlSeriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

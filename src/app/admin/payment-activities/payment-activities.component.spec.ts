import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentActivitiesComponent } from './payment-activities.component';

describe('PaymentActivitiesComponent', () => {
  let component: PaymentActivitiesComponent;
  let fixture: ComponentFixture<PaymentActivitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentActivitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

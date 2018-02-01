import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MassiveWithdrawalsComponent } from './massive-withdrawals.component';

describe('MassiveWithdrawalsComponent', () => {
  let component: MassiveWithdrawalsComponent;
  let fixture: ComponentFixture<MassiveWithdrawalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MassiveWithdrawalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MassiveWithdrawalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

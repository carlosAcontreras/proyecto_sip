import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalDetailsComponent } from './external-details.component';

describe('ExternalDetailsComponent', () => {
  let component: ExternalDetailsComponent;
  let fixture: ComponentFixture<ExternalDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExternalDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExternalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsOperationsComponent } from './details-operations.component';

describe('DetailsOperationsComponent', () => {
  let component: DetailsOperationsComponent;
  let fixture: ComponentFixture<DetailsOperationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsOperationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

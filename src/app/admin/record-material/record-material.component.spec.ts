import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordMaterialComponent } from './record-material.component';

describe('RecordMaterialComponent', () => {
  let component: RecordMaterialComponent;
  let fixture: ComponentFixture<RecordMaterialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordMaterialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

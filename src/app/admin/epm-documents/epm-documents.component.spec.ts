import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EpmDocumentsComponent } from './epm-documents.component';

describe('EpmDocumentsComponent', () => {
  let component: EpmDocumentsComponent;
  let fixture: ComponentFixture<EpmDocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EpmDocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EpmDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

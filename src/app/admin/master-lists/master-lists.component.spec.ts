import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterListsComponent } from './master-lists.component';

describe('MasterListsComponent', () => {
  let component: MasterListsComponent;
  let fixture: ComponentFixture<MasterListsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterListsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

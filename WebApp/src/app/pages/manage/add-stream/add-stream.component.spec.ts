import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStreamComponent } from './add-stream.component';

describe('AddStreamComponent', () => {
  let component: AddStreamComponent;
  let fixture: ComponentFixture<AddStreamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddStreamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

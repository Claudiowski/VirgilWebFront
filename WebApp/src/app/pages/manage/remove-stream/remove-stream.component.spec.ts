import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveStreamComponent } from './remove-stream.component';

describe('RemoveStreamComponent', () => {
  let component: RemoveStreamComponent;
  let fixture: ComponentFixture<RemoveStreamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoveStreamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveStreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

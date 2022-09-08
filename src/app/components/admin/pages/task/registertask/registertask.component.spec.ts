import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistertaskComponent } from './registertask.component';

describe('RegistertaskComponent', () => {
  let component: RegistertaskComponent;
  let fixture: ComponentFixture<RegistertaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistertaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistertaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteractivityComponent } from './registeractivity.component';

describe('RegisteractivityComponent', () => {
  let component: RegisteractivityComponent;
  let fixture: ComponentFixture<RegisteractivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisteractivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisteractivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

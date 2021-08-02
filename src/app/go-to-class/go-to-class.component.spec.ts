import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoToClassComponent } from './go-to-class.component';

describe('GoToClassComponent', () => {
  let component: GoToClassComponent;
  let fixture: ComponentFixture<GoToClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoToClassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoToClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

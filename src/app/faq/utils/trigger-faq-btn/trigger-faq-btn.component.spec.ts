import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TriggerFaqBtnComponent } from './trigger-faq-btn.component';

describe('TriggerFaqBtnComponent', () => {
  let component: TriggerFaqBtnComponent;
  let fixture: ComponentFixture<TriggerFaqBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TriggerFaqBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TriggerFaqBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

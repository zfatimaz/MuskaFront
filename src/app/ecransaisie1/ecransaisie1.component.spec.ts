import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ecransaisie1Component } from './ecransaisie1.component';

describe('Ecransaisie1Component', () => {
  let component: Ecransaisie1Component;
  let fixture: ComponentFixture<Ecransaisie1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Ecransaisie1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Ecransaisie1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

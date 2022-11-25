import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ecransaisie2Component } from './ecransaisie2.component';

describe('Ecransaisie2Component', () => {
  let component: Ecransaisie2Component;
  let fixture: ComponentFixture<Ecransaisie2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Ecransaisie2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Ecransaisie2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ecransaisie2ListComponent } from './ecransaisie2-list.component';

describe('Ecransaisie2ListComponent', () => {
  let component: Ecransaisie2ListComponent;
  let fixture: ComponentFixture<Ecransaisie2ListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Ecransaisie2ListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Ecransaisie2ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

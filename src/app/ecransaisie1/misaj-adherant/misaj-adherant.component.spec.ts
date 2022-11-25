import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisajAdherantComponent } from './misaj-adherant.component';

describe('MisajAdherantComponent', () => {
  let component: MisajAdherantComponent;
  let fixture: ComponentFixture<MisajAdherantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisajAdherantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MisajAdherantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SouscriptionppComponent } from './souscriptionpp.component';

describe('SouscriptionppComponent', () => {
  let component: SouscriptionppComponent;
  let fixture: ComponentFixture<SouscriptionppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SouscriptionppComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SouscriptionppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

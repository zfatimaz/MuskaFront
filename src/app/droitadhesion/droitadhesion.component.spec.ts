import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DroitadhesionComponent } from './droitadhesion.component';

describe('DroitadhesionComponent', () => {
  let component: DroitadhesionComponent;
  let fixture: ComponentFixture<DroitadhesionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DroitadhesionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DroitadhesionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

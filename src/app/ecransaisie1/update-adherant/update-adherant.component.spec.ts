import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAdherantComponent } from './update-adherant.component';

describe('UpdateAdherantComponent', () => {
  let component: UpdateAdherantComponent;
  let fixture: ComponentFixture<UpdateAdherantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateAdherantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAdherantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

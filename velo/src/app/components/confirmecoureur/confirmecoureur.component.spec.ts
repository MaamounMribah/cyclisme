import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmecoureurComponent } from './confirmecoureur.component';

describe('ConfirmecoureurComponent', () => {
  let component: ConfirmecoureurComponent;
  let fixture: ComponentFixture<ConfirmecoureurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmecoureurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmecoureurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

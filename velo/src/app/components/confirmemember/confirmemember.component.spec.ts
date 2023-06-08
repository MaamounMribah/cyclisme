import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmememberComponent } from './confirmemember.component';

describe('ConfirmememberComponent', () => {
  let component: ConfirmememberComponent;
  let fixture: ComponentFixture<ConfirmememberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmememberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmememberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

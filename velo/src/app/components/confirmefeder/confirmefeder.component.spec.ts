import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmefederComponent } from './confirmefeder.component';

describe('ConfirmefederComponent', () => {
  let component: ConfirmefederComponent;
  let fixture: ComponentFixture<ConfirmefederComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmefederComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmefederComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorieveloComponent } from './categorievelo.component';

describe('CategorieveloComponent', () => {
  let component: CategorieveloComponent;
  let fixture: ComponentFixture<CategorieveloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategorieveloComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategorieveloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

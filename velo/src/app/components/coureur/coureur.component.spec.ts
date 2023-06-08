import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoureurComponent } from './coureur.component';

describe('CoureurComponent', () => {
  let component: CoureurComponent;
  let fixture: ComponentFixture<CoureurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoureurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoureurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

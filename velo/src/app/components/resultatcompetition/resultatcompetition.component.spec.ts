import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultatcompetitionComponent } from './resultatcompetition.component';

describe('ResultatcompetitionComponent', () => {
  let component: ResultatcompetitionComponent;
  let fixture: ComponentFixture<ResultatcompetitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultatcompetitionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultatcompetitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

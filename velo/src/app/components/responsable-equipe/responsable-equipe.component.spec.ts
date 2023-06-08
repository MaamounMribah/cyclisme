import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsableEquipeComponent } from './responsable-equipe.component';

describe('ResponsableEquipeComponent', () => {
  let component: ResponsableEquipeComponent;
  let fixture: ComponentFixture<ResponsableEquipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponsableEquipeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResponsableEquipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

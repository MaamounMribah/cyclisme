import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailmembreEquipeComponent } from './detailmembre-equipe.component';

describe('DetailmembreEquipeComponent', () => {
  let component: DetailmembreEquipeComponent;
  let fixture: ComponentFixture<DetailmembreEquipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailmembreEquipeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailmembreEquipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

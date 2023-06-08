import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailresultatComponent } from './detailresultat.component';

describe('DetailresultatComponent', () => {
  let component: DetailresultatComponent;
  let fixture: ComponentFixture<DetailresultatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailresultatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailresultatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

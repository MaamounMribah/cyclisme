import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailcategorieveloComponent } from './detailcategorievelo.component';

describe('DetailcategorieveloComponent', () => {
  let component: DetailcategorieveloComponent;
  let fixture: ComponentFixture<DetailcategorieveloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailcategorieveloComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailcategorieveloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

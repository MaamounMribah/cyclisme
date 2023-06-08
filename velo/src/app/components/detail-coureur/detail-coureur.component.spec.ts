import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCoureurComponent } from './detail-coureur.component';

describe('DetailCoureurComponent', () => {
  let component: DetailCoureurComponent;
  let fixture: ComponentFixture<DetailCoureurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailCoureurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailCoureurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

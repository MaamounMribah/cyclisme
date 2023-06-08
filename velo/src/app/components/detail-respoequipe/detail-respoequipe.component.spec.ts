import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailRespoequipeComponent } from './detail-respoequipe.component';

describe('DetailRespoequipeComponent', () => {
  let component: DetailRespoequipeComponent;
  let fixture: ComponentFixture<DetailRespoequipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailRespoequipeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailRespoequipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

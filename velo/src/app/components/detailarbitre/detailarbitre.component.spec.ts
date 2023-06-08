import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailarbitreComponent } from './detailarbitre.component';

describe('DetailarbitreComponent', () => {
  let component: DetailarbitreComponent;
  let fixture: ComponentFixture<DetailarbitreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailarbitreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailarbitreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailRespfederaComponent } from './detail-respfedera.component';

describe('DetailRespfederaComponent', () => {
  let component: DetailRespfederaComponent;
  let fixture: ComponentFixture<DetailRespfederaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailRespfederaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailRespfederaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

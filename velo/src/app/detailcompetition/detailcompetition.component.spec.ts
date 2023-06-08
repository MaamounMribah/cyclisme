import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailcompetitionComponent } from './detailcompetition.component';

describe('DetailcompetitionComponent', () => {
  let component: DetailcompetitionComponent;
  let fixture: ComponentFixture<DetailcompetitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailcompetitionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailcompetitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

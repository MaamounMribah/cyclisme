import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsableFederationComponent } from './responsable-federation.component';

describe('ResponsableFederationComponent', () => {
  let component: ResponsableFederationComponent;
  let fixture: ComponentFixture<ResponsableFederationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponsableFederationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResponsableFederationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

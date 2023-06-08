import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembreFederationComponent } from './membre-federation.component';

describe('MembreFederationComponent', () => {
  let component: MembreFederationComponent;
  let fixture: ComponentFixture<MembreFederationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembreFederationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MembreFederationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

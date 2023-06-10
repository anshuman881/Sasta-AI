import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatlongComponent } from './latlong.component';

describe('LatlongComponent', () => {
  let component: LatlongComponent;
  let fixture: ComponentFixture<LatlongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LatlongComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LatlongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

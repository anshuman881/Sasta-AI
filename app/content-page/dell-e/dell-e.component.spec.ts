import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DellEComponent } from './dell-e.component';

describe('DellEComponent', () => {
  let component: DellEComponent;
  let fixture: ComponentFixture<DellEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DellEComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DellEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

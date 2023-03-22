import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WisperComponent } from './wisper.component';

describe('WisperComponent', () => {
  let component: WisperComponent;
  let fixture: ComponentFixture<WisperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WisperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WisperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

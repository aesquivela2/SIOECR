import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PingPongFormComponent } from './ping-pong-form.component';

describe('PingPongFormComponent', () => {
  let component: PingPongFormComponent;
  let fixture: ComponentFixture<PingPongFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PingPongFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PingPongFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});

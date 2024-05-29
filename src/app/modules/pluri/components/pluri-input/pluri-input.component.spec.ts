import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PluriInputComponent } from './pluri-input.component';

describe('PluriInputComponent', () => {
  let component: PluriInputComponent;
  let fixture: ComponentFixture<PluriInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PluriInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PluriInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should Pluri', () => {
    expect(component).toBeTruthy();
  });
});

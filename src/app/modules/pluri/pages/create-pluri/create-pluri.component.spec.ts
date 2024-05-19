import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePluriComponent } from './create-pluri.component';

describe('CreatePluriComponent', () => {
  let component: CreatePluriComponent;
  let fixture: ComponentFixture<CreatePluriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatePluriComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreatePluriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePluriComponent } from './update-pluri.component';

describe('UpdatePluriComponent', () => {
  let component: UpdatePluriComponent;
  let fixture: ComponentFixture<UpdatePluriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatePluriComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdatePluriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

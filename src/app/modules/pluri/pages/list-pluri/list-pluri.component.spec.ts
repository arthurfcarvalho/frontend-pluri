import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPluriComponent } from './list-pluri.component';

describe('ListPluriComponent', () => {
  let component: ListPluriComponent;
  let fixture: ComponentFixture<ListPluriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListPluriComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListPluriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

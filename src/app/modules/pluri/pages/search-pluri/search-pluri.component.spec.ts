import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPluriComponent } from './search-pluri.component';

describe('SearchPluriComponent', () => {
  let component: SearchPluriComponent;
  let fixture: ComponentFixture<SearchPluriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchPluriComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchPluriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

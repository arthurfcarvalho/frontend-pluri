import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTurmasComponent } from './search-turmas.component';

describe('SearchTurmasComponent', () => {
  let component: SearchTurmasComponent;
  let fixture: ComponentFixture<SearchTurmasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchTurmasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchTurmasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

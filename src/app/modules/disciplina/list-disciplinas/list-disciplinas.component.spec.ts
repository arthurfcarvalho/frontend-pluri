import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDisciplinasComponent } from './list-disciplinas.component';

describe('ListDisciplinasComponent', () => {
  let component: ListDisciplinasComponent;
  let fixture: ComponentFixture<ListDisciplinasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListDisciplinasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListDisciplinasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

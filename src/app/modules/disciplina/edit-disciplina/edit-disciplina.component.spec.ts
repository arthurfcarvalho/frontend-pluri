import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDisciplinaComponent } from './edit-disciplina.component';

describe('EditDisciplinaComponent', () => {
  let component: EditDisciplinaComponent;
  let fixture: ComponentFixture<EditDisciplinaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditDisciplinaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditDisciplinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarQuestaoComponent } from './editar-questao.component';

describe('EditarQuestaoComponent', () => {
  let component: EditarQuestaoComponent;
  let fixture: ComponentFixture<EditarQuestaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarQuestaoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarQuestaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarQuestaoAEnviarComponent } from './listar-questao-a-enviar.component';

describe('ListarQuestaoAEnviarComponent', () => {
  let component: ListarQuestaoAEnviarComponent;
  let fixture: ComponentFixture<ListarQuestaoAEnviarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarQuestaoAEnviarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListarQuestaoAEnviarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

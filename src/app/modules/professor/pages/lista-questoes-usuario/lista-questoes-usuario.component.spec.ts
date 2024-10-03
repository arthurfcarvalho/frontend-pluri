import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaQuestoesUsuarioComponent } from './lista-questoes-usuario.component';

describe('ListaQuestoesUsuarioComponent', () => {
  let component: ListaQuestoesUsuarioComponent;
  let fixture: ComponentFixture<ListaQuestoesUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaQuestoesUsuarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaQuestoesUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

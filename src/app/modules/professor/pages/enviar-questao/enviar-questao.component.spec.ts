import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnviarQuestaoComponent } from './enviar-questao.component';

describe('EnviarQuestaoComponent', () => {
  let component: EnviarQuestaoComponent;
  let fixture: ComponentFixture<EnviarQuestaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnviarQuestaoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnviarQuestaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

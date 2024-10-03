import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicacaoDocentesComponent } from './indicacao-docentes.component';

describe('IndicacaoDocentesComponent', () => {
  let component: IndicacaoDocentesComponent;
  let fixture: ComponentFixture<IndicacaoDocentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndicacaoDocentesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IndicacaoDocentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

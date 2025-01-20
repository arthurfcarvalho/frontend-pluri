import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaProvaComponent } from './lista-prova.component';

describe('ListaProvaComponent', () => {
  let component: ListaProvaComponent;
  let fixture: ComponentFixture<ListaProvaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaProvaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaProvaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

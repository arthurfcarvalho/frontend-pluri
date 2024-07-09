import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarPluriAreasComponent } from './listar-pluri-areas.component';

describe('ListarPluriAreasComponent', () => {
  let component: ListarPluriAreasComponent;
  let fixture: ComponentFixture<ListarPluriAreasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarPluriAreasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListarPluriAreasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

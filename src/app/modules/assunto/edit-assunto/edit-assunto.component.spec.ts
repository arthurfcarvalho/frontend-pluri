import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAssuntoComponent } from './edit-assunto.component';

describe('EditAssuntoComponent', () => {
  let component: EditAssuntoComponent;
  let fixture: ComponentFixture<EditAssuntoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditAssuntoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditAssuntoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

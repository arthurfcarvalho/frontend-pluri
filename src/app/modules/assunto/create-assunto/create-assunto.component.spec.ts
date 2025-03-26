import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAssuntoComponent } from './create-assunto.component';

describe('CreateAssuntoComponent', () => {
  let component: CreateAssuntoComponent;
  let fixture: ComponentFixture<CreateAssuntoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateAssuntoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateAssuntoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

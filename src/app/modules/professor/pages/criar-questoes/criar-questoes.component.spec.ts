import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateQuestionsComponent } from './criar-questoes.component';

describe('CreateQuestionsComponent', () => {
  let component: CreateQuestionsComponent;
  let fixture: ComponentFixture<CreateQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateQuestionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

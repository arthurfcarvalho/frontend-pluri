import { ComponentFixture, TestBed } from '@angular/core/testing';

import {DialogQuestionComponent } from './dialog-questao.component';

describe('DialogQuestaoComponent', () => {
  let component: DialogQuestionComponent;
  let fixture: ComponentFixture<DialogQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogQuestionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

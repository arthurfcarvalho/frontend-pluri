import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogQuestaoComponent } from './dialog-questao.component';

describe('DialogQuestaoComponent', () => {
  let component: DialogQuestaoComponent;
  let fixture: ComponentFixture<DialogQuestaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogQuestaoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogQuestaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

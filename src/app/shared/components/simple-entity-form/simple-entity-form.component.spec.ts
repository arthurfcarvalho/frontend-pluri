import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleEntityFormComponent } from './simple-entity-form.component';

describe('SimpleEntityFormComponent', () => {
  let component: SimpleEntityFormComponent;
  let fixture: ComponentFixture<SimpleEntityFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimpleEntityFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SimpleEntityFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

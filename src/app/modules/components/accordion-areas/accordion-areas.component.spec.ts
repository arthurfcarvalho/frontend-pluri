import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordionAreasComponent } from './accordion-areas.component';

describe('AccordionAreasComponent', () => {
  let component: AccordionAreasComponent;
  let fixture: ComponentFixture<AccordionAreasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccordionAreasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccordionAreasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

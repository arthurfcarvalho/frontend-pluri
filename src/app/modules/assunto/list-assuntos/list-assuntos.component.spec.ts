import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAssuntosComponent } from './list-assuntos.component';

describe('ListAssuntosComponent', () => {
  let component: ListAssuntosComponent;
  let fixture: ComponentFixture<ListAssuntosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListAssuntosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListAssuntosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermAssignmentComponent } from './perm-assignment.component';

describe('PermAssignmentComponent', () => {
  let component: PermAssignmentComponent;
  let fixture: ComponentFixture<PermAssignmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PermAssignmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PermAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

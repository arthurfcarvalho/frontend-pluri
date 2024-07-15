import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeniedAcessComponent } from './denied-acess.component';

describe('DeniedAcessComponent', () => {
  let component: DeniedAcessComponent;
  let fixture: ComponentFixture<DeniedAcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeniedAcessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeniedAcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

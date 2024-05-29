import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-create-layout',
  standalone: true,
  imports: [],
  templateUrl: './create-layout.component.html',
  styleUrl: './create-layout.component.scss'
})

export class CreateLayoutComponent {
  @Input() title: string = "";
  @Input() primaryBtnText = "";
  @Input() secondaryBtnText = "";
  @Input() disablePrimaryBtn: boolean = false;

  @Output("submit") onSubmit = new EventEmitter;
  @Output("navigate") onNavigate = new EventEmitter;

  submit() {
    this.onSubmit.emit();
  }

  navigate() {
    this.onNavigate.emit();
    }
}

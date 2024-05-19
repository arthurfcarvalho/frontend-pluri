import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';


type InputTypes = "text" | "email" | "password" | "date"

@Component({
  selector: 'app-pluri-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './pluri-input.component.html',
  styleUrl: './pluri-input.component.scss'
})
export class PluriInputComponent {

  @Input() type: InputTypes = "text";
  @Input() placeholder: string = "";
  @Input() label: string = "";
  @Input() inputName: string = "";

  value: string = '';
  onChange: any = () => {};
  onTouched: any = () => {};

  onInput(event: Event){
    const value = (event.target as HTMLInputElement).value;
    this.onChange(value);
  }


}

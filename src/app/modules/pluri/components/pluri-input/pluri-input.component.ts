import { Component, Input } from '@angular/core';
import { ControlValueAccessor, FormControl, FormControlName, ReactiveFormsModule } from '@angular/forms';


type InputTypes = "text" | "email" | "password" | "date"

@Component({
  selector: 'app-pluri-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './pluri-input.component.html',
  styleUrl: './pluri-input.component.scss'
})
export class PluriInputComponent implements ControlValueAccessor{

  @Input() formControlName: string = "";   
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

  writeValue(obj: any): void { }
  registerOnChange(fn: any): void { }
  registerOnTouched(fn: any): void { }
  setDisabledState?(isDisabled: boolean): void { }

}

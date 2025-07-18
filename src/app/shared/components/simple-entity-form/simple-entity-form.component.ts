import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { FieldsetModule } from 'primeng/fieldset';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { FieldConfig } from './field-config-model';
import { Router } from '@angular/router';
import { PickListModule } from 'primeng/picklist';

@Component({
  selector: 'app-simple-entity-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TranslateModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    ButtonModule,
    FieldsetModule,
    FloatLabelModule,
    ProgressSpinnerModule,
    PickListModule
  ],
  templateUrl: './simple-entity-form.component.html',
  styleUrl: './simple-entity-form.component.scss'
})
export class SimpleEntityFormComponent {
  @Input() form!: FormGroup;
  @Input() fields: FieldConfig[] = [];
  @Input() titleKey!: string;
  @Input() loading = false;
  @Input() cancelRedirectTo: string | null = null;

  @Output() submitForm = new EventEmitter<void>();
  @Output() cancelForm = new EventEmitter<void>();


  constructor(private router: Router) { }
  onSubmit(): void {
    this.submitForm.emit();
  }

  onCancel(): void {
    if (this.cancelRedirectTo) {
      this.router.navigate([this.cancelRedirectTo]);
    } else {
      history.back();
    }
    this.cancelForm.emit();
  }

  getPicklistTarget(field: FieldConfig): any[] {
    const values = this.form.get(field.formControlName)?.value || [];
    return field.options?.filter(opt =>
      values.includes(opt[field.optionValue || 'id'])
    ) || [];
  }

  getPicklistSource(field: FieldConfig): any[] {
    const values = this.form.get(field.formControlName)?.value || [];
    return field.options?.filter(opt =>
      !values.includes(opt[field.optionValue || 'id'])
    ) || [];
  }

  onMoveToTarget(controlName: string, movedItems: any[], optionValue = 'id'): void {
    const current = this.form.get(controlName)?.value || [];
    const added = movedItems.map(item => item[optionValue]);
    this.form.get(controlName)?.setValue([...current, ...added]);
  }

  onMoveToSource(controlName: string, movedItems: any[], optionValue = 'id'): void {
    const current = this.form.get(controlName)?.value || [];
    const removed = movedItems.map(item => item[optionValue]);
    const updated = current.filter((val: any) => !removed.includes(val));
    this.form.get(controlName)?.setValue(updated);
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AreaService } from '../../../services/area.service';
import { ToastrService } from 'ngx-toastr';
import { FieldsetModule } from 'primeng/fieldset';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CommonModule } from '@angular/common';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-area-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FieldsetModule,
    InputTextModule,
    ButtonModule,
    ProgressSpinnerModule,
    FloatLabelModule,
    InputTextareaModule,
    TranslateModule
  ],
  templateUrl: './area-form.component.html',
  styleUrl: './area-form.component.scss',
})
export class AreaFormComponent implements OnInit {
  areaForm!: FormGroup;
  areaId: number | null = null;
  isEditMode = false;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private areaService: AreaService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.areaId = Number(this.route.snapshot.paramMap.get('id'));
    this.isEditMode = !!this.areaId;

    this.areaForm = this.fb.group({
      nome: ['', Validators.required],
      descricao: ['', Validators.required],
      codigo: ['', Validators.required],
    });

    if (this.isEditMode) {
      this.loading = true;
      this.areaService.listarPorId(this.areaId!).subscribe(area => {
        this.areaForm.patchValue(area);
        this.loading = false;
      });
    }
  }

  submit(): void {
    if (this.areaForm.invalid) return;

    this.loading = true;
    const area = this.areaForm.value;

    const req = this.isEditMode
      ? this.areaService.editArea({ ...area, id: this.areaId })
      : this.areaService.createArea(area);

    req.subscribe({
      next: () => {
        const msgKey = this.isEditMode ? 'area.successEdit' : 'area.successCreate';
        this.toastr.success(this.translate.instant(msgKey));
        this.router.navigate(['/pesquisar-areas']);
      },
      error: () => {
        this.toastr.error(this.translate.instant('area.error'));
        this.loading = false;
      },
    });
  }

  cancel(): void {
    const destination = this.isEditMode ? '/pesquisar-areas' : '/';
    this.router.navigate([destination]);
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FieldConfig } from '../../../shared/components/simple-entity-form/field-config-model';
import { SimpleEntityFormComponent } from '../../../shared/components/simple-entity-form/simple-entity-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { AreaService } from '../../../services/area.service';

@Component({
  selector: 'app-area-form',
  standalone: true,
  imports: [
    SimpleEntityFormComponent
  ],
  templateUrl: './area-form.component.html',
  styleUrl: './area-form.component.scss',
})
export class AreaFormComponent implements OnInit {
  form!: FormGroup;
  fields: FieldConfig[] = [];
  isEditMode = false;
  areaId: number | null = null;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private areaService: AreaService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.areaId = Number(this.route.snapshot.paramMap.get('id'));
    this.isEditMode = !!this.areaId;

    this.form = this.fb.group({
      nome: ['', Validators.required],
      descricao: ['', Validators.required],
      codigo: ['', Validators.required]
    });

    this.fields = [
      { name: 'nome', labelKey: 'area.nameLabel', type: 'text', formControlName: 'nome' },
      { name: 'descricao', labelKey: 'area.descriptionLabel', type: 'textarea', formControlName: 'descricao' },
      { name: 'codigo', labelKey: 'area.codeLabel', type: 'text', formControlName: 'codigo' }
    ];

    if (this.isEditMode) {
      this.loading = true;
      this.areaService.listarPorId(this.areaId!).subscribe(area => {
        this.form.patchValue(area);
        this.loading = false;
      });
    }
  }

  submit(): void {
    if (this.form.invalid) return;
    this.loading = true;
    const area = this.form.value;

    const req = this.isEditMode
      ? this.areaService.editArea({ ...area, id: this.areaId })
      : this.areaService.createArea(area);

    req.subscribe({
      next: () => {
        const msg = this.isEditMode ? 'area.successEdit' : 'area.successCreate';
        this.toastr.success(this.translate.instant(msg));
        this.router.navigate(['/pesquisar-areas']);
      },
      error: () => {
        this.toastr.error(this.translate.instant('area.error'));
        this.loading = false;
      }
    });
  }
}

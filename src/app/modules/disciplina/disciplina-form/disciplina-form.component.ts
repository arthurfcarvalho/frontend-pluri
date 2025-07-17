import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FieldConfig } from '../../../shared/components/simple-entity-form/field-config-model';
import { ActivatedRoute, Router } from '@angular/router';
import { DisciplinaService } from '../../../services/disciplina.service';
import { AreaService } from '../../../services/area.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { SimpleEntityFormComponent } from '../../../shared/components/simple-entity-form/simple-entity-form.component';

@Component({
  selector: 'app-disciplina-form',
  standalone: true,
  imports: [
    SimpleEntityFormComponent
  ],
  templateUrl: './disciplina-form.component.html',
  styleUrl: './disciplina-form.component.scss'
})
export class DisciplinaFormComponent implements OnInit {
  form!: FormGroup;
  fields: FieldConfig[] = [];
  loading = false;
  isEditMode = false;
  disciplinaId: number | null = null;
  areaList: any[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private disciplinaService: DisciplinaService,
    private areaService: AreaService,
    private toastr: ToastrService,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.disciplinaId = Number(this.route.snapshot.paramMap.get('id'));
    this.isEditMode = !!this.disciplinaId;

    this.form = this.fb.group({
      nome: ['', Validators.required],
      area: [null, Validators.required]
    });

    this.loadAreas();

    if (this.isEditMode) {
      this.loading = true;
      this.disciplinaService.listById(this.disciplinaId!).subscribe(disciplina => {
        this.form.patchValue(disciplina);
        this.loading = false;
      });
    }
  }

  loadAreas(): void {
    this.areaService.returnAllAreas().subscribe(areas => {
      this.areaList = areas.content;

      this.fields = [
        { name: 'nome', labelKey: 'disciplina.nameLabel', type: 'text', formControlName: 'nome' },
        {
          name: 'area',
          labelKey: 'disciplina.areaLabel',
          type: 'dropdown',
          formControlName: 'area',
          options: this.areaList,
          optionLabel: 'nome'
        }
      ];
    });
  }

  submit(): void {
    if (this.form.invalid) return;

    this.loading = true;
    const disciplina = this.form.value;

    const request = this.isEditMode
      ? this.disciplinaService.editDisciplina({ ...disciplina, id: this.disciplinaId })
      : this.disciplinaService.createDisciplina(disciplina);

    request.subscribe({
      next: () => {
        const msgKey = this.isEditMode ? 'disciplina.successEdit' : 'disciplina.successCreate';
        this.toastr.success(this.translate.instant(msgKey));
        this.router.navigate(['/pesquisar-disciplinas']);
      },
      error: () => {
        this.toastr.error(this.translate.instant('disciplina.error'));
        this.loading = false;
      }
    });
  }
}

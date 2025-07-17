import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SimpleEntityFormComponent } from '../../../shared/components/simple-entity-form/simple-entity-form.component';
import { FieldConfig } from '../../../shared/components/simple-entity-form/field-config-model';
import { ActivatedRoute, Router } from '@angular/router';
import { AssuntoService } from '../../../services/assunto.service';
import { DisciplinaService } from '../../../services/disciplina.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-assunto-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    SimpleEntityFormComponent,
    TranslateModule
  ],
  templateUrl: './assunto-form.component.html',
  styleUrl: './assunto-form.component.scss'
})
export class AssuntoFormComponent implements OnInit {
  form!: FormGroup;
  fields: FieldConfig[] = [];
  loading = false;
  isEditMode = false;
  assuntoId: number | null = null;
  disciplineList: any[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private assuntoService: AssuntoService,
    private disciplinaService: DisciplinaService,
    private toastr: ToastrService,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.assuntoId = Number(this.route.snapshot.paramMap.get('id'));
    this.isEditMode = !!this.assuntoId;

    this.form = this.fb.group({
      nome: ['', Validators.required],
      disciplina: [null, Validators.required]
    });

    this.loadDisciplinas();

    if (this.isEditMode) {
      this.loading = true;
      this.assuntoService.findById(this.assuntoId!).subscribe(assunto => {
        this.form.patchValue(assunto);
        this.loading = false;
      });
    }
  }

  loadDisciplinas(): void {
    this.disciplinaService.listarDisciplinas().subscribe(disciplinas => {
      this.disciplineList = disciplinas.content;
      this.fields = [
        { name: 'nome', labelKey: 'assunto.nameLabel', type: 'text', formControlName: 'nome' },
        { name: 'disciplina', labelKey: 'assunto.disciplineLabel', type: 'dropdown', formControlName: 'disciplina', options: this.disciplineList, optionLabel: 'nome' }
      ];
    });
  }

  submit(): void {
    if (this.form.invalid) return;

    this.loading = true;
    const assunto = this.form.value;

    const request = this.isEditMode
      ? this.assuntoService.editAssunto({ ...assunto, id: this.assuntoId })
      : this.assuntoService.createAssunto(assunto);

    request.subscribe({
      next: () => {
        const msgKey = this.isEditMode ? 'assunto.successEdit' : 'assunto.successCreate';
        //this.toastr.success(this.translate.instant(msgKey));
        this.router.navigate(['/pesquisar-assuntos']);
      },
      error: () => {
        //this.toastr.error(this.translate.instant('assunto.error'));
        this.loading = false;
      }
    });
  }
}

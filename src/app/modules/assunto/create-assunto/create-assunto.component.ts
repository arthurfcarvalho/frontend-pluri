import { Component } from '@angular/core';
import {Button} from "primeng/button";
import {DropdownModule} from "primeng/dropdown";
import {FieldsetModule} from "primeng/fieldset";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {HeaderComponent} from "../../home/components/header/header.component";
import {InputTextModule} from "primeng/inputtext";
import {MultiSelectModule} from "primeng/multiselect";
import {DadosDetalhamentoArea} from "../../disciplina/models/dados-detalhamento-area.model";
import {Area} from "../../../models/Area.model";
import Assunto from "../../../models/Assunto.model";
import {AreaService} from "../../../services/area.service";
import {AssuntoService} from "../../../services/assunto.service";
import {Disciplina} from "../../disciplina/models/disciplina";
import {DisciplinaService} from "../../../services/disciplina.service";
import {provideToastr, ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-assunto',
  standalone: true,
    imports: [
        Button,
        DropdownModule,
        FieldsetModule,
        FormsModule,
        HeaderComponent,
        InputTextModule,
        MultiSelectModule,
        ReactiveFormsModule
    ],
  templateUrl: './create-assunto.component.html',
  styleUrl: './create-assunto.component.scss'
})
export class CreateAssuntoComponent {
  areaList: DadosDetalhamentoArea[] = [];
  disciplinaSelected!: Disciplina;
  assuntosList: Assunto[] = [];
  createAssuntoForm!: FormGroup;
  disciplinaList: Disciplina[] = [];

  constructor(private router: Router,private toastService: ToastrService, private disciplinaService: DisciplinaService, private formBuilder: FormBuilder, private areaService: AreaService, private assuntoService: AssuntoService) {
  }

  ngOnInit(): void {
    this.createAssuntoForm = this.formBuilder.group({
      nome: new FormControl('', Validators.required),
      disciplina: new FormControl(),
      codigo: new FormControl('', Validators.required)
    });
    this.loadAreas();
    this.loadAssuntos();
  }
  loadAreas() {
    this.areaService.returnAllAreas().subscribe(areas => {
      this.areaList = areas.content;
    })
  }

  submit() {
    this.createAssuntoForm.patchValue({disciplina: this.disciplinaSelected});

    this.assuntoService.createAssunto(this.createAssuntoForm.value).subscribe(
      data => {
        this.toastService.success("Assunto criado com sucesso!")
        this.router.navigate(['/pesquisar-assuntos']);
      },
      error => {
        console.log(error);
        this.toastService.error("Erro ao criar assunto!")
      }
    )
  }

  loadAssuntos() {
    this.disciplinaService.listarDisciplinas().subscribe(disciplinasRecebidas => {
      this.disciplinaList = disciplinasRecebidas.content;
    })
  }

  onDisciplinaChange(event: any) {
    this.disciplinaSelected = event.value;
  }
}

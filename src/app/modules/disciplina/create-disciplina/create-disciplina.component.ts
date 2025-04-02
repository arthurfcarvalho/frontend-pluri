import { Component } from '@angular/core';
import {Button} from "primeng/button";
import {FieldsetModule} from "primeng/fieldset";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {HeaderComponent} from "../../home/components/header/header.component";
import {InputTextModule} from "primeng/inputtext";
import {DropdownModule} from "primeng/dropdown";
import {AreaService} from "../../../services/area.service";
import {DadosDetalhamentoArea} from "../models/dados-detalhamento-area.model";
import {Area} from "../../../models/Area.model";
import {MultiSelectModule} from "primeng/multiselect";
import Assunto from "../../../models/Assunto.model";
import {AssuntoService} from "../../../services/assunto.service";
import {DisciplinaService} from "../../../services/disciplina.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-disciplina',
  standalone: true,
  imports: [
    Button,
    FieldsetModule,
    FormsModule,
    HeaderComponent,
    InputTextModule,
    ReactiveFormsModule,
    DropdownModule,
    MultiSelectModule
  ],
  templateUrl: './create-disciplina.component.html',
  styleUrl: './create-disciplina.component.scss'
})
export class CreateDisciplinaComponent {
  createDisciplinaForm!: FormGroup;
  areaList: DadosDetalhamentoArea[] = [];
  areaSelected!: Area;
  assuntosList: Assunto[] = [];

  constructor(private router: Router, private formBuilder: FormBuilder, private disciplinaService: DisciplinaService, private areaService: AreaService, private assuntoService: AssuntoService) {
  }

  ngOnInit(): void {
    this.createDisciplinaForm = this.formBuilder.group({
      nome: new FormControl('', Validators.required),
      area: new FormControl(''),
      assuntos: new FormControl(),
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
    this.disciplinaService.createDisciplina(this.createDisciplinaForm.value).subscribe(
      data => {
        console.log(data);
        this.router.navigate(['/pesquisar-disciplinas']);
      },
      error => {
        console.log(error);
      }
    )
  }

  loadAssuntos() {
    this.assuntoService.listarAssuntos().subscribe(assuntosRecebidos => {
      this.assuntosList = assuntosRecebidos.content;
    })
  }
  onAreaChange(event: any) {
    this.createDisciplinaForm.patchValue({ area: event.value });
  }
}

import { Component } from '@angular/core';
import {Button} from "primeng/button";
import {DropdownModule} from "primeng/dropdown";
import {FieldsetModule} from "primeng/fieldset";
import {HeaderComponent} from "../../home/components/header/header.component";
import {InputTextModule} from "primeng/inputtext";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {DadosDetalhamentoArea} from "../models/dados-detalhamento-area.model";
import Assunto from "../../../models/Assunto.model";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";
import {DisciplinaService} from "../../../services/disciplina.service";
import {AreaService} from "../../../services/area.service";
import {AssuntoService} from "../../../services/assunto.service";
import {Disciplina} from "../models/disciplina";

@Component({
  selector: 'app-edit-disciplina',
  standalone: true,
    imports: [
        Button,
        DropdownModule,
        FieldsetModule,
        HeaderComponent,
        InputTextModule,
        ReactiveFormsModule
    ],
  templateUrl: './edit-disciplina.component.html',
  styleUrl: './edit-disciplina.component.scss'
})
export class EditDisciplinaComponent {
  updateDisciplinaForm!: FormGroup;
  areaList: DadosDetalhamentoArea[] = [];
  assuntosList: Assunto[] = [];
  idDisciplina: number = 0;
  disciplina!: Disciplina;
  constructor(private route: ActivatedRoute, private toastService: ToastrService,private router: Router, private formBuilder: FormBuilder, private disciplinaService: DisciplinaService, private areaService: AreaService, private assuntoService: AssuntoService) {
    this.updateDisciplinaForm = this.formBuilder.group({
      id: new FormControl(0, Validators.required),
      nome: new FormControl('', Validators.required),
      area: new FormControl(),
    });
  }

  ngOnInit(): void {
    this.loadAreas()
    this.idDisciplina = Number(this.route.snapshot.paramMap.get('id'));
    if(this.idDisciplina){
      this.disciplinaService.listById(this.idDisciplina).subscribe(disciplinaRecebida => {
        this.disciplina = disciplinaRecebida;
        this.updateDisciplinaForm = this.formBuilder.group({
          id: this.disciplina?.id,
          nome: this.disciplina?.nome,
          area: this.disciplina?.area,
          assuntos: this.disciplina?.assuntos,
        });
        this.updateDisciplinaForm.patchValue({ area: this.disciplina.area });
      });

    }
  }
  loadAreas() {
    this.areaService.returnAllAreas().subscribe(areas => {
      this.areaList = areas.content;

      const areaSelecionada = this.areaList.find(
        area => area.id === this.disciplina.area.id
      );

      this.updateDisciplinaForm.patchValue({ area: areaSelecionada });
    })
  }

  submit() {
    const data = this.updateDisciplinaForm.value;
    this.disciplinaService.editDisciplina(data).subscribe(
      data => {
        this.router.navigate(['/pesquisar-disciplinas']);
        this.toastService.success("Disciplina atualizada com sucesso")
      },
      error => {
        console.log(error);
      }
    )
  }

  loadAssuntos() {
    this.assuntoService.listarAssuntos().subscribe(assuntosRecebidos => {
      this.assuntosList = assuntosRecebidos
    })
  }
  onAreaChange(event: any) {
    this.updateDisciplinaForm.patchValue({ area: event.value });
  }
}

import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pluri } from '../../../../models/Pluri.model';
import { PluriService } from '../../../../services/pluri.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-indicacao-docentes',
  standalone: true,
  imports: [],
  templateUrl: './indicacao-docentes.component.html',
  styleUrl: './indicacao-docentes.component.scss'
})
export class IndicacaoDocentesComponent {

  pluri!: Pluri;
  indicacaoDocentesForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private pluriService: PluriService,
    private toastService: ToastrService
  ){
    this.indicacaoDocentesForm = new FormGroup({
      id_pluri: new FormControl(),
      id_usuario: new FormControl(Validators.required),
      id_pluri_area: new FormControl(Validators.required),
      quant_questoes_pedidas: new FormControl(Validators.required)
    })
  }

  ngOnInit(){
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if(id){
      this.pluriService.searchPluriById(id).subscribe(pluri => {
        this.pluri = pluri;
      })
    }
  }

  submitIndicacaoDocentes(){
    this.indicacaoDocentesForm.value.id_pluri = this.pluri.id;
    this.pluriService.submitIndicacaoDocentes(this.indicacaoDocentesForm.value).subscribe({
      next: (value) => {
        this.toastService.success("Docente indicado com sucesso!");
      },
      error: (e) => {
        this.toastService.error("Erro ao indicar docente. Tente novamente!");
      },
    })
  }

}

import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PluriService } from '../../../../services/pluri.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-pluri',
  standalone: true,
  imports: [
  ],
  templateUrl: './create-pluri.component.html',
  styleUrl: './create-pluri.component.scss'
})
export class CreatePluriComponent {

  informacoesGeraisForm: FormGroup;
  atividadesComissaoForm: FormGroup;
  informacoesAplicacaoForm: FormGroup;

  constructor(
    private pluriService: PluriService,
    private toastService: ToastrService
  ){
    this.informacoesGeraisForm = new FormGroup({
      codigo: new FormControl('', Validators.required),
      trimestre: new FormControl('', Validators.required),
      ano_aplicacao: new FormControl('', Validators.required),
      data_inicio_pluri: new FormControl('', Validators.required),
      data_inicio_recuperacao: new FormControl('', Validators.required)
    });

    this.atividadesComissaoForm = new FormGroup({
      data_indicacao_docentes: new FormControl('', Validators.required),
      data_envio_questoes: new FormControl('', Validators.required),
      data_diagramacao: new FormControl('', Validators.required),
      data_revisao: new FormControl('', Validators.required),
      data_impressao: new FormControl('', Validators.required),
      data_ensalamento: new FormControl('', Validators.required),
      data_lancamento_notas: new FormControl('', Validators.required),
      data_correcao_redacao: new FormControl('', Validators.required),
      data_enviar_recurso: new FormControl('', Validators.required),
      data_analise_recurso: new FormControl('', Validators.required),
      data_atualizacao_notas: new FormControl('', Validators.required)
    })

    this.informacoesAplicacaoForm = new FormGroup({
      data_aplicacao: new FormControl('', Validators.required),
      data_reaplicacao: new FormControl('', Validators.required),
      data_divulgacao_notas: new FormControl('', Validators.required)
    })
  }

}

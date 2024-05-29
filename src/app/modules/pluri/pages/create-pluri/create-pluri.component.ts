import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PluriService } from '../../../../services/pluri.service';
import { ToastrService } from 'ngx-toastr';
import { HeaderComponent } from '../../../home/components/header/header.component';
import { StepperModule } from 'primeng/stepper';
import { CalendarModule } from 'primeng/calendar';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-create-pluri',
  standalone: true,
  imports: [
    HeaderComponent,
    StepperModule,
    ReactiveFormsModule,
    CalendarModule,
    FloatLabelModule,
    DropdownModule,
    InputTextModule
  ],
  templateUrl: './create-pluri.component.html',
  styleUrl: './create-pluri.component.scss'
})
export class CreatePluriComponent {

  informacoesGeraisForm: FormGroup;
  atividadesComissaoForm: FormGroup;
  informacoesAplicacaoForm: FormGroup;
  trimestreOptions = [
    {label: '1º Trimestre', value: 1},
    {label: '2º Trimestre', value: 2},
    {label: '3º Trimestre', value: 3},
    {label: '4º Trimestre', value: 4}
  ];

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
      data_aplicacao: new FormControl(''),
      data_reaplicacao: new FormControl(''),
      data_divulgacao_notas: new FormControl('')
    })
  }

  private extractYear(date: string): string {
    return new Date(date).getFullYear().toString();
  }

  submitInformacoesGerais(){

    const formValue = this.informacoesGeraisForm.value;

    formValue.ano_aplicacao = this.extractYear(formValue.ano_aplicacao);

    this.pluriService.createPluri(this.informacoesGeraisForm.value).subscribe({
      next: (value) => {
        this.toastService.success("Pluri criado com sucesso!");
      },
      error: (e) => {
        this.toastService.error("Erro ao criar o Pluri!");
      }
    });
  }

  submitAtividadesComissao(){
    this.pluriService.updateAtividadesComissao(this.atividadesComissaoForm.value).subscribe({
      next: (value) => {
        this.toastService.success("Informações das atividades da comissão atualizadas com sucesso!");
      },
      error: (e) => {
        this.toastService.error("Erro ao atualizar informações do Pluri");
      }
    });
  }

  submitInformacoesAplicacaoForm(){
    this.pluriService.updateInformacoesAplicacao(this.informacoesAplicacaoForm.value).subscribe({
      next:(value) => {
        this.toastService.success("Informações das atividades da aplicação do Pluri atualizadas com sucesso!");
      },
      error: (e) => {
        this.toastService.error("Erro ao atualizar informações do Pluri");
      }
    });
  }
}

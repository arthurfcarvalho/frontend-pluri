import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../../../services/login.service';
import { ToastrService } from 'ngx-toastr';
import { CreateLayoutComponent } from '../../components/create-layout/create-layout.component';
import { PluriInputComponent } from '../../components/pluri-input/pluri-input.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../../services/user.service';
import { PluriService } from '../../../../services/pluri.service';
import { DadosDetalhamentoPluri } from '../../models/DetailingPluriData.model';
import { CommonModule } from '@angular/common';

import { MatTabGroup } from '@angular/material/tabs';

@Component({
  selector: 'app-create-pluri',
  standalone: true,
  imports: [
    CreateLayoutComponent,
    PluriInputComponent,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './create-pluri.component.html',
  styleUrl: './create-pluri.component.scss'
})
export class CreatePluriComponent implements OnInit{
  @ViewChild(MatTabGroup) tabGroup!: MatTabGroup;
  informacoesGeraisForm!: FormGroup;
  atividadesComissaoForm!: FormGroup;
  informacoesAplicacaoForm!: FormGroup;
  idCriado = 0;


  constructor(
    private router: Router,
    private loginService: LoginService,
    private pluriService: PluriService,
    private userService: UserService,
    private toastService: ToastrService,
    private formBuilder: FormBuilder
  )
  {}


  ngOnInit(){
    this.inicializarFormulario();
  }
  submit() {
    
  }
  navigate() {
    this.router.navigate([""]);
  }

  envioInformacoesGeraisForm(){
    
    this.pluriService.criarPluri(this.informacoesGeraisForm.value).subscribe({
      next: (value: DadosDetalhamentoPluri) => {
        console.log("Cadastro Realizado",value),
        this.idCriado = value.id;
        console.log(this.idCriado)
      },error:(err) =>{console.log(this.informacoesGeraisForm.value),console.log("Error",err)}
    })
  }

  atualizarAtividadesDaComissaoForm(){
    this.pluriService.atualizarInformacoesComissao(this.atividadesComissaoForm.value).subscribe({
      next: (value) => {
        console.log("Atualizacao Realizada",value) 
        
      },error:(err) =>{console.log(this.atividadesComissaoForm.value),console.log("Error",err)}
    })
  }
  atualizarInformacoesAplicacaoForm(){
    
    this.pluriService.atualizarInformacoesComissao(this.informacoesAplicacaoForm.value).subscribe({
      next: (value) => {
        console.log("Atualizacao Realizada",value) 
        
      },error:(err) =>{console.log(this.informacoesAplicacaoForm.value),console.log("Error",err)}
    })
  }

  avancarParaProximaAba() {
    this.tabGroup.selectedIndex! += 1;
  }

  inicializarFormulario() {
    this.informacoesGeraisForm = this.formBuilder.group({
      codigo: '',
      trimestre: 1,
      ano_aplicacao: 2024,
      data_inicio_pluri: '',
      data_inicio_recuperacao: ''
    });
    this.atividadesComissaoForm = this.formBuilder.group({
      data_indicacao_docentes: '',
      data_envio_questoes: '',
      data_diagramacao: '',
      data_revisao: '',
      data_impressao: '',
      data_ensalamento: '',
      data_lancamento_notas: '',
      data_correcao_redacao: '',
      data_enviar_recurso: '',
      data_analise_recurso: '',
      data_atualizacao_notas: '',
    });
    this.informacoesAplicacaoForm = this.formBuilder.group({
      data_aplicacao: '',
      data_reaplicacao: '',
      data_divulgacao_notas: '',
      realizado: false
    })
  }
}

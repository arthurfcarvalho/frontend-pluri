import { Injectable } from "@angular/core";
import { TokenService } from "./token.service";
import { HttpClient } from "@angular/common/http";
import { catchError, map, Observable } from 'rxjs';
import { DadosPluriInformacoesGerais } from "../modules/pluri/models/GeneralInformationDataPluri.model";
import { DadosDetalhamentoPluri } from "../modules/pluri/models/DetailingPluriData.model";
import { DadosAtividadesDaComissao } from "../modules/pluri/models/ActivitisOfComissionData.model";
import { DadosAtualizarInformacoesGerais } from "../modules/pluri/models/UpdateGenerallnformation.model";
import { DadosAplicacaoPluri } from "../modules/pluri/models/ApplicationPluriData.model";
import { ApiResponsePage } from "../models/ApiResponsePage.model";
import { Pluri } from "../modules/pluri/models/Pluri.model";


@Injectable({
    providedIn: 'root'  
})
export class PluriService{
    
    baseUrl = "http://localhost:8080/pluri"
    constructor(private http: HttpClient, private tokenService: TokenService) { }

    criarPluri(dados: DadosPluriInformacoesGerais): Observable<DadosDetalhamentoPluri>{
        const url = this.baseUrl + '/criar-pluri'
        return this.http.post<DadosDetalhamentoPluri>(url, dados);
    }
    atualizarInformacoesComissao(dados: DadosAtividadesDaComissao){
        const url = this.baseUrl + '/atualizar-atividades-comissao'
        return this.http.put(url, dados);
    }
    atualizarInformacoesGerais(dados:DadosAtualizarInformacoesGerais){
        const url = this.baseUrl + '/atualizar-informacoes-gerais';
        return this.http.put(url,dados);
    }
    atualizarInformacoesAplicacao(dados: DadosAplicacaoPluri){
        const url = this.baseUrl + '/atualizar-informacoes-aplicacao'
        return this.http.put(url, dados)
    }

    listarPlurisNaoRealizados(): Observable<ApiResponsePage>{
        const url = this.baseUrl + '/listar-pluris-nao-realizados'
        return this.http.get<ApiResponsePage>(url).pipe(
            map(obj => obj))
    }
    listarPorId(id: number){
        const url = this.baseUrl + `/listar-pluri/${id}`;

        return this.http.get<Pluri>(url).pipe(
            map(obj => obj)
        )
    }
    editar(){
        
    }
}
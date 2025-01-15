import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RelatoriosService {

  private readonly baseUrl = `${environment.apiUrl}/relatorio/`;

  constructor(private http: HttpClient) {}

  /**
   * Gera o preview de uma questão.
   * @param dados Dados necessários para a geração do preview da questão.
   * @returns Observable contendo o arquivo gerado (formato Blob).
   */
  previewQuestao(dados: any): Observable<Blob>{

    const url = this.baseUrl + 'preview-questao';

    return this.http.post(url, dados,{ responseType: 'blob' });
  }

  /**
   * Gera o preview de um conjunto de questões a serem enviadas.
   * @param dados Dados necessários para a geração do preview das questões selecionadas.
   * @returns Observable contendo o arquivo PDF gerado (formato Blob).
   */
  previewQuestoesAEnviar(dados: any):Observable<Blob>{

    const url = this.baseUrl + 'gerar-pdf-questoes-selecionadas';

    return this.http.post(url, dados,{ responseType: 'blob' });
  }

  /**
   * Faz o download do arquivo em formato TeX com as questões selecionadas.
   * @param dados Dados necessários para gerar o arquivo TeX.
   * @returns Observable contendo o arquivo TeX gerado (formato Blob).
   */
  downloadArquivoTexQuestoes(dados: any): Observable<Blob>{
    const url = this.baseUrl + 'gerar-tex-questoes-selecionadas-download';

    return this.http.post(url, dados,{ responseType: 'blob' });
  }

  /**
   * Gera o preview de uma questão selecionada pelo ID.
   * @param id ID da questão a ser visualizada.
   * @returns Observable contendo o arquivo PDF gerado (formato Blob).
   */
  previewQuestaoSelecionada(id: number):Observable<Blob>{

    const url = this.baseUrl + 'gerar-pdf-questao-selecionada';

    return this.http.post(url, id,{ responseType: 'blob' });
  }

}

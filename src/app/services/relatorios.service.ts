import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RelatoriosService {

  baseUrl = "http://200.131.116.21:8081/relatorio";

  constructor(private http: HttpClient) { }

  previewQuestao(dados: any): Observable<Blob>{

    const url = this.baseUrl + '/preview-questao';

    return this.http.post(url, dados,{ responseType: 'blob' });
  }
  previewQuestoesAEnviar(dados: any):Observable<Blob>{
    
    const url = this.baseUrl + '/gerar-pdf-questoes-selecionadas';

    return this.http.post(url, dados,{ responseType: 'blob' });
  }


}

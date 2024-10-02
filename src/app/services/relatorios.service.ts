import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URLS } from '../../assets/constantes';

@Injectable({
  providedIn: 'root'
})
export class RelatoriosService {

  baseUrl = `${URLS.IP_SERVIDOR}/relatorio`;

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

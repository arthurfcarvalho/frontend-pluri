import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RelatoriosService {

  baseUrl = environment.apiUrl + '/relatorio/';

  constructor(private http: HttpClient) { }

  previewQuestao(dados: any): Observable<Blob>{

    const url = this.baseUrl + 'preview-questao';

    return this.http.post(url, dados,{ responseType: 'blob' });
  }
  
  previewQuestoesAEnviar(dados: any):Observable<Blob>{
    
    const url = this.baseUrl + 'gerar-pdf-questoes-selecionadas';

    return this.http.post(url, dados,{ responseType: 'blob' });
  }
  previewQuestaoSelecionada(id: number):Observable<Blob>{
    
    const url = this.baseUrl + 'gerar-pdf-questao-selecionada';

    return this.http.post(url, id,{ responseType: 'blob' });
  }
  
}

import { DadosDetalhamentoQuestaoAEnviar } from "../../professor/models/DadosDetalhamentoQuestaoAEnviar.model";

export interface DadosDetalhamentoAreaPluri {
    idPluriArea: number;
    idArea: number;
    nomeArea: string;
    quantidadeQuestoes: number;
    quantidadeQuestoesRecebidas: number;
    quantidadeQuestoesPedidas: number;
    questoesAEnviar: DadosDetalhamentoQuestaoAEnviar[];
    completa: boolean;
}
export interface DadosDetalhamentoInformacoesGerais {
    id: number;
    nome: string;
    codigo: string;
    trimestre: number;
    anoAplicacao: number;
    dataInicioPluri: Date;
    dataFimPluri: Date; 
    areasPluri: Set<DadosDetalhamentoAreaPluri>;
}
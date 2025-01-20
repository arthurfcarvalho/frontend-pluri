import { DadosDetalhamentoQuestaoAEnviar } from "../../professor/models/DadosDetalhamentoQuestaoAEnviar.model";

export interface DadosDetalhamentoAreaPluri {
    idPluriArea: number;
    idArea: number;
    areaId: number;
    pluriNome: string;
    dataInicioDiagramacao: Date;
    dataFimDiagramacao: Date;
    quantidadeTotalDeQuestoesNoPluri: number;
    trimestre: number;
    dataInicio: Date;
    dataFim: Date;
    nomeArea: string;
    areaNome: string;
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

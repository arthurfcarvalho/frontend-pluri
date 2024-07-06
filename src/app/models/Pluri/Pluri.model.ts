import { PluriArea } from "./PluriArea.model";

export interface Pluri {
    id: number;
    nome: string;
    codigo: string;
    trimestre: number;
    anoAplicacao: number;
    dataInicioPluri: Date | null;
    dataFimPluri: Date | null;
    dataInicioIndicacaoDocentes: Date | null;
    dataFimIndicacaoDocentes: Date | null;
    dataInicioEnvioQuestoes: Date | null;
    dataFimEnvioQuestoes: Date | null;
    dataInicioDiagramacao: Date | null;
    dataFimDiagramacao: Date | null;
    dataInicioRevisao: Date | null;
    dataFimRevisao: Date | null;
    dataInicioImpressao: Date | null;
    dataFimImpressao: Date | null;
    dataInicioEnsalamento: Date | null;
    dataFimEnsalamento: Date | null;
    dataInicioLancamentoNotas: Date | null;
    dataFimLancamentoNotas: Date | null;
    dataInicioCorrecaoRedacao: Date | null;
    dataFimCorrecaoRedacao: Date | null;
    dataInicioEnviarRecurso: Date | null;
    dataFimEnviarRecurso: Date | null;
    dataInicioAnaliseRecurso: Date | null;
    dataFimAnaliseRecurso: Date | null;
    dataInicioAtualizacaoNotas: Date | null;
    dataFimAtualizacaoNotas: Date | null;
    dataAplicacao: Date | null;
    dataReaplicacao: Date | null;
    dataDivulgacaoNotas: Date | null;
    realizado: boolean;
    areasPluri?: PluriArea[] | null;
}

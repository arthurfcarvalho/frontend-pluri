export interface DadosDetalhamentoAreaPluri {
    idPluriArea: number;
    idArea: number;
    nomeArea: string;
    quantidadeQuestoes: number;
    quantidadeQuestoesRecebidas: number;
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
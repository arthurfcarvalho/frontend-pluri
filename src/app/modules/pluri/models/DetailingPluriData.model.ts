export interface DadosDetalhamentoPluri {
    id: number;
    codigo: string;
    trimestre: number;
    ano_aplicacao: number;
    data_inicio_pluri: Date;
    data_inicio_recuperacao: Date;
    data_aplicacao: Date;
    data_reaplicacao: Date;
    data_divulgacao_notas: Date;
    data_indicacao_docentes: Date;
    data_envio_questoes: Date;
    data_diagramacao: Date;
    data_revisao: Date;
    data_impressao: Date;
    data_ensalamento: Date;
    data_lancamento_notas: Date;
    data_correcao_redacao: Date;
    data_enviar_recurso: Date;
    data_analise_recurso: Date;
    data_atualizacao_notas: Date;
    realizado: boolean;
}

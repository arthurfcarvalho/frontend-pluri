export interface Pluri {
    id: number;
    codigo: string;
    trimestre: number;
    ano_aplicacao: number;
    data_inicio_pluri: Date | null;
    data_inicio_recuperacao: Date | null;
    data_aplicacao: Date | null;
    data_reaplicacao: Date | null;
    data_divulgacao_notas: Date | null;
    data_indicacao_docentes: Date | null;
    data_envio_questoes: Date | null;
    data_diagramacao: Date | null;
    data_revisao: Date | null;
    data_impressao: Date | null;
    data_ensalamento: Date | null;
    data_lancamento_notas: Date | null;
    data_correcao_redacao: Date | null;
    data_enviar_recurso: Date | null;
    data_analise_recurso: Date | null;
    data_atualizacao_notas: Date | null;
    realizado: boolean;
}

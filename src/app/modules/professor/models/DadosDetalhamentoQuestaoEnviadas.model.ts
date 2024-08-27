import { DadosDetalhamentoQuestao } from "./DadosDetalhamentoQuestao.model";

export interface DadosDetalhamentoQuestoesEnviadas{
    idQuestoesAEnviar: number,
    idPluriArea: number,
    idPluri: number,
    nomePluri: string,
    questoesEnviadas?: DadosDetalhamentoQuestao[]
}


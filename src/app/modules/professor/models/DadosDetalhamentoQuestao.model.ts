import Assunto from "../../../models/Assunto.model";
import {Classificacao} from "./Classificacao.model";

export interface DadosDetalhamentoQuestao{
    id: number;
    titulo: string,
    dificuldade: string
    //assuntos: Assunto[];
    //codigo_assuntos: string[]
    idArea: number
    areaNome: string
    criador: string
    dataCriacao: Date,
    aprovada: boolean,
    status: Classificacao,

}

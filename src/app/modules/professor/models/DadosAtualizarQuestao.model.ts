import Assunto from "../../../models/Assunto.model";
import { Alternativa } from "./Alternativa.model";
import {Disciplina} from "../../disciplina/models/disciplina";
import {Area} from "../../../models/Area.model";
import {Classificacao} from "./Classificacao.model";

export interface DadosAtualizarQuestao{
    id: number;
    corpo: string,
    fonte: string,
    titulo: string,
    alternativas: Alternativa[],
    alternativaCorreta: number,
    dataCriacao: Date,
    dificuldade: string,
    assuntos: Assunto[];
    assuntosInterdisciplinares: Assunto[];
    disciplinas: Disciplina[];
    codigoAssuntos: Assunto[];
    area: Area;
    status: Classificacao;

}

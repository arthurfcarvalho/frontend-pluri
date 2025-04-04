import Assunto from "../../../models/Assunto.model";
import { Alternativa } from "./Alternativa.model";
import {Disciplina} from "../../disciplina/models/disciplina";
import {Area} from "../../../models/Area.model";

export interface DadosAtualizarQuestao{
    id: number;
    corpo: string,
    titulo: string,
    alternativas: Alternativa[],
    opcaoCorreta: number,
    dataCriacao: Date,
    dificuldade: string,
    aprovada: boolean,
    assuntos: Assunto[];
    disciplinas: Disciplina[];
    codigoAssuntos: Assunto[];
    area: Area;

}

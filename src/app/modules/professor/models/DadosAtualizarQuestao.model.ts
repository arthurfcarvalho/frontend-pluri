import Assunto from "../../../models/Assunto.model";
import { Alternativa } from "./Alternativa.model";

export interface DadosAtualizarQuestao{
    id: number;
    corpo: string,
    titulo: string,
    alternativas: Alternativa[],
    opcaoCorreta: string,
    dataCriacao: Date,
    dificuldade: string,
    aprovada: boolean, 
    assuntos: Assunto[];
    //List<String> codigo_assuntos,
    //Long id_area
}
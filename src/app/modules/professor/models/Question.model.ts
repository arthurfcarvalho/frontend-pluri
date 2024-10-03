import { Alternativa } from "./Alternativa.model";

export interface Questao{
    id_questao: number;
    corpo: string,
    titulo: string,
    alternativas: Alternativa[];
    /*alternativa1: string,
    alternativa2: string,
    alternativa3: string,
    alternativa4: string,*/
    opcaoCorreta: string,
    dataCriacao: Date,
    dificuldade: string,
    aprovada: boolean,
    codigo_assuntos: string[]
    id_area?: number
}
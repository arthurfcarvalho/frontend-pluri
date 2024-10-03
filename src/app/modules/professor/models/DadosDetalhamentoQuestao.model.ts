import Assunto from "../../../models/Assunto.model";

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
    
}
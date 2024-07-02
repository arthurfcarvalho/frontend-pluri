import Assunto from "../../../models/Assunto.model";

export interface DadosAtualizarQuestao{
    id: number;
    corpo: string,
    titulo: string,
    alternativa1: string,
    alternativa2: string,
    alternativa3: string,
    alternativa4: string,
    opcaoCorreta: string,
    dataCriacao: Date,
    dificuldade: string,
    aprovada: boolean, 
    assuntos: Assunto[];
    //List<String> codigo_assuntos,
    //Long id_area
}
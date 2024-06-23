export interface DadosAtualizarQuestao{
    id_questao: number;
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
    codigo_assuntos: string[]
    //List<String> codigo_assuntos,
    //Long id_area
}
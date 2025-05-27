export interface MessageModel {
    id?: number,
    assunto?: string,
    conteudo?: string,
    lida: boolean
    tipo: string;
    created_at: Date;
}

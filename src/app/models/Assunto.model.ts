import { Disciplina } from "../../app/modules/disciplina/models/disciplina";

export default interface Assunto {
    id: number,
    nome: string,
    codigo?: string,
    disciplina: Disciplina
}

import { Role } from "./Role.model";

export interface Permission {
    id: number;
    nome: string;
    descricao: string;
    codigo: string;
    perfis: Role[];
}

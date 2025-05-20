import { Role } from "./Role.model";

export interface User {
    id: number;
    nome?: string;
    login?: string;
    senha?: string;
    data_nascimento?: Date;
    email?: string;
    perfis?: Role[];
    dadosPerfil?: any;
}

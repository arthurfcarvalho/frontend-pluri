import { CaixaDeEntrada } from "./BoxMessage.model";
import { Role } from "./Role.model";

export interface UserRoleBoxMessage {
    id: number;
    nome: string;
    perfis: Role[],
    caixaDeEntrada?: CaixaDeEntrada;
}

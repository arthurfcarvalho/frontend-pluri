import { Permission } from "./Permission.model";
import { User } from "./User.model";


export interface Role {
    id: number;
    nome: string;
    usuarios: User[];
    permissoes: Permission[];
}

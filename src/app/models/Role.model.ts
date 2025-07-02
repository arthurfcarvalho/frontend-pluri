import { Permission } from "./Permission.model";
import { User } from "./User.model";
import { Area } from "./Area.model";


export interface Role {
    id: number;
    nome: string;
    usuarios: User[];
    permissoes: Permission[];
    area:Area;
}

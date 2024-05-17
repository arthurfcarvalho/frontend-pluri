import { Role } from "./Role.model";

;

export interface User {
    id: number;
    nome: string;
    login: string;
    senha: string;
    data_nascimento: Date;
    email: string;
    perfis: Role[];
    //data_nascimento: new DatePipe('en-US').transform(data_nascimento, 'yyyy-MM-ddTHH:mm:ss')
}

import { PluriArea } from "./PluriArea.model";

export interface PluriInfoDAO {
    id: number;
    nome: string;
    codigo: string;
    trimestre: number;
    anoAplicacao: number;
    dataInicioPluri: Date;
    dataFimPluri: Date;
    areasPluri: PluriArea[];
}
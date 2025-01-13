import { Area } from "../Area.model";
import { Pluri } from "./Pluri.model";

export interface PluriArea{
    idPluriArea: number;
    pluri: Pluri;
    area: Area;
    quantidadeQuestoes: number;
    quantidadeQuestoesRecebidas: number;
    areaCompleta: boolean;
}

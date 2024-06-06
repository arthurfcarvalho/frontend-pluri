import { Area } from "./Area.model";
import { Pluri } from "./Pluri.model";

export interface PluriArea{
    id: number;
    pluri: Pluri;
    area: Area;
    quantidadeQuestoes: number;
    quantidadeQuestoesRecebidas: number;
    areaCompleta: boolean;
}
import Assunto from "../../../models/Assunto.model";
import {Area} from "../../../models/Area.model";

export interface Disciplina {
  id: number | null;
  nome: string | null;
  area: Area;
  assuntos: Assunto[];
}

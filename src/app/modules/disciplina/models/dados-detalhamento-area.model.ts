import {Disciplina} from "./disciplina";

export interface DadosDetalhamentoArea {
  id: number | null;
  nome: string | null;
  disciplinas: Disciplina[];
}

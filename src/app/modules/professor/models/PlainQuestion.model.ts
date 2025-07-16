import {PlainAlternative} from "./PlainAlternative.model";

export interface PlainQuestion {
  id?: number;
  corpoPlano: string,
  corpoMarkdown: string,
  fonteMarkdown?: string | null,
  fontePlana?: string | null,
  titulo: string,
  alternativasPlanas: PlainAlternative[],
  questaoId?: number;
}

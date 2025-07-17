export type FieldType = 'text' | 'textarea' | 'dropdown';

export interface FieldConfig {
    name: string;
    type: FieldType;
    labelKey: string;
    options?: any[];           // usado em dropdown
    optionLabel?: string;      // campo a ser mostrado no dropdown
    formControlName: string;
    id?: string;               // se não informado, usa o name
}

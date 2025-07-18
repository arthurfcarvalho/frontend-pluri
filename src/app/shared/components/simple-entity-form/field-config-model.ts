export interface FieldConfig {
    name: string;
    labelKey: string;
    type: 'text' | 'textarea' | 'dropdown' | 'picklist';
    formControlName: string;
    options?: any[];
    optionLabel?: string;
    optionValue?: string;
    displayTemplate?: (item: any) => string;
    filterBy?: string;
    id?: string;
}

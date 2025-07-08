export interface Option {
    label: string;
    value: string | number;
}
export interface Field {
    model: string;
    label: string;
    type: 'input' | 'selection' | 'file' | 'textarea';
    inputType?: 'text' | 'number' | 'email' | 'password' | 'tel' | 'url' | 'date' | 'time' | 'datetime-local';
    placeholder?: string;
    disabled?: boolean;
    readonly?: boolean;
    required?: boolean;
    options?: (Option | string | number)[];
    accept?: string;
    multiple?: boolean;
    preview?: boolean;
    default?: any;
    cols?: number;
    rows?: number;
}
export interface FormAction {
    label: string;
    emit: 'submit' | 'cancel' | 'reset' | string;
    loading?: boolean;
}
export interface FormState {
    [key: string]: any;
}
export interface SuFormProps {
    title?: string;
    fields: Field[];
    func?: FormAction[];
    model?: {
        [key: string]: any;
    };
}
export interface SuFormEmits {
    (event: 'submit', payload: FormState): void;
    (event: 'cancel'): void;
    (event: 'reset'): void;
    (event: 'update:model', payload: FormState): void;
    (event: 'file-change', payload: {
        fieldName: string;
        file: File | null;
    }): void;
    (event: 'file-clear', payload: {
        fieldName: string;
    }): void;
}

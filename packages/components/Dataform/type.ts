import type { Ref } from 'vue';
import { DATDAFORM_EVENT_CLOSE, DATDAFORM_EVENT_SUBMIT } from './constants';
export type ValidationRule = string | { name: string;[key: string]: any };

export interface FormField {
    id: string;
    label: string;
    type: 'text' | 'password' | 'email' | 'number';
    placeholder?: string;
    required?: boolean; //明确指定字段是否为必填项
    rules?: ValidationRule[];
}

export interface FormStep {
    step: number;
    fields: FormField[];
    func?: (formData: Record<string, any>) => boolean | string | Promise<boolean | string>;
}

export interface FormSection {
    title: string;
    step: boolean;
    fields?: FormField[];
    steps?: FormStep[];
    step_model?: { All_Steps: number; };
}

export interface FormPanelProps {
    backgroundImage?: string;
    sections: FormSection[];
    initialForm?: string;
    size?: 'small' | 'medium' | 'large';
    direction?: 'horizontal' | 'vertical';
}

export interface FormPanelEmits {
    (e: typeof DATDAFORM_EVENT_SUBMIT, formType: string, data: Record<string, any>): void;
    (e: typeof DATDAFORM_EVENT_CLOSE): void;
}

export interface FormPanelState {
    selectedForm: Ref<string>;
    currentStep: Ref<number>;
    formData: Record<string, any>;
    formErrors: Record<string, string | null>;
    generalError: Ref<string | null>;
    touched: Ref<Set<string>>;
}
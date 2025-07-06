// src/components/FormPanel/types.ts
import type { Ref } from 'vue';

// A rule can be a simple string 'required' or an object for customization
export type ValidationRule = string | { name: string;[key: string]: any };

export interface FormField {
    id: string;
    label: string;
    type: 'text' | 'password' | 'email' | 'number';
    placeholder?: string;
    autocomplete?: 'on' | 'off';
    rules?: ValidationRule[];
}

export interface FormStep {
    step: number;
    fields: FormField[];
    func?: (formData: Record<string, any>) => boolean | Promise<boolean>;
}

export interface FormSection {
    title: string;
    step: boolean;
    fields?: FormField[];
    steps?: FormStep[];
    step_model?: { current: number; All_Steps: number; };
}

export interface FormPanelProps {
    backgroundImage?: string;
    sections: FormSection[];
    initialForm?: string;
    size?: 'small' | 'medium' | 'large';
    direction?: 'horizontal' | 'vertical';
}

export interface FormPanelEmits {
    (e: 'submit', formType: string, data: Record<string, any>): void;
    (e: 'close'): void;
}

export interface FormPanelState {
    selectedForm: Ref<string>;
    currentStep: Ref<number>;
    formData: Record<string, any>;
    formErrors: Record<string, string | null>;
    generalError: Ref<string | null>; // For the SuAlert message
}
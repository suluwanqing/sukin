// src/components/FormPanel/events.ts
import type { FormPanelProps, FormPanelEmits, FormPanelState, FormSection, FormStep, FormField, ValidationRule } from './type';
import { EVENT_SUBMIT } from './constants';

const internalValidators: Record<string, (options: any) => (value: any) => true | string> = {
    required: (options: { message?: string }) => (value: any) => {
        const message = options.message || 'This field is required.';
        if (value === null || value === undefined || String(value).trim() === '') return message;
        return true;
    },
    email: (options: { message?: string }) => (value: string) => {
        const message = options.message || 'Please enter a valid email address.';
        if (!value) return true;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return message;
        return true;
    },
    minLength: (options: { length: number; message?: string }) => (value: string) => {
        const message = options.message || `Must be at least ${options.length} characters long.`;
        if (value && value.length < options.length) return message;
        return true;
    }
};

const validateFields = (fields: FormField[], state: FormPanelState): boolean => {
    let isFormValid = true;
    state.generalError.value = null;
    fields.forEach(field => { state.formErrors[field.id] = null; });

    for (const field of fields) {
        if (field.rules) {
            for (const rule of field.rules as ValidationRule[]) {
                let ruleName: string, ruleOptions: any = {};
                if (typeof rule === 'string') { ruleName = rule; } else { ruleName = rule.name; ruleOptions = rule; }
                const validatorFactory = internalValidators[ruleName];
                if (validatorFactory) {
                    const validator = validatorFactory(ruleOptions);
                    const result = validator(state.formData[field.id]);
                    if (result !== true) {
                        state.formErrors[field.id] = result;
                        isFormValid = false;
                    }
                }
            }
        }
    }

    if (!isFormValid) {
        state.generalError.value = "Please correct the errors before proceeding.";
    }
    return isFormValid;
};

export const initializeState = (props: FormPanelProps, state: FormPanelState) => {
    const allFields = new Set<string>();
    props.sections.forEach((section) => {
        (section.fields || []).forEach(field => allFields.add(field.id));
        (section.steps || []).forEach(step => step.fields.forEach(field => allFields.add(field.id)));
    });
    Object.keys(state.formData).forEach(key => delete state.formData[key]);
    allFields.forEach(id => { state.formData[id] = ''; });
    state.currentStep.value = 1;
    state.formErrors = {};
    state.generalError.value = null;
};

export const handleCloseRequest = (emit: FormPanelEmits) => { emit('close'); };

export const handleSwitchForm = (formType: string, props: FormPanelProps, state: FormPanelState) => {
    state.selectedForm.value = formType;
    initializeState(props, state);
};

export const handleSubmit = (section: FormSection, state: FormPanelState, emit: FormPanelEmits) => {
    if (!validateFields(section.fields || [], state)) return;
    emit(EVENT_SUBMIT, section.title, { ...state.formData });
};

export const handleNextStep = async (stepInfo: FormStep, section: FormSection, state: FormPanelState, emit: FormPanelEmits) => {
    if (!validateFields(stepInfo.fields, state)) return;
    if (stepInfo.func) {
        const canProceed = await stepInfo.func(state.formData);
        if (!canProceed) return;
    }
    const isLastStep = state.currentStep.value === section.step_model!.All_Steps;
    if (isLastStep) {
        emit(EVENT_SUBMIT, section.title, { ...state.formData });
    } else {
        state.currentStep.value++;
    }
};

export const handlePreviousStep = (state: FormPanelState) => {
    if (state.currentStep.value > 1) {
        state.formErrors = {};
        state.generalError.value = null;
        state.currentStep.value--;
    }
};
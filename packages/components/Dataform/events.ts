import type { FormPanelProps, FormPanelEmits, FormPanelState, FormSection, FormStep, FormField } from './type';
import { DATDAFORM_EVENT_SUBMIT } from './constants';

const internalValidators: Record<string, (options: any) => (value: any) => true | string> = {
    email: (options: { message?: string }) => (value: string) => {
        const msg = options.message || '请输入有效的电子邮件地址';
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? true : msg;
    },
    minLength: (options: { length: number; message?: string }) => (value: string) => {
        const msg = options.message || `长度不能少于 ${options.length} 个字符`;
        return value.length >= options.length ? true : msg;
    }
};

/**
 * 作用：验证单个字段，优先处理必填，再处理规则
 */
export const validateField = (field: FormField, state: FormPanelState): boolean => {
    if (!state.touched.value.has(field.id)) return true;

    state.formErrors[field.id] = null;
    const value = state.formData[field.id];
    const hasValue = value !== null && value !== undefined && String(value).trim() !== '';

    // 作用：首先检查是否为必填项
    if (field.required && !hasValue) {
        state.formErrors[field.id] = '此字段为必填项';
        return false;
    }

    // 作用：如果字段有值，则检查其他规则
    if (hasValue && field.rules) {
        for (const rule of field.rules) {
            const ruleName = typeof rule === 'string' ? rule : rule.name;
            const ruleOptions = typeof rule === 'string' ? {} : rule;
            const validator = internalValidators[ruleName]?.(ruleOptions);
            if (validator) {
                const result = validator(value);
                if (result !== true) {
                    state.formErrors[field.id] = result;
                    return false;
                }
            }
        }
    }

    return true;
};

/**
 * 作用：验证一组字段，并设置第一个发现的错误为全局错误
 */
const validateFields = (fields: FormField[], state: FormPanelState): boolean => {
    let isFormValid = true;
    let firstErrorMessage: string | null = null;

    for (const field of fields) {
        state.touched.value.add(field.id);
        if (!validateField(field, state)) {
            isFormValid = false;
            if (!firstErrorMessage && state.formErrors[field.id]) {
                firstErrorMessage = `字段 "${field.label}": ${state.formErrors[field.id]}`;
            }
        }
    }

    if (!isFormValid) {
        state.generalError.value = firstErrorMessage || "请修正表单中的错误。";
    } else {
        state.generalError.value = null;
    }
    return isFormValid;
};

export const initializeState = (props: FormPanelProps, state: FormPanelState) => {
    const allFieldIds = new Set<string>();
    props.sections.forEach(section => {
        (section.fields || []).forEach(f => allFieldIds.add(f.id));
        (section.steps || []).forEach(s => s.fields.forEach(f => allFieldIds.add(f.id)));
    });

    Object.keys(state.formData).forEach(key => delete state.formData[key]);
    allFieldIds.forEach(id => { state.formData[id] = ''; });

    state.currentStep.value = 1;
    state.formErrors = {};
    state.generalError.value = null;
    state.touched.value = new Set();
};

export const handleCloseRequest = (emit: FormPanelEmits) => emit('close');

export const handleSwitchForm = (formType: string, props: FormPanelProps, state: FormPanelState) => {
    state.selectedForm.value = formType;
    initializeState(props, state);
};

export const handleSubmit = (section: FormSection, state: FormPanelState, emit: FormPanelEmits) => {
    if (!validateFields(section.fields || [], state)) return;
    emit(DATDAFORM_EVENT_SUBMIT, section.title, { ...state.formData });
};

export const handleNextStep = async (stepInfo: FormStep, section: FormSection, state: FormPanelState, emit: FormPanelEmits) => {
    if (!validateFields(stepInfo.fields, state)) return;

    if (stepInfo.func) {
        try {
            const result = await stepInfo.func(state.formData);
            if (result !== true) {
                state.generalError.value = typeof result === 'string' ? result : "验证失败，请稍后重试。";
                return;
            }
        } catch (error) {
            state.generalError.value = "操作时发生未知错误。";
            return;
        }
    }

    const isLastStep = section.step_model && state.currentStep.value === section.step_model.All_Steps;
    if (isLastStep) {
        emit(DATDAFORM_EVENT_SUBMIT, section.title, { ...state.formData });
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
// @file SuForm/events.ts
// @description Event handlers and utility functions for SuForm component logic.

import type { Field, FormState, SuFormEmits, Option } from './type';

/**
 * Checks if a given file object or URL string represents an image.
 * @param file - The file object or string URL.
 * @returns True if it's an image, false otherwise.
 */
export const isImage = (file: File | string | null): boolean => {
    if (!file) return false;
    if (file instanceof File) {
        return file.type.startsWith('image/');
    }
    if (typeof file === 'string') {
        return /\.(jpg|jpeg|png|gif|webp|bmp|tiff|svg)$/i.test(file.split('?')[0]);
    }
    return false;
};

/**
 * Generates a preview URL for a given file.
 * Creates an object URL for File objects, returns the string as-is for URLs.
 * @param file - The file object or string URL.
 * @returns The URL for previewing the file.
 */
export const getPreviewUrl = (file: File | string | null): string => {
    if (!file) return '';
    if (file instanceof File) {
        return URL.createObjectURL(file);
    }
    return file;
};

/**
 * Extracts the file name from a File object or a file path string.
 * @param file - The file object or string path.
 * @returns The name of the file.
 */
export const getFileName = (file: File | string | null): string => {
    if (!file) return '未选择文件';
    if (file instanceof File) {
        return file.name;
    }
    if (typeof file === 'string') {
        return file.split('/').pop()?.split('?')[0] || file;
    }
    return '已上传文件';
};

/**
 * Initializes or updates the reactive form state based on provided fields and model.
 * @param formState - The reactive form state object.
 * @param fields - Array of field definitions.
 * @param model - Initial data model.
 */
export const initializeFormState = (
    formState: FormState,
    fields: Field[],
    model?: { [key: string]: any }
) => {
    const currentFieldKeys = new Set(fields.map(f => f.model));

    for (const key in formState) {
        if (!currentFieldKeys.has(key)) {
            delete formState[key];
        }
    }

    fields.forEach((f) => {
        if (f) {
            const hasModelValue = model && model[f.model] !== undefined;
            const hasDefaultValue = f.default !== undefined;
            const formStateHasValue = formState[f.model] !== undefined;

            if (hasModelValue) {
                formState[f.model] = model[f.model];
            } else if (hasDefaultValue) {
                if (!formStateHasValue) {
                    formState[f.model] = f.default;
                }
            } else if (!formStateHasValue) {
                switch (f.type) {
                    case 'selection':
                        const firstOption = f.options?.[0];
                        if (firstOption !== undefined) {
                            if (typeof firstOption === 'object' && firstOption !== null && 'value' in firstOption) {
                                formState[f.model] = (firstOption as Option).value;
                            } else {
                                formState[f.model] = firstOption;
                            }
                        } else {
                            formState[f.model] = '';
                        }
                        break;
                    case 'file':
                        formState[f.model] = null;
                        break;
                    case 'textarea':
                    case 'input':
                    default:
                        formState[f.model] = '';
                        break;
                }
            }
        }
    });
};

/**
 * Validates the form state based on field definitions.
 * @param formState - The current reactive form state.
 * @param fields - Array of field definitions.
 * @returns A record of errors where key is fieldName and value is error message, or empty object if valid.
 */
export const validateForm = (
    formState: FormState,
    fields: Field[]
): Record<string, string> => {
    const errors: Record<string, string> = {};

    fields.forEach(field => {
        if (field.required) {
            const value = formState[field.model];
            if (value === null || value === undefined || (typeof value === 'string' && value.trim() === '')) {
                errors[field.model] = `${field.label}是必填项。`;
            } else if (field.type === 'file' && !(value instanceof File) && typeof value !== 'string') {
                errors[field.model] = `${field.label}是必填项。`;
            }
        }
    });
    return errors;
};

/**
 * Handles file input change events.
 * Updates formState and emits file change event.
 * @param event - The DOM change event.
 * @param fieldName - The model name of the file field.
 * @param formState - The reactive form state object.
 * @param emit - The component's emit function.
 */
export const handleFileChange = (
    event: Event,
    fieldName: string,
    formState: FormState,
    emit: SuFormEmits
) => {
    const inputElement = event.target as HTMLInputElement;
    const files = inputElement.files;
    if (files && files.length > 0) {
        const file = files[0];
        formState[fieldName] = file;
        emit('update:model', { ...formState });
        emit('file-change', { fieldName, file });
    } else {
        formState[fieldName] = null;
        emit('update:model', { ...formState });
        emit('file-change', { fieldName, file: null });
    }
};

/**
 * Clears the selected file for a given field.
 * Resets the file input element and updates form state.
 * @param fieldName - The model name of the file field.
 * @param formState - The reactive form state object.
 * @param emit - The component's emit function.
 */
export const clearFile = (
    fieldName: string,
    formState: FormState,
    emit: SuFormEmits
) => {
    formState[fieldName] = null;
    const fileInput = document.getElementById(fieldName) as HTMLInputElement;
    if (fileInput) {
        fileInput.value = '';
    }
    emit('update:model', { ...formState });
    emit('file-clear', { fieldName });
};

/**
 * Resets the form to its initial state (based on model and default values).
 * Also clears validation errors.
 * @param formState - The reactive form state object.
 * @param fields - Array of field definitions.
 * @param model - Initial data model (to revert to).
 * @param clearErrors - Function to clear validation errors.
 * @param emit - The component's emit function.
 */
export const resetForm = (
    formState: FormState,
    fields: Field[],
    model: { [key: string]: any },
    clearErrors: () => void,
    emit: SuFormEmits
) => {
    initializeFormState(formState, fields, model);
    clearErrors();
    emit('update:model', { ...formState });
    emit('reset');
};

/**
 * Emits the specified action event (e.g., 'submit', 'cancel').
 * For 'submit', it包括 current form state and performs validation.
 * @param type - The type of action to emit.
 * @param formState - The current reactive form state.
 * @param fields - Array of field definitions (for validation).
 * @param emit - The component's emit function.
 * @param setErrors - Function to set validation errors.
 * @param setIsLoading - Function to set loading state.
 */
export const emitAction = async (
    type: string,
    formState: FormState,
    fields: Field[],
    emit: SuFormEmits,
    setErrors: (errors: Record<string, string>) => void,
    setIsLoading: (loading: boolean) => void
) => {
    if (type === 'submit') {
        setIsLoading(true);
        const errors = validateForm(formState, fields);
        setErrors(errors);

        if (Object.keys(errors).length === 0) {
            await Promise.resolve();
            emit('submit', { ...formState });
        }
        setIsLoading(false);
    } else {
        (emit as (event: string, ...args: any[]) => void)(type);
    }
};
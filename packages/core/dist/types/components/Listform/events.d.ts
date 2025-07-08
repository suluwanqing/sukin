import { Field, FormState, SuFormEmits } from './type';
export declare const isImage: (file: File | string | null) => boolean;
export declare const getPreviewUrl: (file: File | string | null) => string;
export declare const getFileName: (file: File | string | null) => string;
export declare const initializeFormState: (formState: FormState, fields: Field[], model?: {
    [key: string]: any;
}) => void;
export declare const validateForm: (formState: FormState, fields: Field[]) => Record<string, string>;
export declare const handleFileChange: (event: Event, fieldName: string, formState: FormState, emit: SuFormEmits) => void;
export declare const clearFile: (fieldName: string, formState: FormState, emit: SuFormEmits) => void;
export declare const resetForm: (formState: FormState, fields: Field[], model: {
    [key: string]: any;
}, clearErrors: () => void, emit: SuFormEmits) => void;
export declare const emitAction: (type: string, formState: FormState, fields: Field[], emit: SuFormEmits, setErrors: (errors: Record<string, string>) => void, setIsLoading: (loading: boolean) => void) => Promise<void>;

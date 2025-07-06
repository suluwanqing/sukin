import { FormPanelProps, FormPanelEmits, FormPanelState, FormSection, FormStep } from './type';
export declare const initializeState: (props: FormPanelProps, state: FormPanelState) => void;
export declare const handleCloseRequest: (emit: FormPanelEmits) => void;
export declare const handleSwitchForm: (formType: string, props: FormPanelProps, state: FormPanelState) => void;
export declare const handleSubmit: (section: FormSection, state: FormPanelState, emit: FormPanelEmits) => void;
export declare const handleNextStep: (stepInfo: FormStep, section: FormSection, state: FormPanelState, emit: FormPanelEmits) => Promise<void>;
export declare const handlePreviousStep: (state: FormPanelState) => void;

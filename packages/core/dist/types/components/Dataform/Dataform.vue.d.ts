import { FormPanelProps, FormSection } from './type';
declare const _default: import('vue').DefineComponent<FormPanelProps, {
    resetForm: () => void;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {} & {
    close: () => any;
    submit: (formType: string, data: Record<string, any>) => any;
}, string, import('vue').PublicProps, Readonly<FormPanelProps> & Readonly<{
    onClose?: (() => any) | undefined;
    onSubmit?: ((formType: string, data: Record<string, any>) => any) | undefined;
}>, {
    size: "small" | "medium" | "large";
    direction: "horizontal" | "vertical";
    backgroundImage: string;
    sections: FormSection[];
    initialForm: string;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, HTMLDivElement>;
export default _default;

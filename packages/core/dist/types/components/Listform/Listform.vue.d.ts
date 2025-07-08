import { SuFormProps, FormState, Field } from './type';
declare const _default: import('vue').DefineComponent<SuFormProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {} & {
    submit: (payload: FormState) => any;
    reset: () => any;
    cancel: () => any;
    "update:model": (payload: FormState) => any;
    "file-change": (payload: {
        fieldName: string;
        file: File | null;
    }) => any;
    "file-clear": (payload: {
        fieldName: string;
    }) => any;
}, string, import('vue').PublicProps, Readonly<SuFormProps> & Readonly<{
    onSubmit?: ((payload: FormState) => any) | undefined;
    onReset?: (() => any) | undefined;
    onCancel?: (() => any) | undefined;
    "onUpdate:model"?: ((payload: FormState) => any) | undefined;
    "onFile-change"?: ((payload: {
        fieldName: string;
        file: File | null;
    }) => any) | undefined;
    "onFile-clear"?: ((payload: {
        fieldName: string;
    }) => any) | undefined;
}>, {
    title: string;
    fields: Field[];
    func: import('packages/core').FormAction[];
    model: {
        [key: string]: any;
    };
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, HTMLDivElement>;
export default _default;

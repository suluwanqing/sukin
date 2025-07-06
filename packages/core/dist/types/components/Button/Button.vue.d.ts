import { ButtonProps } from './types';
declare function __VLS_template(): {
    attrs: Partial<{}>;
    slots: Readonly<Record<string, any>> & Record<string, any>;
    refs: {
        _ref: unknown;
    };
    rootEl: any;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<ButtonProps, {
    ref: import('vue').Ref<HTMLButtonElement | undefined>;
    disabled?: import('vue').ComputedRef<boolean>;
    size?: import('vue').ComputedRef<string>;
    type?: import('vue').ComputedRef<string>;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {} & {
    click: (event: MouseEvent) => any;
}, string, import('vue').PublicProps, Readonly<ButtonProps> & Readonly<{
    onClick?: ((event: MouseEvent) => any) | undefined;
}>, {
    tag: string | import('vue').Component;
    nativeType: import('packages/core').NativeType;
    useThrottle: boolean;
    throttleDuration: number;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {
    _ref: unknown;
}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};

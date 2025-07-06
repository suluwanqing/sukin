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
    backgroundImage: string;
    sections: FormSection[];
    initialForm: string;
    direction: "horizontal" | "vertical";
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {
    alertRef: ({
        $: import('vue').ComponentInternalInstance;
        $data: {};
        $props: {
            readonly title?: string | undefined;
            readonly type?: import('packages/core').AlertType | undefined;
            readonly description?: string | undefined;
            readonly effect?: "light" | "dark" | undefined;
            readonly closable?: boolean | undefined;
            readonly center?: boolean | undefined;
            readonly showIcon?: boolean | undefined;
            readonly duration?: number | undefined;
            readonly onClose?: (() => any) | undefined;
        } & import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps;
        $attrs: {
            [x: string]: unknown;
        };
        $refs: {
            [x: string]: unknown;
        };
        $slots: Readonly<{
            [name: string]: import('vue').Slot<any> | undefined;
        }>;
        $root: import('vue').ComponentPublicInstance | null;
        $parent: import('vue').ComponentPublicInstance | null;
        $host: Element | null;
        $emit: (event: "close") => void;
        $el: any;
        $options: import('vue').ComponentOptionsBase<Readonly<import('packages/core').AlertProps> & Readonly<{
            onClose?: (() => any) | undefined;
        }>, {
            close(): void;
            open(): void;
        }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {} & {
            close: () => any;
        }, string, {
            type: import('packages/core').AlertType;
            effect: "light" | "dark";
            closable: boolean;
        }, {}, string, {}, import('vue').GlobalComponents, import('vue').GlobalDirectives, string, import('vue').ComponentProvideOptions> & {
            beforeCreate?: (() => void) | (() => void)[];
            created?: (() => void) | (() => void)[];
            beforeMount?: (() => void) | (() => void)[];
            mounted?: (() => void) | (() => void)[];
            beforeUpdate?: (() => void) | (() => void)[];
            updated?: (() => void) | (() => void)[];
            activated?: (() => void) | (() => void)[];
            deactivated?: (() => void) | (() => void)[];
            beforeDestroy?: (() => void) | (() => void)[];
            beforeUnmount?: (() => void) | (() => void)[];
            destroyed?: (() => void) | (() => void)[];
            unmounted?: (() => void) | (() => void)[];
            renderTracked?: ((e: import('vue').DebuggerEvent) => void) | ((e: import('vue').DebuggerEvent) => void)[];
            renderTriggered?: ((e: import('vue').DebuggerEvent) => void) | ((e: import('vue').DebuggerEvent) => void)[];
            errorCaptured?: ((err: unknown, instance: import('vue').ComponentPublicInstance | null, info: string) => boolean | void) | ((err: unknown, instance: import('vue').ComponentPublicInstance | null, info: string) => boolean | void)[];
        };
        $forceUpdate: () => void;
        $nextTick: typeof import('vue').nextTick;
        $watch<T extends string | ((...args: any) => any)>(source: T, cb: T extends (...args: any) => infer R ? (...args: [R, R, import('@vue/reactivity').OnCleanup]) => any : (...args: [any, any, import('@vue/reactivity').OnCleanup]) => any, options?: import('vue').WatchOptions): import('vue').WatchStopHandle;
    } & Readonly<{
        type: import('packages/core').AlertType;
        effect: "light" | "dark";
        closable: boolean;
    }> & Omit<Readonly<import('packages/core').AlertProps> & Readonly<{
        onClose?: (() => any) | undefined;
    }>, "close" | ("type" | "effect" | "closable") | "open"> & import('vue').ShallowUnwrapRef<{
        close(): void;
        open(): void;
    }> & {} & import('vue').ComponentCustomProperties & {} & {
        $slots: {
            title?(_: {}): any;
            default?(_: {}): any;
        };
    }) | null;
}, HTMLDivElement>;
export default _default;

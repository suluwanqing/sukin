import { type Component, type ComputedRef, type Ref } from "vue";
export type ButtonType = "primary" | "success" | "warning" | "danger" | "info";
export type NativeType = "button" | "submit" | "reset";
export type ButtonSize = "default" | "large" | "small";

//props的可选
export interface ButtonProps {
    tag?: string | Component; //这个就是一个标记
    type?: ButtonType;
    size?: ButtonSize;
    plain?: boolean;
    round?: boolean;
    circle?: boolean;
    disabled?: boolean;
    autofocus?: boolean;
    nativeType?: NativeType;
    icon?: string;
    loading?: boolean;
    loadingIcon?: string;
    useThrottle?: boolean;
    throttleDuration?: number;
}

//这个实际就是指,类似这个组件呢,下的button默认会使用这套<ButtonGroupProps><button></button></ButtonGroupProps>
// 注意这个应该和定义一致的
export interface ButtonGroupProps {
    size?: ButtonSize;
    type?: ButtonType;
    disabled?: boolean;
}

//默认button使用这套(非组)
export interface ButtonGroupContext {
    size?: ButtonSize;
    type?: ButtonType;
    disabled?: boolean;
    loading?: boolean;
}

export interface ButtonEmits {
    (e: 'click', event: MouseEvent): void;
    // 可以添加其他事件
    // (e: 'custom-event', data: SomeType): void;
}

//这个就是ref限制的可用属性/方法    
export interface ButtonInstance {
    ref: Ref<HTMLButtonElement | undefined>;
    disabled?: ComputedRef<boolean>;
    size?: ComputedRef<string>;
    type?: ComputedRef<string>;
}
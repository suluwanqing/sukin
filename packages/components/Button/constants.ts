import type { InjectionKey } from "vue";
import type { ButtonGroupContext } from "./types";

// 这个是指变量的提供注入的key
export const BUTTON_GROUP_CTX_KEY: InjectionKey<ButtonGroupContext>=Symbol("buttonGroupContext");
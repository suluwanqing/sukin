import type { InjectionKey } from "vue";
import type { ICardGroupContext } from "./types";

// 这个是指变量的提供注入的key
export const CARD_GROUP_CTX_KEY: InjectionKey<ICardGroupContext> = Symbol("icardGroupContext");
export const CARD_CLICK_EVENT = "click";
export const CARD_SLIDE_EVENT = "slide";
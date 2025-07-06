<template>
    <transition :name="bem.m('fade')">
        <div v-show="visible" :class="[
            bem.b(),
            bem.e(type),
            bem.e(effect),
            { 'text-center': center }
        ]" role="alert">
            <SuIcon v-if="showIcon" :class="[
                bem.e('icon'),
                { [bem.m('big-icon')]: withDescription }
            ]" :icon="iconName" />
            <div :class="bem.e('content')">
                <span :class="[
                    bem.e('title'),
                    { [bem.m('with-desc')]: withDescription }
                ]" :style="{ display: center && !showIcon ? 'flow' : 'inline' }">
                    <slot name="title">{{ title }}</slot>
                </span>
                <p :class="bem.e('description')">
                    <slot>{{ description }}</slot>
                </p>
                <div :class="bem.e('close')" v-if="closable">
                    <su-icon @click.stop="close" icon="xmark" />
                </div>
            </div>
        </div>
    </transition>
</template>

<script setup lang="ts">
import type { AlertProps, AlertEmits, AlertInstance } from "./type";
import { ref, useSlots, computed, defineOptions, defineEmits, type Slots, type ComputedRef } from "vue";
import SuIcon from "../Icon/Icon.vue";
import { createNamespace, typeIconMap } from "@sukin/utils";
const bem = createNamespace("alert");
defineOptions({
    name: "SuAlert",
});
const props = withDefaults(defineProps<AlertProps>(), {
    effect: "light",
    type: "info",
    closable: true,
});
const emits = defineEmits<AlertEmits>();
const slots = useSlots() as Slots;
const visible = ref(true);

const withDescription: ComputedRef<string | (() => any) | undefined> = computed(() => props.description || slots.default);

const iconName = computed(() => typeIconMap.get(props.type) ?? "circle-info");

function close() {
    visible.value = false;
    emits("close");
}
function open() {
    visible.value = true;
}
defineExpose<AlertInstance>({
    open,
    close,
});
</script>

<style scoped>
@import "./style.css";
</style>
<template>
    <component ref="_ref" :is="tag" :class="[
        bem.b(),
        type ? bem.m(type) : '',
        size ? bem.m(size) : '',
        {
            [bem.m('direction')]: direction,
        },
        bem.is('disabled', disabled),
    ]">
        <div v-for="(d, i) in data" :key="'icard' + String(i)">
            <Item :class="[
                bem.b(),
                type ? bem.m(type) : '',
                size ? bem.m(size) : '',
                {
                    [bem.m('c-direction')]: direction,
                },
                bem.is('c-disabled', disabled),
            ]"> 
            </Item>
        </div>
    </component>
</template>

<script setup lang="ts">
import { defineOptions, withDefaults, defineSlots, ref, defineExpose, computed, inject } from "vue";
import { createNamespace } from "@sukin/utils/create";
import { type ICardProps, type ICardInstance, type ICardEmits } from "./types";
import { CARD_GROUP_CTX_KEY } from "./constant";
import Item from "./Item.vue"
const bem = createNamespace('icard');
defineOptions({
    name: 'SuICard'
});

const props = withDefaults(defineProps<ICardProps>(), {
    tag: 'div',
    direction: 'vertical',
    circle: false,
    size: 'medium',
    data: () => []
})

const ctx = inject(CARD_GROUP_CTX_KEY, void 0);
const _ref = ref<HTMLDivElement>()
const slots = defineSlots();
const size = computed(() => ctx?.size ?? props?.size ?? '')
const type = computed(() => ctx?.type ?? props?.type ?? '')
const data = computed(() => ctx?.data ?? props?.data ?? '')
const emit = defineEmits<ICardEmits>();

defineExpose<ICardInstance>({
    ref: _ref
});

const handleClick = (e: MouseEvent) => {

};
</script>

<style scoped>
@import './style.css';
</style>
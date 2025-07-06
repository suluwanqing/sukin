<template>
    <div :class="[bem.e('option'), bem.is('active', active), bem.is('disabled', item.disabled)]" tabindex="0"
        @click="$emit('click')" @keydown.enter.prevent="$emit('click')" @keydown.space.prevent="$emit('click')">
        {{ item.label }}
    </div>
</template>

<script setup lang="ts">
import { createNamespace } from "../../utils";
import type { OptionDataItem } from './type';

const bem = createNamespace('selection');

defineProps<{
    item: OptionDataItem;
    active: boolean;
}>();

defineEmits(['click']);
</script>

<style>
</style>
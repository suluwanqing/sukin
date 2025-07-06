<template>
    <div :class="[bem.e('option'), bem.is('active', active), bem.is('disabled', item.disabled)]"
        :tabindex="item.disabled ? -1 : 0">
        {{ item.label }}
    </div>
</template>
<script setup lang="ts">
import type { SuOptionProps } from './type';
import { createNamespace } from "@sukin/utils";
defineProps<SuOptionProps>();
const bem = createNamespace('selection');
</script>
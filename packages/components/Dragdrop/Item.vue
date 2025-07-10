<template>
    <div :class="[bem.b(), { [bem.m('placed')]: removable }]">
        {{ displayText }}
        <span v-if="!removable" :class="bem.e('handle')">☰</span>
        <button v-if="removable" :class="bem.e('remove-btn')" @click.stop="handleRemove"
            aria-label="Remove item">×</button>
    </div>
</template>

<script setup lang="ts">
import { computed, defineProps, defineEmits } from 'vue';
import { createNamespace } from '@sukin/utils';
import type { ItemProps, DragDropItem } from './type';


const props = withDefaults(defineProps<ItemProps>(), {
    removable: false,
});

const emit = defineEmits<{
    (e: 'remove', item: DragDropItem): void;
}>();

const bem = createNamespace('item');

const displayText = computed(() => {
    return props.item?.name || props.item?.label || props.item?.UNIQUEKEYDATA || 'Unnamed Item';
});

const handleRemove = () => {
    emit('remove', props.item);
};
</script>
<style scoped>
@import "./style.css"
</style>
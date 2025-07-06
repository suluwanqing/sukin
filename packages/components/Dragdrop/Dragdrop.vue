<template>
    <div :class="bem.b()">
        <div :class="bem.e('source-list')">
            <ItemComponent v-for="(item, index) in sourceItems" :key="getUniqueKey(item, index)" :item="item"
                draggable="true" @dragstart="onDragStart($event, item)" />
        </div>

        <div :class="bem.e('dropzone')" @dragover.prevent @dragenter.prevent @drop="onDrop">
            <div :class="bem.e('dropzone-content')">
                <svg :class="bem.e('dropzone-icon')" viewBox="0 0 24 24">
                    <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
                </svg>
                <div :class="bem.e('dropzone-text')">拖放到这里</div>
            </div>
        </div>

        <div :class="bem.e('meta')" v-if="props.showCount">
            <div :class="bem.e('meta-available')">
                可用项: {{ sourceItems.length }}
            </div>
            <div :class="bem.e('meta-placed')" v-if="placedItems.length > 0">
                <div :class="bem.e('meta-placed-label')">
                    已放置 ({{ placedItems.length }}):
                </div>
                <div :class="bem.e('meta-placed-list')">
                    <ItemComponent v-for="(item, index) in placedItems" :key="getUniqueKey(item, index, '-placed')"
                        :item="item" removable @remove="onItemRemove" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits, defineOptions } from 'vue';
import { createNamespace, getDeepValue } from '@sukin/utils'; 
import ItemComponent from './Item.vue';
import { useDragDrop } from './events';
import type { DragDropProps, DragDropItem, DragDropEmits } from './type';

defineOptions({
    name: 'SuDragDrop'
});

const bem = createNamespace('drag-drop');
const props = withDefaults(defineProps<Partial<DragDropProps>>(), {
    onlykey: 'id', // 推荐的格式，不带前导点
    showCount: true,
    items: () => []
});

const emit = defineEmits<DragDropEmits>();
const sourceItems = ref<DragDropItem[]>([]);
const placedItems = ref<DragDropItem[]>([]);

const { onDragStart, onDrop, onItemRemove } = useDragDrop(sourceItems, placedItems, props, emit);

// 辅助函数，为 v-for 提供一个可靠的 key
const getUniqueKey = (item: DragDropItem, index: number, suffix: string = ''): string | number => {
    const key = getDeepValue(item, props.onlykey || 'id');
    return (key !== undefined && key !== null) ? `${key}${suffix}` : `${index}${suffix}`;
};

watch(() => props.items, (newItems) => {
    const keyPath = props.onlykey || 'id';
    // 使用可靠的 getDeepValue 获取已放置项的 key 集合
    const placedItemKeys = new Set(placedItems.value.map(p => getDeepValue(p, keyPath)));

    // 过滤源数据，确保不包含已放置的项
    sourceItems.value = (newItems || []).filter(item => {
        const itemKey = getDeepValue(item, keyPath);
        return !placedItemKeys.has(itemKey);
    });

}, { deep: true, immediate: true });
</script>

<style scoped>
@import './style.css';
</style>
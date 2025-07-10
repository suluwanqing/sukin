import type { Ref } from 'vue';

import { getItemDeep, popItemDeep, getDeepValue } from '@sukin/utils';
import type { DragDropItem, DragDropProps } from './type';


/**
 * 一个用于处理拖拽逻辑的组合式函数 (Composition Function / Hook)。
 * @param sourceItems - 一个 Ref，指向可拖拽项的数组。
 * @param placedItems - 一个 Ref，指向已放置项的数组。
 * @param props - 组件的 props。
 * @param emit - 组件的 emit 函数。
 * @returns 包含事件处理函数 (onDragStart, onDrop, onItemRemove) 的对象。
 */
export function useDragDrop(
    sourceItems: Ref<DragDropItem[]>,
    placedItems: Ref<DragDropItem[]>,
    props: Readonly<Partial<DragDropProps>>,
    emit: (event: 'change', payload: { source: DragDropItem[]; placed: DragDropItem[] }) => void
) {
    let draggedItem: DragDropItem | null = null;
    // 推荐的 onlykey 格式是 'id' 或 'data.uuid'，不带前导点
    const keyPath = props.onlykey || 'id';
    const onDragStart = (event: DragEvent, item: DragDropItem) => {
        draggedItem = item;
        if (event.dataTransfer) {
            // 使用可靠的 getDeepValue 获取 ID
            const itemIdValue = getDeepValue(item, keyPath);
            if (itemIdValue !== undefined && itemIdValue !== null) {
                event.dataTransfer.setData('text/plain', String(itemIdValue));
            }
            event.dataTransfer.effectAllowed = 'move';
        }
    };

    const onDrop = (event: DragEvent) => {
        event.preventDefault();
        const itemId = event.dataTransfer?.getData('text/plain');

        if (!itemId) {
            draggedItem = null;
            return;
        }

        // 使用可靠的 getItemDeep 在源列表中查找项
        const itemToDrop = getItemDeep(sourceItems.value, itemId, keyPath);

        if (itemToDrop) {
            // 检查是否已存在于放置区
            const itemKey = getDeepValue(itemToDrop, keyPath);
            const isAlreadyPlaced = placedItems.value.some(p => getDeepValue(p, keyPath) === itemKey);

            if (!isAlreadyPlaced) {
                // 使用可靠的 popItemDeep 从源列表中移除
                sourceItems.value = popItemDeep(sourceItems.value, itemToDrop, keyPath);
                placedItems.value.push(itemToDrop);

                emit('change', {
                    source: [...sourceItems.value],
                    placed: [...placedItems.value],
                });
            }
        }
        draggedItem = null;
    };

    const onItemRemove = (itemToRemove: DragDropItem) => {
        // 使用可靠的 popItemDeep 从放置区移除
        placedItems.value = popItemDeep(placedItems.value, itemToRemove, keyPath);

        // 添加回源列表 (检查以防万一)
        const itemKey = getDeepValue(itemToRemove, keyPath);
        const isAlreadyInSource = sourceItems.value.some(item => getDeepValue(item, keyPath) === itemKey);
        if (!isAlreadyInSource) {
            sourceItems.value.push(itemToRemove);
        }

        emit('change', {
            source: [...sourceItems.value],
            placed: [...placedItems.value],
        });
    };

    return {
        onDragStart,
        onDrop,
        onItemRemove
    };
}
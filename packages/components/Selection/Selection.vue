<template>
    <div ref="selectionRef"
        :class="[bem.b(), bem.m(props.mode), bem.m(props.size), bem.m(props.shape), bem.is('disabled', props.disabled)]"
        @keydown.esc="closeDropdown" tabindex="0">
        <div v-if="props.mode === 'dropdown'" :class="bem.e('trigger')" @click="toggleDropdown">
            <span :class="bem.e('trigger-text')">{{ displayLabel }}</span>
            <SuIcon :class="[bem.e('caret'), bem.is('open', isDropdownOpen)]" icon="chevron-down" />
        </div>
        <transition name="su-selection-zoom">
            <div v-show="isPanelVisible" :class="bem.e('panel')" @click.stop>
                <template v-for="(item, index) in props.items" :key="index">
                    <template v-if="isOption(item)">
                        <SuOption :item="item" :active="isActive(item)" @click="handleSelectAndClose(item)"
                            @keydown.enter.prevent="handleSelectAndClose(item)"
                            @keydown.space.prevent="handleSelectAndClose(item)" />
                    </template>
                    <template v-else>
                        <div :class="bem.e('group-label')">{{ item.label }}</div>
                    </template>
                </template>
            </div>
        </transition>
    </div>
</template>
<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, defineOptions } from 'vue';
import type { SuSelectionProps, SelectionEmits, OptionDataItem, SelectionItem } from './type';
import { useSelection } from './events';
import SuOption from './Item.vue';
import SuIcon from '../Icon/Icon.vue';
import { createNamespace } from "@sukin/utils";
defineOptions({
    name: 'SuSelection',
})
const props = withDefaults(defineProps<SuSelectionProps>(), { items: () => [], multiple: false, disabled: false, size: 'default', shape: 'round', mode: 'box', placeholder: '请选择', });
const emit = defineEmits<SelectionEmits>();
const bem = createNamespace('selection');
const isDropdownOpen = ref(false);
const selectionRef = ref<HTMLDivElement | null>(null);
const { isActive, handleSelect, displayLabel } = useSelection(props, emit);
const isPanelVisible = computed(() => props.mode === 'dropdown' ? isDropdownOpen.value : true);
const closeDropdown = () => isDropdownOpen.value = false;
const toggleDropdown = () => { if (!props.disabled) isDropdownOpen.value = !isDropdownOpen.value; };
const handleSelectAndClose = (item: OptionDataItem) => { handleSelect(item, () => { if (!props.multiple && props.mode === 'dropdown') closeDropdown(); }); };
const handleClickOutside = (event: MouseEvent) => { if (selectionRef.value && !selectionRef.value.contains(event.target as Node)) closeDropdown(); };
onMounted(() => document.addEventListener('click', handleClickOutside));
onUnmounted(() => document.removeEventListener('click', handleClickOutside));
const isOption = (item: SelectionItem): item is OptionDataItem => 'value' in item;
</script>
<style scoped>
@import './style.css';
</style>
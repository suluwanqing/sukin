<template>
    <div ref="selectionRef"
        :class="[bem.b(), bem.m(props.mode), bem.m(props.size), bem.m(props.shape), bem.is('disabled', props.disabled)]"
        @keydown.esc="closeDropdown" tabindex="0">

       
        <div v-if="props.mode === 'dropdown' || props.mode === 'cascader'" :class="bem.e('trigger')"
            @click="toggleDropdown">
            <template v-if="props.mode === 'dropdown' && props.multiple && selectedItems.length > 0">
               
                <span v-for="item in selectedItems" :key="item.value" :class="bem.e('tag')">
                    <span :class="bem.e('tag-text')">{{ item.label }}</span>
                    <SuIcon icon="close" :class="bem.e('tag-close')" @click.stop="handleRemoveTag(item)" />
                </span>
            </template>
            <template v-else-if="props.mode === 'cascader'">
               
                <span v-if="selectedLabels.length > 0" :class="bem.e('selected-item-text')">
                    <span v-for="(label, index) in selectedLabels" :key="index">
                        {{ label }}<template v-if="index < selectedLabels.length - 1"> / </template>
                    </span>
                </span>
                <span v-else :class="[bem.e('trigger-text'), { 'is-placeholder': true }]">
                    {{ displayLabel }}
                </span>
            </template>
            <template v-else>
               
                <span :class="[bem.e('trigger-text'), { 'is-placeholder': !hasSelected }]">
                    {{ displayLabel }}
                </span>
            </template>

        
            <transition name="su-selection-fade">
                <SuIcon v-if="props.clearable && hasSelected && !props.disabled && isDropdownOpen" icon="close-circle"
                    :class="bem.e('clear')" @click.stop="handleClear" />
            </transition>

          
            <SuIcon :class="[bem.e('caret'), bem.is('open', isDropdownOpen)]" icon="chevron-down" />
        </div>

        
        <transition name="su-selection-zoom">
            <div v-show="isPanelVisible" :class="bem.e('panel')" @click.stop ref="selectionPanelRef">
            
                <template v-if="props.mode === 'cascader'">
                    <div v-for="(levelOptions, levelIndex) in displayedCascaderOptions" :key="levelIndex"
                        :class="bem.e('column')">
                        <template v-for="option in levelOptions" :key="option.value">
                            <div :class="[
                                bem.e('option'),
                                bem.is('active', isActive(option.value, levelIndex)),
                                bem.is('disabled', option.disabled)
                            ]" @click="handleSelect(option, levelIndex, closeDropdown)">
                                {{ option.label }}
                                <SuIcon v-if="option.children && option.children.length > 0" icon="chevron-right"
                                    :class="bem.e('option-arrow')" />
                            </div>
                        </template>
                    </div>
                </template>
            
                <template v-else>
                    <template v-for="(item, index) in props.items" :key="index">
                        <template v-if="isOption(item)">
                            <SuOption :item="item" :active="isActive(item.value)" @click="handleSelectAndClose(item)"
                                @keydown.enter.prevent="handleSelectAndClose(item)"
                                @keydown.space.prevent="handleSelectAndClose(item)" />
                        </template>
                        <template v-else>
                            <div :class="bem.e('group-label')">{{ item.label }}</div>
                            <template v-for="(option) in item.options" :key="option.value">
                                <SuOption :item="option" :active="isActive(option.value)"
                                    @click="handleSelectAndClose(option)"
                                    @keydown.enter.prevent="handleSelectAndClose(option)"
                                    @keydown.space.prevent="handleSelectAndClose(option)" />
                            </template>
                        </template>
                    </template>
                </template>
            </div>
        </transition>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, defineOptions } from 'vue';
import type { SuSelectionProps, SelectionEmits, OptionDataItem, SelectionItem, GroupDataItem } from './type';
import { useSelection } from './events';
import SuOption from './Item.vue';
import SuIcon from '../Icon/Icon.vue';
import { createNamespace } from "@sukin/utils";



defineOptions({
    name: 'SuSelection',
});

const props = withDefaults(defineProps<SuSelectionProps>(), {
    items: () => [],
    multiple: false,
    disabled: false,
    size: 'default',
    shape: 'round',
    mode: 'box', 
    placeholder: '请选择',
    clearable: false,
});

const emit = defineEmits<SelectionEmits>();

const bem = createNamespace('selection');

const isDropdownOpen = ref(false);
const selectionRef = ref<HTMLDivElement | null>(null); 
const selectionPanelRef = ref<HTMLDivElement | null>(null); 

const {
    isActive,
    handleSelect,
    displayLabel,
    selectedItems,
    handleRemoveTag,
    handleClear,
    hasSelected,
    // 级联模式特有返回
    selectedLabels,
    displayedCascaderOptions,
} = useSelection(props, emit);


const isPanelVisible = computed(() => {
    if (props.mode === 'box') {
        return true;
    }
    return isDropdownOpen.value;
});

// 关闭下拉/级联面板
const closeDropdown = () => {
    isDropdownOpen.value = false;
};

// 切换下拉/级联面板的显示/隐藏
const toggleDropdown = () => {
    if (!props.disabled) {
        isDropdownOpen.value = !isDropdownOpen.value;
    }
};

// 处理普通模式下选项选择并根据情况关闭下拉菜单
const handleSelectAndClose = (item: OptionDataItem | GroupDataItem) => {
    handleSelect(item as OptionDataItem, undefined, () => {
        // 如果不是多选模式且是 dropdown/cascader 模式，则选择后关闭
        if (!props.multiple && (props.mode === 'dropdown' || props.mode === 'cascader')) {
            closeDropdown();
        }
    });
};

// 点击组件外部时关闭面板的事件处理
const handleClickOutside = (event: MouseEvent) => {
    if (selectionRef.value && !selectionRef.value.contains(event.target as Node)) {
        closeDropdown();
    }
};

onMounted(() => {
    document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
});

// 类型守卫函数：判断一个 SelectionItem 是否为 OptionDataItem (用于普通模式)
const isOption = (item: SelectionItem): item is OptionDataItem => {
    return 'value' in item && !('options' in item) && !('children' in item);
};
</script>

<style scoped>
@import './style.css';
</style>
import type { SuSelectionProps, SelectionEmits, OptionDataItem } from './type';
import { SELECTION_UPDATE_MODEL_EVENT, SELECTION_CHANGE_EVENT } from './constant';
import { computed } from 'vue';

export function useSelection(
    props: Readonly<SuSelectionProps>,
    emit: SelectionEmits
) {
    const handleSelect = (item: OptionDataItem, onSelectCallback?: () => void) => {
        if (props.disabled || item.disabled) return;
        let newValue: any;
        if (props.multiple) {
            const currentValue = Array.isArray(props.modelValue) ? [...props.modelValue] : [];
            const index = currentValue.indexOf(item.value);
            if (index > -1) {
                currentValue.splice(index, 1);
            } else {
                currentValue.push(item.value);
            }
            newValue = currentValue;
        } else {
            newValue = props.modelValue === item.value ? null : item.value;
        }
        emit(SELECTION_UPDATE_MODEL_EVENT, newValue);
        emit(SELECTION_CHANGE_EVENT, newValue);
        onSelectCallback?.();
    };

    const itemMap = computed(() => new Map(
        props.items
            .filter((item): item is OptionDataItem => 'value' in item)
            .map(item => [item.value, item])
    ));

    const isActive = (item: OptionDataItem): boolean => {
        const checkDisabledInModel = (value: any) => itemMap.value.get(value)?.disabled;
        if (props.multiple) {
            if (!Array.isArray(props.modelValue)) return false;
            const enabledModelValue = props.modelValue.filter(val => !checkDisabledInModel(val));
            return enabledModelValue.includes(item.value);
        }
        if (checkDisabledInModel(props.modelValue)) return false;
        return props.modelValue === item.value;
    };

    const displayLabel = computed(() => {
        if (props.multiple) {
            if (!Array.isArray(props.modelValue) || props.modelValue.length === 0) {
                return props.placeholder || '请选择';
            }
            return props.modelValue
                .map(val => itemMap.value.get(val)?.label)
                .filter(Boolean)
                .join(', ');
        }
        const selectedItem = itemMap.value.get(props.modelValue);
        return selectedItem?.label || props.placeholder || '请选择';
    });

    return { isActive, handleSelect, displayLabel };
}
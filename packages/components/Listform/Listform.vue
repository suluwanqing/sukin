<template>
    <div :class="bem.b()">
        <div :class="bem.e('title')">{{ props.title }}</div>

        <div :class="bem.e('fields')">
            <div v-for="row in fieldRows" :key="row[0]?.model + '-' + (row[1]?.model || '')" :class="bem.e('row')">
                <template v-for="field in row" :key="field?.model">
                    <div v-if="field" :class="bem.e('field')">
                        <label :for="field.model" :class="bem.e('label')">
                            {{ field.label }}
                            <span v-if="field.required" class="required-asterisk">*</span>
                        </label>

                        <div :class="bem.e('input-wrapper')">
                            <input v-if="field.type === 'input'" :id="field.model" v-model="formState[field.model]"
                                :placeholder="field.placeholder || ''" :type="field.inputType || 'text'"
                                :disabled="field.disabled" :readonly="field.readonly"
                                :class="{ 'is-error': validationErrors[field.model] }" />

                            <div v-else-if="field.type === 'selection'" :class="bem.e('select-wrapper')">
                                <select :id="field.model" v-model="formState[field.model]" :disabled="field.disabled"
                                    :readonly="field.readonly" :class="{ 'is-error': validationErrors[field.model] }">
                                    <option v-for="(opt, i) in field.options" :key="i"
                                        :value="typeof opt === 'object' ? opt.value : opt">
                                        {{ typeof opt === 'object' ? opt.label : opt }}
                                    </option>
                                </select>
                            </div>

                            <textarea v-else-if="field.type === 'textarea'" :id="field.model"
                                v-model="formState[field.model]" :placeholder="field.placeholder || ''"
                                :rows="field.rows || 3" :cols="field.cols || 50" :disabled="field.disabled"
                                :readonly="field.readonly"
                                :class="{ 'is-error': validationErrors[field.model] }"></textarea>

                            <div v-else-if="field.type === 'file'" :class="bem.e('upload-wrapper')">
                                <input type="file" :id="field.model"
                                    @change="handleFileChangeWrapper($event, field.model)" :accept="field.accept || '*'"
                                    :multiple="field.multiple || false" :disabled="field.disabled || field.readonly"
                                    :class="[bem.e('file-input'), { 'is-error': validationErrors[field.model] }]" />
                                <label :for="field.model"
                                    :class="[bem.e('upload-label'), { 'is-error': validationErrors[field.model] }]"
                                    :disabled="field.disabled || field.readonly">
                                    <span v-if="!formState[field.model]">选择文件</span>
                                    <span v-else :class="bem.e('file-name')">
                                        {{ getFileName(formState[field.model]) }}
                                    </span>
                                </label>
                                <button v-if="formState[field.model] && !field.disabled && !field.readonly"
                                    type="button" :class="bem.e('clear-file-btn')"
                                    @click="clearFileWrapper(field.model)">
                                    ×
                                </button>
                                <div v-if="field.preview && formState[field.model]" :class="bem.e('preview-container')">
                                    <img v-if="isImage(formState[field.model])"
                                        :src="getPreviewUrl(formState[field.model])" :class="bem.e('preview-image')"
                                        alt="Preview" />
                                    <div v-else :class="bem.e('non-image-preview')">
                                        文件已选择: {{ getFileName(formState[field.model]) }}
                                    </div>
                                </div>
                            </div>

                            <div v-if="validationErrors[field.model]" :class="bem.e('error-message')">
                                {{ validationErrors[field.model] }}
                            </div>
                        </div>
                    </div>
                </template>
            </div>
        </div>

        <div :class="bem.e('actions')">
            <button v-for="(action, idx) in props.func" :key="idx" @click="emitActionWrapper(action.emit)" type="button"
                :class="[bem.e('action-btn'), action.emit === 'submit' ? bem.m('primary') : bem.m('secondary')]"
                :disabled="isLoading && action.emit === 'submit'">
                <template v-if="isLoading && action.emit === 'submit'">
                    <span :class="bem.e('loading-spinner')"></span>
                    加载中...
                </template>
                <template v-else>
                    {{ action.label }}
                </template>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, watch, computed, ref, withDefaults, defineOptions } from 'vue';
import { createNamespace } from '@sukin/utils';
import type { SuFormProps, FormState, SuFormEmits, Field } from './type';
import { DEFAULT_FORM_TITLE, DEFAULT_FORM_ACTIONS } from './constants';
import {
    initializeFormState,
    handleFileChange,
    clearFile,
    isImage,
    getPreviewUrl,
    getFileName,
    emitAction,
    resetForm,
} from './events';

defineOptions({
    name: 'SuListForm',
});

const bem = createNamespace('list-form');

const props = withDefaults(defineProps<SuFormProps>(), {
    title: DEFAULT_FORM_TITLE,
    fields: () => [],
    func: () => DEFAULT_FORM_ACTIONS,
    model: () => ({}),
});

const emit = defineEmits<SuFormEmits>();

const formState: FormState = reactive({});
const validationErrors: Record<string, string> = reactive({});
const isLoading = ref(false);

const setValidationErrors = (errors: Record<string, string>) => {
    Object.keys(validationErrors).forEach(key => delete validationErrors[key]);
    Object.assign(validationErrors, errors);
};

const clearValidationErrors = () => {
    Object.keys(validationErrors).forEach(key => delete validationErrors[key]);
};

const setIsLoading = (loading: boolean) => {
    isLoading.value = loading;
};

const handleFileChangeWrapper = (event: Event, fieldName: string) => {
    handleFileChange(event, fieldName, formState, emit);
    if (validationErrors[fieldName]) {
        delete validationErrors[fieldName];
    }
};

const clearFileWrapper = (fieldName: string) => {
    clearFile(fieldName, formState, emit);
    if (validationErrors[fieldName]) {
        delete validationErrors[fieldName];
    }
};

const emitActionWrapper = (type: string) => {
    emitAction(type, formState, props.fields, emit, setValidationErrors, setIsLoading);
    if (type === 'reset') {
        resetFormWrapper();
    }
};

const resetFormWrapper = () => {
    resetForm(formState, props.fields, props.model, clearValidationErrors, emit);
};

watch(() => props.model, (newModel) => {
    if (newModel) {
        initializeFormState(formState, props.fields, newModel);
        clearValidationErrors();
    }
}, { deep: true });

watch(() => props.fields, (newFields) => {
    initializeFormState(formState, newFields, props.model);
    clearValidationErrors();
}, { deep: true, immediate: true });

const fieldRows = computed(() => {
    const res: (Field | null)[][] = [];
    const validFields = props.fields.filter(f => f);

    for (let i = 0; i < validFields.length; i += 2) {
        res.push([validFields[i], validFields[i + 1] || null]);
    }

    return res;
});
</script>

<style scoped>
@import './style.css';

</style>
<template>
   
    <div :class="[bem.b(), bem.m(props.direction), bem.m(props.size), bem.is('with-bg', !!props.backgroundImage)]"
        :style="{ '--su-form-panel-bg-image': `url(${props.backgroundImage})` }">
        <div :class="bem.e('selector')">
            <button v-for="section in props.sections" :key="section.title"
                :class="[bem.e('button'), bem.em('button', 'nav'), bem.is('active', selectedForm === section.title)]"
                @click="onSwitchForm(section.title)">
                {{ section.title }}
            </button>
            <button :class="[bem.e('button'), bem.em('button', 'nav')]" @click="onCloseRequest">
                关闭
            </button>
        </div>

        <div :class="bem.e('container')">
            <SuAlert v-if="generalError" :title="generalError" :closable="false" type="danger" :show-icon="true"
                effect="light" style="margin-bottom: 15px;" />

            <div v-for="section in props.sections" :key="section.title">
                <div v-if="selectedForm === section.title">
                    <h2 :class="bem.e('title')">{{ section.title }}</h2>

                    <!-- 非分步表单 -->
                    <div v-if="!section.step && section.fields" :class="bem.e('form')">
                        <div v-for="field in section.fields" :key="field.id" :class="bem.e('group')">
                            <label :for="field.id" :class="bem.e('label')">{{ field.label }}</label>
                            <input :type="field.type" :id="field.id" v-model="formData[field.id]"
                                :placeholder="field.placeholder" @blur="onFieldBlur(field)"
                                :class="[bem.e('input'), bem.is('invalid', !!formErrors[field.id])]" />
                            <p v-if="formErrors[field.id]" :class="bem.e('error')">{{ formErrors[field.id] }}</p>
                        </div>
                        <div :class="bem.e('actions')">
                            <button :class="[bem.e('button'), bem.em('button', 'action'), bem.em('button', 'primary')]"
                                @click="onSubmit(section)">提交</button>
                        </div>
                    </div>

                    <!-- 分步表单 -->
                    <div v-if="section.step && section.steps" :class="bem.e('form')">
                        <div v-for="stepInfo in section.steps" :key="stepInfo.step">
                            <div v-if="currentStep === stepInfo.step" :class="bem.e('step')">
                                <div v-for="field in stepInfo.fields" :key="field.id" :class="bem.e('group')">
                                    <label :for="field.id" :class="bem.e('label')">{{ field.label }}</label>
                                    <input :type="field.type" :id="field.id" v-model="formData[field.id]"
                                        :placeholder="field.placeholder" @blur="onFieldBlur(field)"
                                        :class="[bem.e('input'), bem.is('invalid', !!formErrors[field.id])]" />
                                    <p v-if="formErrors[field.id]" :class="bem.e('error')">{{ formErrors[field.id] }}
                                    </p>
                                </div>
                                <div :class="bem.e('actions')">
                                    <button
                                        :class="[bem.e('button'), bem.em('button', 'action'), bem.em('button', 'primary')]"
                                        @click="onNextStep(stepInfo, section)">{{ currentStep ===
                                            section.step_model?.All_Steps ? '提交' : '下一步' }}</button>
                                    <button v-if="currentStep > 1"
                                        :class="[bem.e('button'), bem.em('button', 'action'), bem.em('button', 'secondary')]"
                                        @click="onPreviousStep">上一步</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, withDefaults, watch, defineExpose,defineOptions } from 'vue';
import type { FormPanelProps, FormPanelEmits, FormPanelState, FormField, FormSection, FormStep } from './type';
import * as events from './events';
import { createNamespace } from "@sukin/utils"
const bem = createNamespace('form-panel');
import SuAlert from "../Alert/Alert.vue";
import './style.css';
defineOptions({
    name: 'SuDataform'
})
const props = withDefaults(defineProps<FormPanelProps>(), { backgroundImage: '', sections: () => [], size: 'medium', direction: 'vertical', initialForm: '' });
const emit = defineEmits<FormPanelEmits>();

const selectedForm = ref('');
const currentStep = ref(1);
const formData = reactive<Record<string, any>>({});
const formErrors = reactive<Record<string, string | null>>({});
const generalError = ref<string | null>(null);
const touched = ref(new Set<string>());

const state: FormPanelState = {
    selectedForm,
    currentStep,
    formData,
    formErrors,
    generalError,
    touched
};

let alertTimer: ReturnType<typeof setTimeout> | null = null;

const onFieldBlur = (field: FormField) => {
    touched.value.add(field.id);
    events.validateField(field, state);
};

const onCloseRequest = () => events.handleCloseRequest(emit);
const onSwitchForm = (title: string) => events.handleSwitchForm(title, props, state);
const onSubmit = (section: FormSection) => events.handleSubmit(section, state, emit);
const onNextStep = (stepInfo: FormStep, section: FormSection) => events.handleNextStep(stepInfo, section, state, emit);
const onPreviousStep = () => events.handlePreviousStep(state);

watch(generalError, (newError) => {
    if (alertTimer) clearTimeout(alertTimer);
    if (newError) {
        alertTimer = setTimeout(() => {
            generalError.value = null;
        }, 3000);
    }
});

const resetForm = () => events.initializeState(props, state);
defineExpose({ resetForm });

watch(() => props.sections, () => {
    selectedForm.value = props.initialForm || props.sections[0]?.title || '';
    events.initializeState(props, state);
}, { deep: true, immediate: true });
</script>
<template>
    <div :class="[bem.b(), bem.m(props.direction), bem.m(props.size)]"
        :style="{ '--su-form-panel-bg-image': `url(${props.backgroundImage})` }">
        <div :class="bem.e('selector')">
            <button v-for="section in props.sections" :key="section.title"
                :class="[bem.e('button'), bem.em('button', 'nav'), bem.is('active', state.selectedForm.value === section.title)]"
                @click="onSwitchForm(section.title)">
                {{ section.title }}
            </button>
            <button :class="[bem.e('button'), bem.em('button', 'nav')]" @click="onCloseRequest">
                关闭
            </button>
        </div>

        <div :class="bem.e('container')">
            <SuAlert ref="alertRef" :title="state.generalError.value || 'An error occurred'" type="danger"
                :show-icon="true" effect="light" @close="onAlertClose" style="margin-bottom: 15px;" />

            <div v-for="section in props.sections" :key="section.title">
                <div v-if="state.selectedForm.value === section.title">
                    <h2 :class="bem.e('title')">{{ section.title }}</h2>

                    <div v-if="!section.step && section.fields" :class="bem.e('form')">
                        <div v-for="field in section.fields" :key="field.id" :class="bem.e('group')">
                            <label :for="field.id" :class="bem.e('label')">{{ field.label }}</label>
                            <input :type="field.type" :id="field.id" v-model="state.formData[field.id]"
                                :placeholder="field.placeholder"
                                :class="[bem.e('input'), bem.is('invalid', !!state.formErrors[field.id])]" />
                            <p v-if="state.formErrors[field.id]" :class="bem.e('error')">{{ state.formErrors[field.id]
                            }}</p>
                        </div>
                        <div :class="bem.e('actions')">
                            <button :class="[bem.e('button'), bem.em('button', 'action'), bem.em('button', 'primary')]"
                                @click="onSubmit(section)">提交</button>
                        </div>
                    </div>

                    <div v-if="section.step && section.steps" :class="bem.e('form')">
                        <div v-for="stepInfo in section.steps" :key="stepInfo.step">
                            <div v-if="state.currentStep.value === stepInfo.step" :class="bem.e('step')">
                                <div v-for="field in stepInfo.fields" :key="field.id" :class="bem.e('group')">
                                    <label :for="field.id" :class="bem.e('label')">{{ field.label }}</label>
                                    <input :type="field.type" :id="field.id" v-model="state.formData[field.id]"
                                        :placeholder="field.placeholder"
                                        :class="[bem.e('input'), bem.is('invalid', !!state.formErrors[field.id])]" />
                                    <p v-if="state.formErrors[field.id]" :class="bem.e('error')">{{
                                        state.formErrors[field.id] }}</p>
                                </div>
                                <div :class="bem.e('actions')">
                                    <button
                                        :class="[bem.e('button'), bem.em('button', 'action'), bem.em('button', 'primary')]"
                                        @click="onNextStep(stepInfo, section)">{{ state.currentStep.value ===
                                            section.step_model!.All_Steps ? '提交' : '下一步' }}</button>
                                    <button v-if="state.currentStep.value > 1"
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
import { ref, reactive, withDefaults, watch, defineExpose } from 'vue';
import type { FormPanelProps, FormPanelEmits, FormPanelState, FormSection, FormStep } from './type';
import * as events from './events';
import { bem } from './constants';
import SuAlert from "../Alert/Alert.vue"; // Adjust this path
import './style.css';

const props = withDefaults(defineProps<FormPanelProps>(), { backgroundImage: '', sections: () => [], size: 'medium', direction: 'vertical', initialForm: '' });
const emit = defineEmits<FormPanelEmits>();
const state: FormPanelState = { selectedForm: ref(''), currentStep: ref(1), formData: reactive({}), formErrors: reactive({}), generalError: ref(null) };

const alertRef = ref<InstanceType<typeof SuAlert> | null>(null);

const onCloseRequest = () => events.handleCloseRequest(emit);
const onSwitchForm = (title: string) => events.handleSwitchForm(title, props, state);
const onSubmit = (section: FormSection) => events.handleSubmit(section, state, emit);
const onNextStep = (stepInfo: FormStep, section: FormSection) => events.handleNextStep(stepInfo, section, state, emit);
const onPreviousStep = () => events.handlePreviousStep(state);

const onAlertClose = () => { state.generalError.value = null; };

watch(state.generalError, (newError) => {
    if (newError) {
        alertRef.value?.open();
    } else {
        alertRef.value?.close();
    }
});

const resetForm = () => { events.initializeState(props, state); };
defineExpose({ resetForm });

watch(() => props.sections, () => {
    state.selectedForm.value = props.initialForm || props.sections[0]?.title || '';
    events.initializeState(props, state);
}, { deep: true, immediate: true });
</script>
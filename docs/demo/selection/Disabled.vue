<template>
    <div>
        <p style="margin-bottom: 8px;">禁用整个组件</p>
        <su-selection v-model="selectedValue1" :items="options" disabled />

        <p style="margin-top: 20px; margin-bottom: 8px;">禁用单个选项（React被禁用）</p>
        <su-selection v-model="selectedValue2" :items="optionsWithDisabled" />
    </div>
</template>

<script setup>
import { ref } from 'vue';

const selectedValue1 = ref('vue');
const selectedValue2 = ref('vue');

const options = [
    { label: 'Vue', value: 'vue' },
    { label: 'React', value: 'react' },
];

const optionsWithDisabled = [
    { label: 'Vue', value: 'vue' },
    { label: 'React', value: 'react', disabled: true },
    { label: 'Angular', value: 'angular' },
];
</script>
<template>
    <div>
        <p style="margin-bottom: 8px;">盒子模式选中: {{ boxSelectedValues }}</p>
        <su-selection v-model="boxSelectedValues" :items="options" multiple />

        <p style="margin-top: 20px; margin-bottom: 8px;">下拉模式选中: {{ dropdownSelectedValues }}</p>
        <su-selection v-model="dropdownSelectedValues" :items="options" mode="dropdown" multiple
            placeholder="请选择多个框架" />
    </div>
</template>

<script setup>
import { ref } from 'vue';

const boxSelectedValues = ref(['vue']);
const dropdownSelectedValues = ref(['react']);

const options = [
    { label: 'Vue', value: 'vue' },
    { label: 'React', value: 'react' },
    { label: 'Angular', value: 'angular' },
    { label: 'Svelte', value: 'svelte' },
];
</script>
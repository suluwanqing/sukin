<template>
    <div>
        <p style="margin-bottom: 8px;">当前选中: {{ selectedValue }}</p>
        <su-selection v-model="selectedValue" :items="options" />
    </div>
</template>

<script setup>
import { ref } from 'vue';

const selectedValue = ref('vue');

const options = [
    { label: 'Vue', value: 'vue' },
    { label: 'React', value: 'react' },
    { label: 'Angular', value: 'angular' },
];
</script>
<template>
    <div style="display: flex; flex-direction: column; gap: 10px;">
        <su-selection v-model="selectedValue" size="large" :items="options" />
        <su-selection v-model="selectedValue" size="default" :items="options" />
        <su-selection v-model="selectedValue" size="small" :items="options" />
        <su-selection v-model="selectedValue" shape="square" :items="options" style="margin-top: 10px;" />
    </div>
</template>

<script setup>
import { ref } from 'vue';

const selectedValue = ref('vue');

const options = [
    { label: 'Vue', value: 'vue' },
    { label: 'React', value: 'react' },
];
</script>
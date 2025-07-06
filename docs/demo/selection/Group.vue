<template>
    <div>
        <p style="margin-bottom: 8px;">当前选中: {{ selectedValue }}</p>
        <su-selection v-model="selectedValue" :items="groupedOptions" />
    </div>
</template>

<script setup>
import { ref } from 'vue';

const selectedValue = ref('shanghai');

const groupedOptions = [
    { label: '热门城市' },
    { label: '北京', value: 'beijing' },
    { label: '上海', value: 'shanghai' },
    { label: '其他城市' },
    { label: '广州', value: 'guangzhou' },
    { label: '深圳', value: 'shenzhen' },
];
</script>
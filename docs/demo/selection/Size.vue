<template>
    <div class="demo-wrapper">
        <p>Dropdown - Small:</p>
        <SuSelection v-model="value" :items="basicOptionsData" size="small" placeholder="小尺寸" mode="dropdown" />
        <p>Dropdown - Default:</p>
        <SuSelection v-model="value" :items="basicOptionsData" size="default" placeholder="默认尺寸" mode="dropdown" />
        <p>Dropdown - Large:</p>
        <SuSelection v-model="value" :items="basicOptionsData" size="large" placeholder="大尺寸" mode="dropdown" />

        <p>Box - Square:</p>
        <SuSelection v-model="value2" :items="basicOptionsData" multiple shape="square" mode="box" />
        <p>Box - Round (默认):</p>
        <SuSelection v-model="value3" :items="basicOptionsData" multiple shape="round" mode="box" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { SuSelection } from 'sukin';

const basicOptionsData= [
    { label: '北京', value: 'beijing' },
    { label: '上海', value: 'shanghai' },
    { label: '广州', value: 'guangzhou' },
    { label: '深圳', value: 'shenzhen', disabled: true },
    { label: '杭州', value: 'hangzhou' },
];

const value = ref < string | null > (null);
const value2 = ref < string[] > (['beijing']);
const value3 = ref < string[] > (['shanghai']);
</script>

<style scoped>
.demo-wrapper {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 20px;
    border: 1px solid var(--vp-c-divider);
    border-radius: 8px;
    margin-top: 16px;
}

p {
    font-size: 14px;
    color: var(--vp-c-text-2);
    margin: 0;
}

.su-selection {
    max-width: 400px;
    margin-bottom: 10px;
}
</style>
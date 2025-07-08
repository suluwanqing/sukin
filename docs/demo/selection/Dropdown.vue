<template>
  <div class="demo-wrapper">
    <p>当前值: {{ value || '无' }}</p>
    <SuSelection v-model="value" :items="basicOptionsData" placeholder="请选择一个城市" mode="dropdown" clearable />
    <button @click="value = 'hangzhou'">设为杭州</button>
    <button @click="value = null">清空</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { SuSelection } from 'sukin';

const basicOptionsData = [
  { label: '北京', value: 'beijing' },
  { label: '上海', value: 'shanghai' },
  { label: '广州', value: 'guangzhou' },
  { label: '深圳', value: 'shenzhen', disabled: true },
  { label: '杭州', value: 'hangzhou' },
];

const value = ref < string | null > (null);
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
  max-width: 250px;
}

button {
  padding: 8px 12px;
  background-color: var(--vp-c-brand-1);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s;
  margin-right: 8px;
}

button:hover {
  background-color: var(--vp-c-brand-2);
}
</style>
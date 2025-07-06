<template>
    <div class="demo-wrapper">
        <SuDataform :sections="formSections" initial-form="登录" @submit="handleSubmit" @close="handleClose" />
        <div v-if="eventMessage" class="event-feedback">
            <p><strong>事件反馈:</strong></p>
            <pre>{{ eventMessage }}</pre>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { SuDataform } from "sukin";
import { formSections } from './data';

const eventMessage = ref('');

const handleSubmit = (formType: string, data: Record<string, any>) => {
    eventMessage.value = `表单 "${formType}" 已提交\n数据: ${JSON.stringify(data, null, 2)}`;
};

const handleClose = () => {
    eventMessage.value = `关闭按钮于 ${new Date().toLocaleTimeString()} 被点击。`;
};
</script>

<style scoped>
.demo-wrapper {
    max-width: 460px;
    margin: 0 auto;
}

.event-feedback {
    margin-top: 20px;
    padding: 15px;
    border-radius: 8px;
    background-color: #f3f4f6;
    border: 1px solid #e5e7eb;
    white-space: pre-wrap;
    word-wrap: break-word;
}
</style>
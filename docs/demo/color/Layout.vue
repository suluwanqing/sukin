
<template>
    <div class="color-palette-container">
        <transition name="toast-slide-in-top">
            <div v-if="alertState.visible" class="alert-toast-wrapper">
                <su-alert :title="alertState.title" type="success" show-icon closable=false />
            </div>
        </transition>


        <div class="color-group">
            <h3 class="group-title">主色</h3>
            <div class="color-grid">
                <SuColorItem v-for="color in colorData.primary" :key="color.var" :color="color.value" :name="color.name"
                    @copy="handleCopy" />
            </div>
        </div>

        <div class="color-group">
            <h3 class="group-title">功能色</h3>
            <div class="color-grid">
                <SuColorItem v-for="color in colorData.functional" :key="color.var" :color="color.value"
                    :name="color.name" @copy="handleCopy" />
            </div>
        </div>

        <div class="color-group">
            <h3 class="group-title">中性色</h3>
            <div class="color-grid">
                <SuColorItem v-for="color in colorData.neutral" :key="color.var" :color="color.value" :name="color.name"
                    @copy="handleCopy" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive } from 'vue';
const alertState = reactive({
    visible: false,
    title: '',
    type: 'success',
});

let autoHideTimer = null;
const showAlert = (options) => {
    Object.assign(alertState, { ...options, visible: true });
    if (autoHideTimer) clearTimeout(autoHideTimer);
    autoHideTimer = setTimeout(hideAlert, 3000);
};

const hideAlert = () => {
    alertState.visible = false;
};
const handleCopy = ({ color, name }) => {
    navigator.clipboard.writeText(color).then(() => {
        showAlert({
            title: '复制成功',
            type: 'success',
        });
    }).catch(() => {
        showAlert({
            title: '复制失败',
            type: 'danger',
        });
    });
};

const colorData = {
    primary: [
        { name: 'Primary', var: '--su-color-primary', value: '#2d8cf0' },
        { name: 'Light', var: '--su-color-primary-light', value: '#5cadff' },
        { name: 'Dark', var: '--su-color-primary-dark', value: '#2b85e4' }
    ],
    functional: [
        { name: 'Success', var: '--su-color-success', value: '#19be6b' },
        { name: 'Warning', var: '--su-color-warning', value: '#ff9900' },
        { name: 'Error', var: '--su-color-error', value: '#ed4014' },
        { name: 'Info', var: '--su-color-info', value: '#2db7f5' }
    ],
    neutral: [
        { name: 'Title', var: '--su-color-title', value: '#17233d' },
        { name: 'Text', var: '--su-color-text', value: '#515a6e' },
        { name: 'Sub Text', var: '--su-color-sub', value: '#808695' },
        { name: 'Disabled', var: '--su-color-disabled', value: '#c5c8ce' },
        { name: 'Border', var: '--su-color-border', value: '#dcdee2' }
    ]
};
</script>

<style scoped>
.alert-toast-wrapper {
    position: fixed;
    top: 24px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 9999;
}

.toast-slide-in-top-enter-active,
.toast-slide-in-top-leave-active {
    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.toast-slide-in-top-enter-from,
.toast-slide-in-top-leave-to {
    opacity: 0;
    transform: translate(-50%, -100px);
}

.color-group {
    margin-bottom: 32px;
}

.group-title {
    font-size: 18px;
    font-weight: 600;
    margin: 0 0 16px;
    color: #1f2937;
}

.color-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;
}
</style>
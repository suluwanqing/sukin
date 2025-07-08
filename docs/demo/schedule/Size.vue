<template>
    <div class="size-demo-container">
        <div class="size-demo-section">
            <div class="size-demo-header">
                <h4 class="size-demo-title">Large</h4>
                <div class="size-demo-description">大尺寸，适合大屏幕展示</div>
            </div>
            <div class="size-demo-content">
                <su-schedule size="large" :draggable-items="draggableItems" :labels="labels" :meta-info="metaInfo"
                    :grid-structure="gridStructure" />
            </div>
        </div>

        <div class="size-demo-section">
            <div class="size-demo-header">
                <h4 class="size-demo-title">Medium (默认)</h4>
                <div class="size-demo-description">中等尺寸，适合大多数场景</div>
            </div>
            <div class="size-demo-content">
                <su-schedule size="medium" :draggable-items="draggableItems" :labels="labels" :meta-info="metaInfo"
                    :grid-structure="gridStructure" />
            </div>
        </div>

        <div class="size-demo-section">
            <div class="size-demo-header">
                <h4 class="size-demo-title">Small</h4>
                <div class="size-demo-description">小尺寸，适合紧凑空间</div>
            </div>
            <div class="size-demo-content">
                <su-schedule size="small" :draggable-items="draggableItems" :labels="labels" :meta-info="metaInfo"
                    :grid-structure="gridStructure" />
            </div>
        </div>
    </div>
</template>

<script setup>
const draggableItems = [
    { name: 'CH', label: '语文' },
    { name: 'MA', label: '数学' },
    { name: 'EN', label: '英语' },
    { name: 'PE', label: '体育' },
    { name: 'AR', label: '美术' },
    { name: 'MU', label: '音乐' },
    { name: 'CS', label: '计算机' },
];

const labels = [
    { label: "周一" }, { label: '周二' }, { label: "周三" }, { label: "周四" }, { label: "周五" },
];

const metaInfo = [
    { label: "8:00-9:40" }, { label: "10:00-11:40" }, { label: "14:00-15:40" }, { label: "16:00-17:40" },
];

const gridStructure = [4, 4, 4, 4, 4];
</script>

<style scoped>
.size-demo-container {
    display: flex;
    flex-direction: column;
    gap: 32px;
    margin: 0 auto;
    padding: 20px;
}

.size-demo-section {
    display: flex;
    flex-direction: column;
    gap: 16px;
    border: 1px solid #eaeaea;
    border-radius: 8px;
    padding: 20px;
    background: #fafafa;
    width: min-content;
}

.size-demo-header {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding-bottom: 12px;
    border-bottom: 1px solid #eee;
}

.size-demo-title {
    margin: 0;
    font-size: 18px;
    color: #333;
    font-weight: 500;
}

.size-demo-description {
    font-size: 14px;
    color: #666;
}

.size-demo-content {
    width: 100%;
}
</style>
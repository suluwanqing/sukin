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
import { draggableItems, labels, metaInfo, gridStructure } from './data.ts';
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
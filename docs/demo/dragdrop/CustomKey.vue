<template>
    <div class="demo-container">
        <div class="drag-drop-section">
            <p>数据项唯一键为 <code>data.uuid</code>, 组件已设置 <code>:onlykey="'data.uuid'"</code>。</p>
            <h3>拖放区域</h3>
            <SuDragDrop :items="allItems" :onlykey="'data.uuid'" @change="handleChange" class="drag-drop-component" />
        </div>

        <!-- 辅助展示区域 -->
        <div class="results-section">
            <div class="result-card">
                <div class="result-header">
                    <span class="icon">📦</span>
                    <h3>源列表 (Source)</h3>
                </div>
                <div class="result-content">
                    <pre>{{ JSON.stringify(currentSource, null, 2) }}</pre>
                </div>
            </div>

            <div class="result-card">
                <div class="result-header">
                    <span class="icon">✅</span>
                    <h3>已放置 (Placed)</h3>
                </div>
                <div class="result-content">
                    <pre>{{ JSON.stringify(currentPlaced, null, 2) }}</pre>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const allItems = ref([
    { data: { uuid: 'uuid-001' }, name: '用户 A' },
    { data: { uuid: 'uuid-002' }, name: '用户 B' },
    { data: { uuid: 'uuid-003' }, name: '用户 C' },
]);

// 初始化状态
const currentSource = ref(allItems.value);
const currentPlaced = ref([]);

const handleChange = (payload) => {
    currentSource.value = payload.source;
    currentPlaced.value = payload.placed;
};
</script>

<style scoped>
.demo-container {
    display: flex;
    gap: 32px;
    max-width: 1200px;
    margin: 0 auto;
    padding: 24px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.drag-drop-section {
    flex: 1;
    min-width: 300px;
}

.drag-drop-section h3 {
    color: #4a5568;
    margin-bottom: 16px;
    font-size: 18px;
    font-weight: 600;
}

.drag-drop-component {
    border: 2px dashed #e2e8f0;
    border-radius: 12px;
    padding: 20px;
    background-color: #f8fafc;
    min-height: 200px;
}

.results-section {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 24px;
}

.result-card {
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    overflow: hidden;
}

.result-header {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px 20px;
    background: linear-gradient(135deg, #f6f9fc 0%, #eef2f5 100%);
    border-bottom: 1px solid #edf2f7;
}

.result-header h3 {
    margin: 0;
    font-size: 16px;
    color: #2d3748;
    font-weight: 600;
}

.result-header .icon {
    font-size: 20px;
}

.result-content {
    padding: 16px;
}

pre {
    margin: 0;
    font-family: 'Consolas', 'Monaco', monospace;
    font-size: 13px;
    line-height: 1.5;
    color: #4a5568;
    background-color: #f8fafc;
    padding: 16px;
    border-radius: 8px;
    overflow-x: auto;
    max-height: 200px;
    overflow-y: auto;
}

@media (max-width: 768px) {
    .demo-container {
        flex-direction: column;
        gap: 24px;
    }
}
</style>
<template>
    <div class="demo-page-wrapper">
        <div class="demo-container">
            <header class="demo-header">
                <h1 class="demo-title">SuSelection 组件展示</h1>
                <p class="demo-subtitle">一个支持盒子、下拉、列表和分组的灵活选择器</p>
            </header>

            <!-- 示例一：盒子模式 -->
            <section class="demo-section">
                <div class="section-header">
                    <h2 class="section-title">1. 盒子模式 (Box Mode)</h2>
                    <p class="section-description">
                        默认模式，适合标签云、技能选择等场景。通过在 `items` 数组中加入 `{type: 'group', ...}` 来实现分组。
                    </p>
                </div>
                <div class="component-display">
                    <SuSelection v-model="boxSelection" :items="projectTools" multiple size="default" shape="square" />
                </div>
                <div class="feedback">
                    <span class="feedback-label">v-model:</span>
                    <code>{{ JSON.stringify(boxSelection) }}</code>
                </div>
            </section>

            <!-- 示例二：下拉菜单模式 (原生外观) -->
            <section class="demo-section">
                <div class="section-header">
                    <h2 class="section-title">2. 下拉菜单模式 (Dropdown Mode)</h2>
                    <p class="section-description">
                        设置 `mode="dropdown"`，其外观和行为完全模拟原生。单选后会自动关闭。
                    </p>
                </div>
                <div class="component-display">
                    <SuSelection v-model="dropdownSelection" :items="officeSupplies" mode="dropdown" size="large"
                        placeholder="选择办公用品..." />
                </div>
                <div class="feedback">
                    <span class="feedback-label">v-model:</span>
                    <code>{{ JSON.stringify(dropdownSelection) }}</code>
                </div>
            </section>

            <!-- 示例三：列表模式 -->
            <section class="demo-section">
                <div class="section-header">
                    <h2 class="section-title">3. 列表模式 (List Mode)</h2>
                    <p class="section-description">
                        设置 `mode="list"`，呈现为一个可垂直滚动的列表框，适合在固定区域内进行多选。
                    </p>
                </div>
                <div class="component-display">
                    <SuSelection v-model="listSelection" :items="projectTools" mode="list" multiple />
                </div>
                <div class="feedback">
                    <span class="feedback-label">v-model:</span>
                    <code>{{ JSON.stringify(listSelection) }}</code>
                </div>
            </section>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
// 模拟从您的库中导入组件
import { SuSelection } from "sukin";

// --- 盒子模式数据 ---
const boxSelection = ref<string[]>(['figma', 'vscode']);

// --- 下拉模式数据 ---
const dropdownSelection = ref<string | null>('pen');

// --- 列表模式数据 ---
const listSelection = ref<string[]>(['github']);

// --- 通用数据源 ---

// 用于盒子模式和列表模式的数据
const projectTools = [
    { type: 'group', label: '设计工具' },
    { value: 'figma', label: 'Figma' },
    { value: 'sketch', label: 'Sketch' },
    { value: 'photoshop', label: 'Photoshop' },
    { type: 'group', label: '开发与协作' },
    { value: 'vscode', label: 'VS Code' },
    { value: 'github', label: 'GitHub' },
    { value: 'jira', label: 'Jira' },
    { value: 'slack', label: 'Slack', disabled: true },
];

// 用于下拉模式的数据
const officeSupplies = [
    { type: 'group', label: '书写工具' },
    { value: 'pen', label: '🖊️ 钢笔' },
    { value: 'pencil', label: '✏️ 铅笔' },
    { value: 'marker', label: '记号笔' },
    { type: 'group', label: '办公设备' },
    { value: 'printer', label: '打印机' },
    { value: 'scanner', label: '扫描仪 (禁用)', disabled: true },
    { value: 'projector', label: '投影仪' },
];
</script>

<style scoped>
/* 全局页面包裹层，提供一个柔和的背景色 */
.demo-page-wrapper {
    background-color: #f4f7f9;
    padding: 40px 20px;
    min-height: 100vh;
}

/* 主容器，居中并设置最大宽度 */
.demo-container {
    max-width: 800px;
    margin: 0 auto;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* 页面头部样式 */
.demo-header {
    text-align: center;
    margin-bottom: 50px;
}

.demo-title {
    font-size: 2.5rem;
    font-weight: 700;
    color: #1a202c;
    margin: 0;
}

.demo-subtitle {
    font-size: 1.1rem;
    color: #718096;
    margin-top: 10px;
}

/* 卡片式示例区域 */
.demo-section {
    background-color: #ffffff;
    border-radius: 12px;
    padding: 28px 32px;
    margin-bottom: 32px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease-in-out;
    border: 1px solid #e2e8f0;
}

/* 鼠标悬浮在卡片上的效果，增加交互感 */
.demo-section:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
}

/* 区域头部，包含标题和描述 */
.section-header {
    margin-bottom: 24px;
    padding-bottom: 16px;
    border-bottom: 1px solid #e2e8f0;
}

.section-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: #2d3748;
    margin: 0 0 8px 0;
}

.section-description {
    font-size: 1rem;
    color: #4a5568;
    line-height: 1.6;
    margin: 0;
}

/* 组件展示区域 */
.component-display {
    padding: 16px 0;
}

/* 反馈框，用于显示 v-model 的值 */
.feedback {
    margin-top: 20px;
    padding: 12px 16px;
    background-color: #f7fafc;
    border-radius: 8px;
    border: 1px solid #e8edf3;
    color: #4a5568;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    gap: 8px;
}

.feedback-label {
    font-weight: 500;
    color: #718096;
}

/* 代码样式，用于显示 JSON 数据 */
.feedback code {
    font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
    color: #2d3748;
    font-weight: 600;
    background-color: rgba(0, 123, 255, 0.05);
    padding: 2px 6px;
    border-radius: 4px;
}
</style>
<template>
    <div class="example-container">
        <header class="example-header">
            <h1>SuSchedule 组件使用示例</h1>
            <p>
                此示例演示如何在只导入 <code>SuSchedule</code> 组件本身的情况下使用它，
                并利用 <code>:quantity-key="'limit'"</code> 属性指定一个自定义的数量限制字段。
            </p>
        </header>

        <main class="schedule-wrapper">
            <SuSchedule :draggable-items="scheduleItems" :labels="weekLabels" :meta-info="timeSlots"
                :grid-structure="classGrid" :quantity-key="'limit'" @export-data="handleExport" />
        </main>

        <footer class="data-display" v-if="exportedData">
            <h2>捕获到的 "export-data" 事件数据</h2>
            <p>点击组件内的 "保存数据" 按钮后，下方会显示通过事件传递出来的数据。</p>
            <pre>{{ JSON.stringify(exportedData, null, 2) }}</pre>
        </footer>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
// 严格遵守要求：只从 'sukin' 库中导入 SuSchedule 组件
import { SuSchedule } from 'sukin';

// 1. 定义可拖拽项。
//    注意：我们没有导入 DraggableItem 类型，而是直接定义对象。
//    数量限制字段被命名为 'limit'，以匹配上面模板中 :quantity-key 的值。
const scheduleItems = ref([
    { name: 'core-math', label: '核心课程', limit: 2 },
    { name: 'pe', label: '体育', limit: 1 },
    { name: 'elective-art', label: '美术选修', limit: 1 },
    { name: 'lab', label: '科学实验', limit: 2 },
    { name: 'free-time', label: '自由活动' }, // 没有 limit 字段，代表无限数量
]);

// 2. 定义行/列的标签 (这里是星期)
const weekLabels = ref([
    { label: '周一' },
    { label: '周二' },
    { label: '周三' },
    { label: '周四' },
    { label: '周五' },
]);

// 3. 定义行/列的元信息 (这里是时间段)
const timeSlots = ref([
    { label: '8:00-9:00' },
    { label: '9:00-10:00' },
    { label: '10:00-11:00' },
    { label: '午休' },
    { label: '14:00-15:00' },
    { label: '15:00-16:00' },
]);

// 4. 定义网格结构 (5天，每天6个课时)
const classGrid = ref([6, 6, 6, 6, 6]);

// 5. 用于存储从子组件接收到的数据。
//    由于没有导入 ExportData 类型，我们使用 `any` 或 `unknown`。
const exportedData = ref<any | null>(null);

// 6. 处理子组件触发的 `export-data` 事件。
//    同样，参数 `data` 的类型被设置为 `any`。
const handleExport = (data: any) => {
    console.log('从 SuSchedule 组件接收到数据:', data);
    exportedData.value = data;
};
</script>

<style scoped>
.example-container {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem;
    color: #333;
}

.example-header {
    text-align: center;
    margin-bottom: 2rem;
    border-bottom: 1px solid #eee;
    padding-bottom: 1.5rem;
}

.example-header h1 {
    font-size: 2.5rem;
    color: #2c3e50;
}

.example-header p {
    font-size: 1.1rem;
    color: #666;
    line-height: 1.6;
}

.example-header code {
    background-color: #e8edff;
    color: #4a6bdf;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 1rem;
    font-family: 'Courier New', Courier, monospace;
}

.schedule-wrapper {
    height: 75vh;
    /* 为组件提供一个固定的高度，以便其内部可以滚动 */
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    overflow: hidden;
    /* 确保子组件的圆角生效 */
}

.data-display {
    margin-top: 3rem;
    padding: 1.5rem;
    background-color: #f9f9f9;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
}

.data-display h2 {
    margin-top: 0;
    color: #2c3e50;
}

.data-display pre {
    background-color: #2d2d2d;
    color: #a9b7c6;
    padding: 1rem;
    border-radius: 6px;
    white-space: pre-wrap;
    /* 自动换行 */
    word-break: break-all;
    font-family: 'Courier New', Courier, monospace;
}
</style>
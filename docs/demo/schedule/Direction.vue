<template>
    <div class="schedule-demo-container">
        <div class="demo-section">
            <h4 class="demo-title">Horizontal (默认)</h4>
            <div class="demo-wrapper horizontal-demo">
                <su-schedule direction="horizontal" :draggable-items="draggableItems" :labels="labels"
                    :meta-info="metaInfo" :grid-structure="gridStructure" />
            </div>
        </div>

        <div class="demo-section">
            <h4 class="demo-title">Vertical</h4>
            <div class="demo-wrapper vertical-demo">
                <su-schedule direction="vertical" :draggable-items="draggableItems" :labels="labels"
                    :meta-info="metaInfo" :grid-structure="verticalGridStructure" />
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
const verticalGridStructure = [5, 5, 5, 5];
</script>

<style scoped>
.schedule-demo-container {
    display: flex;
    flex-direction: column;
    gap: 40px;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

.demo-section {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.demo-title {
    margin: 0;
    font-size: 18px;
    color: #333;
    font-weight: 500;
    padding-bottom: 8px;
    border-bottom: 1px solid #eee;
}

.demo-wrapper {
    border: 1px solid #eaeaea;
    border-radius: 8px;
    overflow: hidden;
    background: #fafafa;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.horizontal-demo {
    width: 100%;
}

.vertical-demo {
    width: 100%;
}
</style>
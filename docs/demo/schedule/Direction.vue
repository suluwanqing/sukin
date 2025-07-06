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
import { draggableItems, labels, metaInfo, gridStructure } from './data.ts';
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
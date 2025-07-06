<template>
    <div style="margin: auto;">
        <su-schedule :draggable-items="draggableItems" :labels="labels" :meta-info="metaInfo"
            :grid-structure="gridStructure" />
    </div>
</template>

<script setup>
import { draggableItems, labels, metaInfo, gridStructure } from './data.ts';
</script>
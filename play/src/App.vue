<template>
  <div style="height: 550px; margin: auto;">
    <su-schedule :draggable-items="draggableItems" :labels="labels" :meta-info="metaInfo"
      :grid-structure="gridStructure" orientation="vertical" />
  </div>
</template>

<script setup>
import { draggableItems, labels, metaInfo, gridStructure } from './data.ts';
</script>
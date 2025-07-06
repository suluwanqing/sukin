<template>
  <div>
    <su-button type="primary" loading>Loading</su-button>
    <su-button type="primary" loading-icon="circle-notch" loading>Loading</su-button>
    <su-button type="primary" loading>
      <template #loading>
        <su-icon style="margin-right: 6px" icon="star" spin />
      </template>
      Loading
    </su-button>
  </div>
</template>

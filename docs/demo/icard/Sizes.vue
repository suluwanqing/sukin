<template>
    <h3>尺寸</h3>
    <div>
        <su-icard :items="items" mode="stack" size="small" :stackOffset="40" :stackRotate="5" />
    </div>


    <div>
        <h3 style="margin-top: 40px;">Medium</h3>
        <su-icard :items="items" mode="stack" size="medium" />
    </div>

    <div>
        <h3 style="margin-top: 40px;">Large</h3>
        <su-icard :items="items" mode="stack" size="large" :stackOffset="120" :stackRotate="8" />
    </div>
    <div>
        <h3 style="margin-top: 40px;">Custom</h3>
        <su-icard :items="items" mode="peek" :cardWidth="350" :cardHeight="250" :peekOffset="80" :peekScale="0.6" />
    </div>


</template>
<script setup>
const items = [
    { id: 1, title: 'Card 1' },
    { id: 2, title: 'Card 2' },
    { id: 3, title: 'Card 3' },
];
</script>
<style scoped>
.div {
    padding: 250px 0px;
}
</style>

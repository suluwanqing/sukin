<template>
    <i :class="[bem.b(), type && bem.m(type)]" :style="customStyles" v-bind="$attrs">
        <font-awesome-icon v-bind="filterProps" />
    </i>
</template>

<script lang="ts" setup>
import { type IconProps } from "./types";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { omit } from "lodash-es";
import { computed } from "vue";
import { createNamespace } from "@sukin/utils/create";

defineOptions({
    name: "SuIcon",
    inheritAttrs: false,
});

const props = defineProps<IconProps>();

const bem = createNamespace("icon");
const filterProps = computed(() => omit(props, ["type", "color"]));
const customStyles = computed(() => ({ color: props.color ?? void 0 }));
</script>

<style scoped>
/* @import "./style.css"; */
</style>
<template>
  <component ref="_ref" :is="tag" :class="[
    bem.b(),
    type ? bem.m(type) : '',
    size ? bem.m(size) : '',
    {
      [bem.m('round')]: round,
      [bem.m('circle')]: circle,
      [bem.m('plain')]: plain,
    },
    bem.is('disabled', disabled),
    bem.is('loading', loading)
  ]" :type="tag === 'button' ? nativeType : undefined" :disabled="disabled || loading"
    @click="(e: MouseEvent) => (useThrottle ? handleClickThrottle(e) : handleClick(e))">
    <template v-if="loading">
      <slot name="loading">
        <SuIcon class="loading-icon" :class="[bem.e('icon'), bem.em('icon', 'spinner')]"
          :icon="loadingIcon ?? 'spinner'" :style="iconStyle" spin size="1x" />
      </slot>
    </template>
    <SuIcon v-if="icon && !loading" :class="bem.e('icon')" :icon="icon" :style="iconStyle" size="1x" />
    <span v-if="slots.default && !circle" :class="bem.e('text')">
      <slot></slot>
    </span>
  </component>
</template>

<script setup lang="ts">
import { defineOptions, withDefaults, defineSlots, ref, defineExpose, computed, inject } from "vue";
import { createNamespace } from "@sukin/utils/create";
import type { ButtonProps, ButtonEmits, ButtonInstance } from "./types";
import { throttle } from "lodash-es";
import SuIcon from "../Icon/Icon.vue";
import { BUTTON_GROUP_CTX_KEY } from "./constants";
const bem = createNamespace('button');
defineOptions({
  name: 'SuButton'
});

//props定义接收
const props = withDefaults(defineProps<ButtonProps>(), {
  tag: 'button',
  nativeType: 'button',
  useThrottle: true,
  throttleDuration: 300,
});

//双向类型绑定验证
const _ref = ref<HTMLButtonElement>()

//slots定义,实际就是相当于为slot提供一些配置,包括条件过滤等,一般默认即可好了。
//不然可能影响预先定义的slot（这里是一个坑,如slot name=这个时候这个name也需要符合类型验证）
const slots = defineSlots();

//这个ctx实际是预留的组展示,利用provide向上查找实现默认值
const ctx = inject(BUTTON_GROUP_CTX_KEY, void 0)
const size = computed(() => ctx?.size ?? props?.size ?? '')
const type = computed(() => ctx?.type ?? props?.type ?? '')
const disabled = computed(() => ctx?.disabled ?? props?.disabled ?? false)
const loading = computed(() => ctx?.loading ?? props?.loading ?? false)


const iconStyle = computed(() => {
  if (slots.default && !props.circle && (props.icon || props.loading)) {
    return { marginRight: '6px' };
  }
  return {};
});

const emit = defineEmits<ButtonEmits>();

//向外暴漏ref对应的是什么(覆盖ref),用来真正的限制ref向外暴漏的属性
defineExpose<ButtonInstance>({
  ref: _ref
});

const handleClick = (e: MouseEvent) => {
  if (props.disabled || props.loading) {
    e.preventDefault();
    return;
  }
  emit("click", e);
};
const handleClickThrottle = throttle(handleClick, props.throttleDuration, { leading: true, trailing: false });

</script>

<style scoped>
@import './style.css';
</style>
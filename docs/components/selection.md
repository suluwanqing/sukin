---
title: SuSelection
description: SuSelection组件文档

next:
  link: /components/input
  text: Input 输入框

prev:
  link: /components/alert
  text: Alert 提示
---

# SuSelection 选择器

用于从预设的一组选项中进行选择，支持单选、多选、分组和下拉等多种模式。

## 基础用法

最基础的用法，通过 `v-model` 绑定选中的值。默认为单选的盒子模式。

::: preview
demo-preview=../demo/selection/Basic.vue
:::

## 下拉菜单模式

通过设置 `mode` 为 `dropdown`，可以将选择器变为下拉菜单。

::: preview
demo-preview=../demo/selection/Dropdown.vue
:::

## 多选

设置 `multiple` 属性可以开启多选模式。此时 `v-model` 绑定的值应为数组类型。

::: preview
demo-preview=../demo/selection/Multiple.vue
:::

## 选项分组

在 `items` 数组中，可以传入不带 `value` 属性的对象来作为分组的标签。

::: preview
demo-preview=../demo/selection/Group.vue
:::

## 禁用状态

通过 `disabled` 属性可以禁用整个选择器。也可以在 `items` 数据中为单个选项设置 `disabled: true` 来禁用该选项。

::: preview
demo-preview=../demo/selection/Disabled.vue
:::

## 不同尺寸和形状

通过 `size` 属性可以设置选择器的尺寸，可选值为 `large`、`small`。通过 `shape` 属性可以设置形状，可选值为 `square`。

::: preview
demo-preview=../demo/selection/Size.vue
:::

## SuSelection API

### Props

| Name        | Description          | Type                                       | Default     |
| ----------- | -------------------- | ------------------------------------------ | ----------- |
| v-model     | 绑定值               | `string \| number \| (string \| number)[]` | —           |
| items       | 选项数据源           | `SelectionItem[]`                          | `[]`        |
| mode        | 选择器模式           | `enum` - `'box' \| 'dropdown'`             | `'box'`     |
| multiple    | 是否支持多选         | `boolean`                                  | `false`     |
| disabled    | 是否禁用             | `boolean`                                  | `false`     |
| size        | 尺寸                 | `enum` - `'default' \| 'large' \| 'small'` | `'default'` |
| shape       | 形状                 | `enum` - `'round' \| 'square'`             | `'round'`   |
| placeholder | 下拉模式下的占位文本 | `string`                                   | `'请选择'`  |

### Events

| Name              | Description                | Type                   |
| ----------------- | -------------------------- | ---------------------- |
| update:modelValue | `v-model` 更新时触发的事件 | `(value: any) => void` |
| change            | 选中值改变时触发           | `(value: any) => void` |

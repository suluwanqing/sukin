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

`SuSelection` 组件是一个多功能的选择器，用于从预设的选项中进行选择。它支持单选、多选、分组和多种交互模式，包括扁平的盒子（`box`）模式、下拉菜单（`dropdown`）模式，以及**多级级联（`cascader`）模式**。

## 基础用法

最基础的用法，通过 `v-model` 绑定选中的值。默认为单选的 `box` 模式（标签形式）。

::: preview
demo-preview=../demo/selection/Basic.vue
:::

## 下拉菜单模式

通过设置 `mode` 为 `dropdown`，可以将选择器变为下拉菜单形式。

::: preview
demo-preview=../demo/selection/Dropdown.vue
:::

## 多选

设置 `multiple` 属性可以开启多选模式。此时 `v-model` 绑定的值应为数组类型。

::: preview
demo-preview=../demo/selection/Multiple.vue
:::

## 选项分组

在 `items` 数组中，可以传入不带 `value` 属性的对象来作为分组的标签。例如 `{ label: '分组名', options: [...] }`。

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

## 级联模式

通过设置 `mode` 为 `cascader`，`SuSelection` 将转变为一个级联选择器。它会接收嵌套的 `items` 数据结构，`v-model` 绑定一个代表完整选中路径的字符串数组。

::: info 注意
在 `cascader` 模式下：

- `multiple` 属性不再生效（级联选择通常是单路径）。
- `items` 数据结构应为 `CascaderOption[]` (即包含 `children` 属性的嵌套结构)。
- `v-model` 应绑定 `string[] | null` 类型，表示选中路径。
  :::

::: preview
demo-preview=../demo/selection/Cascader.vue
:::



## Props

| Name        | Description      | Type                                                      | Default     |
| ----------- | ---------------- | --------------------------------------------------------- | ----------- |
| v-model     | 绑定值           | `string \| string[] \| null`                              | `—`         |
| items       | 选项数据源       | `SelectionItem[]` (可以是扁平或嵌套的 `CascaderOption[]`) | `[]`        |
| mode        | 选择器模式       | `enum` - `'box' \| 'dropdown' \| 'cascader'`              | `'box'`     |
| multiple    | 是否支持多选     | `boolean` (仅在 `'box'` 或 `'dropdown'` 模式下生效)       | `false`     |
| disabled    | 是否禁用         | `boolean`                                                 | `false`     |
| size        | 尺寸             | `enum` - `'default' \| 'large' \| 'small'`                | `'default'` |
| shape       | 形状             | `enum` - `'round' \| 'square'`                            | `'round'`   |
| placeholder | 占位文本         | `string`                                                  | `'请选择'`  |
| clearable   | 是否显示清除按钮 | `boolean` (仅在 `'dropdown'` 或 `'cascader'` 模式下有效)  | `false`     |

## Events

| Name              | Description                | Type                                          |
| ----------------- | -------------------------- | --------------------------------------------- |
| update:modelValue | `v-model` 更新时触发的事件 | `(value: string \| string[] \| null) => void` |
| change            | 选中值改变时触发           | `(value: string \| string[] \| null) => void` |

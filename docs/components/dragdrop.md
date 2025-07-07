---
title: DragDrop
description: DragDrop 组件文档

next:
  link: /components/form
  text: Form 表单

prev:
  link: /components/dialog
  text: Dialog 对话框
---

# DragDrop 拖拽

用于在不同列表或区域之间进行拖拽操作，实现元素的移动和重新排序。

## 基础用法

通过 `:items` 属性传入所有可用的项目，并通过 `@change` 事件监听源列表和已放置列表的变化。

::: preview
demo-preview=../demo/dragdrop/Basic.vue
:::

## 禁用统计

通过设置 `show-count` 属性为 `false`，可以隐藏组件下方的可用项和已放置项的数量统计。

::: preview
demo-preview=../demo/dragdrop/NoCount.vue
:::

## 自定义唯一键

当你的数据项的唯一标识符不是 `id`，或者嵌套在深层对象中时，可以使用 `onlykey` 属性指定其路径。例如，当唯一键为 `item.data.uuid` 时，设置 `onlykey` 为 `'data.uuid'`。

::: preview
demo-preview=../demo/dragdrop/CustomKey.vue
:::


## Props

| Name       | Description                                            | Type             | Default |
| ---------- | ------------------------------------------------------ | ---------------- | ------- |
| items      | 组件的总项目数据源数组                                 | `DragDropItem[]` | `[]`    |
| show-count | 是否显示可用项和已放置项的数量统计                     | `boolean`        | `true`  |
| onlykey    | 用于在项目中查找唯一标识符的路径（例如 `'data.uuid'`） | `string`         | `'.id'` |

## Events

| Name   | Description                                                      | Type                                                                    |
| ------ | ---------------------------------------------------------------- | ----------------------------------------------------------------------- |
| change | 当项目被放置或移除时，触发此事件，返回更新后的源列表和已放置列表 | `(payload: { source: DragDropItem[]; placed: DragDropItem[] }) => void` |

---
title: List
description: List 组件文档

next:
  link: /components/loading
  text: Loading 加载

prev:
  link: /components/button
  text: Button 按钮
---

# List 列表

高度集成的列表组件，用于数据的展示、筛选、操作和分页。

## 基础用法

一个基础的列表，包含列定义、数据和分页。`mode` 默认为 `full`，这里我们设置为 `simple` 来展示一个最简洁的列表界面，并使用内置的前端分页。组件采用响应式设计，在不同屏幕宽度下会自动调整布局。

::: preview
demo-preview=../demo/list/Basic.vue
:::

## 主题与朴素风格

通过设置 `theme` 属性可以切换列表的视觉主题。设置 `plain` 属性为 `true`，可以覆盖当前主题的鲜艳颜色，使列表呈现一个更加简洁、朴素的风格。

- `ocean-blue` (海洋之蓝)
- `sunset-glow` (落日余晖)
- `forest-green` (森林之绿)
- `cosmic-purple` (宇宙之紫)

::: preview
demo-preview=../demo/list/Themes.vue
:::

## 行选择

通过设置 `selectable` 属性为 `true` 来启用行选择功能。需要同时指定 `row-key` 来作为每行数据的唯一标识。
通过监听 `selection-change` 事件可以获取当前选中的行的 `key` 数组。

::: preview
demo-preview=../demo/list/Selection.vue
:::

## 行内操作

通过配置 `pageData.actions` 可以在每行的末尾添加操作按钮。每个 action 可以自定义 `label`, `type`, `icon` 和要触发的 `emit` 事件名。`hidden` 函数可以根据行数据动态控制按钮的显示和隐藏。

::: preview
demo-preview=../demo/list/Actions.vue
:::

## 完整功能

`mode="full"` 时，列表会展示顶部的筛选区域和导航栏。你可以通过 `mynavs`, `selectBt`, `naVBt`, `navIc` 属性来定义筛选条件和各类操作按钮。
此示例也演示了更真实的场景：**远程分页**。通过监听 `update:currentPage` 事件来获取新的页码，并重新请求数据。所有筛选、导航事件都会携带参数，方便与后端 API 交互。

::: preview
demo-preview=../demo/list/Full.vue
:::

## Props

| Name              | Description                                                                                            | Type                                                                 | Default                     |
| ----------------- | ------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------- | --------------------------- |
| data              | 列表数据源，用于 `paginationType` 为 `internal` 的情况                                                 | `Record<string, any>[]`                                              | `[]`                        |
| pageData          | 分页数据，包含当前页数据和行操作。`actions` 字段在两种分页模式下都生效                                 | `PageData`                                                           | `{ data: [], actions: [] }` |
| paginationType    | 分页类型，'internal' 为前端分页，'external' 为后端分页                                                 | `'internal' \| 'external'`                                           | `'external'`                |
| pageSize          | 每页显示条目个数                                                                                       | `number`                                                             | `10`                        |
| currentPage       | 当前页数，支持 `v-model`                                                                               | `number`                                                             | `1`                         |
| total             | 总条目数，`paginationType` 为 `external` 时必传                                                        | `number`                                                             | `0`                         |
| mode              | 列表模式，控制 UI 元素的显示。`full` 显示全部，`simple` 只显示核心表格和分页                           | `'full' \| 'simple'`                                                 | `'full'`                    |
| theme             | 组件的视觉主题                                                                                         | `'ocean-blue' \| 'sunset-glow' \| 'forest-green' \| 'cosmic-purple'` | `'ocean-blue'`              |
| plain             | 是否启用朴素风格，会覆盖主题颜色                                                                       | `boolean`                                                            | `false`                     |
| mynavs            | 顶部筛选区域的控件配置                                                                                 | `Nav[]`                                                              | `[]`                        |
| selectBt          | 顶部筛选区域的操作按钮配置                                                                             | `ButtonConfig[]`                                                     | `[]`                        |
| naVBt             | 导航区域的按钮配置                                                                                     | `ButtonConfig[]`                                                     | `[]`                        |
| navIc             | 导航区域的图标配置                                                                                     | `NavIcon[]`                                                          | `[]`                        |
| column            | 列表的列配置。可为列添加 `flex` 属性（数字），用于在空间充足时按比例分配列宽，提供更智能的响应式布局。 | `Column[]`                                                           | `[]`                        |
| selectable        | 是否可选择                                                                                             | `boolean`                                                            | `false`                     |
| rowKey            | 行数据的 Key，`selectable` 为 true 时必填                                                              | `string`                                                             | `'id'`                      |
| showFilters       | 是否显示筛选区域 (`mode` 为 `full` 时生效)                                                             | `boolean`                                                            | `true`                      |
| showNavButtons    | 是否显示导航按钮区域 (`mode` 不为 `simple` 时生效)                                                     | `boolean`                                                            | `true`                      |
| showNavIcons      | 是否显示导航图标区域 (`mode` 不为 `simple` 时生效)                                                     | `boolean`                                                            | `true`                      |
| showActionsColumn | 是否显示操作列                                                                                         | `boolean`                                                            | `true`                      |
| showElevator      | 是否显示分页器快速跳转                                                                                 | `boolean`                                                            | `false`                     |

## Events

| Name               | Description                                                                                                                                                                                                                                                                        | Parameters       |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| update:currentPage | `v-model:currentPage` 的绑定事件，页码改变时触发                                                                                                                                                                                                                                   | `(page: number)` |
| selection-change   | 当选择项发生变化时会触发该事件                                                                                                                                                                                                                                                     | `(keys: any[])`  |
| (custom)           | 由 `selectBt`, `naVBt`, `navIc`, `pageData.actions` 中 `emit` 字段定义的自定义事件。例如 `emit: 'edit'`，则通过 `@edit` 监听。不同按钮触发时携带的参数如下：<br/>- **筛选/导航按钮**: `(selectedValues: Record<string, any>)`<br/>- **行内操作按钮**: `(row: Record<string, any>)` | `(payload: any)` |

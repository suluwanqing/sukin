---
title: SuSchedule
description: SuScheduleTable组件文档

next:
  link: /components/next-component-link
  text: 下一个组件

prev:
  link: /components/button
  text: Button 按钮
---

# SuSchedule

一个功能强大、支持拖拽、Canvas 预览和数据导出的动态表格组件。

## 基础用法

`SuSchedule` 的核心功能是拖拽放置。从左侧的“可拖拽项”区域，将项目拖动到右侧的网格中即可完成课程安排。

- **预览**: 点击“预览”按钮，可以生成当前课程表布局的 Canvas 图片，并在模态框中展示。
- **导出图片**: 点击“导出图片”按钮，可以直接将生成的 Canvas 图片下载为 PNG 文件。
- **保存数据**: 点击“保存数据”按钮，将触发 `export-data` 事件，您可以捕获到包含所有布局信息的 JSON 对象。

::: preview
demo-preview=../demo/schedule/Basic.vue
:::

## 布局方向 (Orientation)

使用 `orientation` 属性可以控制课程表的整体布局方向，支持 `horizontal` (水平) 和 `vertical` (垂直) 两种模式。

::: preview
demo-preview=../demo/schedule/Orientation.vue
:::

## 组件尺寸 (Size)

使用 `size` 属性可以调整组件的整体尺寸，包括间距、字体大小等。支持 `'small'`, `'medium'`, `'large'` 三种尺寸。

::: preview
demo-preview=../demo/schedule/Size.vue
:::

## 限制拖拽数量

通过在 `draggableItems` 的每个数据项中设置一个数量限制字段，可以限制该项可被拖拽到表格中的次数。

默认情况下，组件会读取数据项中的 `quantity` 字段。当拖拽次数达到上限后，该项将被禁用。您也可以通过 `quantityKey` 属性自定义用于计数的字段名。

**示例**： `{ name: 'pe', label: '体育', quantity: 1 }` 表示“体育”课程只能被拖拽一次。若不提供 `quantity` 字段，则表示无数量限制。

::: preview
demo-preview=../demo/schedule/Count.vue
:::

## SuSchedule API

### Props

| Name             | Description                                              | Type                             | Default        |
| ---------------- | -------------------------------------------------------- | -------------------------------- | -------------- |
| `draggableItems` | 左侧可拖拽的课程项列表                                   | `DraggableItem[]`                | `[]`           |
| `metaInfo`       | 表格的元信息 (通常是行头，如时间段)                      | `MetaInfo[]`                     | `[]`           |
| `labels`         | 表格的标签 (通常是列头，如星期)                          | `Label[]`                        | `[]`           |
| `gridStructure`  | 定义网格结构，数组每个元素代表一列（或一行）的单元格数量 | `number[]`                       | `[]`           |
| `orientation`    | 组件的布局方向                                           | `'horizontal' \| 'vertical'`     | `'horizontal'` |
| `size`           | 组件的整体尺寸                                           | `'small' \| 'medium' \| 'large'` | `'medium'`     |
| `quantityKey`    | `draggableItems` 数据项中用于限制数量的键名              | `string`                         | `'quantity'`   |

### Events

| Name          | Description                                                                       | Type                            |
| ------------- | --------------------------------------------------------------------------------- | ------------------------------- |
| `export-data` | 当用户点击“保存数据”按钮时触发。回调参数 `payload` 包含了当前表格的所有状态数据。 | `(payload: ExportData) => void` |

### Slots

| Name | Description        |
| ---- | ------------------ |
| —    | 该组件暂不提供插槽 |

### Expose

| Name               | Description                               | Type                    |
| ------------------ | ----------------------------------------- | ----------------------- |
| `runPreview`       | 手动触发预览模态框的函数                  | `() => Promise<void>`   |
| `runExportImage`   | 手动触发出图片功能的函数                  | `() => Promise<void>`   |
| `gridCellContents` | 包含当前所有单元格内容的响应式 `ref` 对象 | `Ref<GridCellContents>` |

---

## 核心类型定义 (Types)

为了方便您在使用时进行类型标注，以下是组件 `Props` 和 `Events` 中用到的主要类型接口。

### DraggableItem

```typescript
// 可拖拽项
interface DraggableItem {
  name: string // 唯一标识符
  label: string // 显示的文本
  [key: string]: any // 允许其他自定义属性, 如 quantity: 1
}
```

```typescript
// 'export-data' 事件的载荷类型
interface ExportData {
gridContents: GridCellContents;
labels: Label[];
metaInfo: MetaInfo[];
gridStructure: number[];
layout: {
orientation: 'horizontal' | 'vertical';
};
}

```

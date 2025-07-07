---
title: Icard
description: Icard 组件文档

next:
  link: /components/loading
  text: Loading 加载

prev:
  link: /components/dropdown
  text: Dropdown 下拉菜单
---

# Icard 卡片组

`Icard` 组件是一个多功能的卡片展示组件，支持多种布局模式（堆叠、轮播、窥视）和交互方式。

## 基础用法

`Icard` 组件通过 `mode` 属性控制展示形式，支持 `stack` (堆叠), `carousel` (轮播), `peek` (窥视) 三种模式。默认模式为 `stack`。

::: preview
demo-preview=../demo/icard/Basic.vue
:::

## 自定义内容

`Icard` 组件通过默认插槽 (`<slot>`) 提供了极大的灵活性，您可以填充任意 HTML 结构或 Vue 组件作为卡片的内容。

默认插槽会提供 `item`, `index` 和 `isActive` 作用域插槽数据，您可以根据这些数据来动态渲染内容。

::: preview
demo-preview=../demo/icard/CustomContent.vue
:::

## 模式：Stack

在 `stack` 模式下，卡片以扇形展开。点击任意卡片会使其从扇形中“原地抽出”，并高亮显示。

- `stack-offset`: 设置卡片展开时的水平偏移量。
- `stack-rotate`: 设置卡片展开时的旋转角度。
- `stack-extracted-offset`: 设置被选中卡片向上抽出的垂直偏移量。

::: preview
demo-preview=../demo/icard/StackMode.vue
:::

## 模式：Carousel

在 `carousel` 模式下，卡片以水平轮播的形式展示。支持自动播放、鼠标悬停暂停和点击切换。当非循环模式到达最后一项时，可选择显示“回到第一项”按钮。

- `autoplay`: 是否自动播放。
- `autoplay-interval`: 自动播放间隔时间（毫秒）。
- `pause-on-hover`: 鼠标悬停时是否暂停自动播放。
- `loop`: 是否循环播放。
- `show-carousel-go-to-first`: 非循环模式下，当到达最后一项时是否显示“回到第一项”按钮。

::: preview
demo-preview=../demo/icard/CarouselMode.vue
:::

## 模式：Peek 

在 `peek` 模式下，中心卡片完全显示，两侧卡片部分“窥视”出来。支持自动播放、鼠标悬停暂停和点击切换。

- `peek-offset`: 设置两侧窥视卡片的水平偏移量（百分比）。
- `peek-scale`: 设置两侧窥视卡片的缩放比例。
- `show-indicators`: 是否显示底部导航圆点。

::: preview
demo-preview=../demo/icard/PeekMode.vue
:::

## 尺寸

通过 `size` 属性可以快速设置卡片的预定义尺寸，支持 `small | medium | large`。
也可以通过 `card-width` 和 `card-height` 属性自定义卡片尺寸，优先级高于 `size`。

::: preview
demo-preview=../demo/icard/Sizes.vue
:::



## Props

| Name                        | Description                                           | Type                                           | Default                              |
| --------------------------- | ----------------------------------------------------- | ---------------------------------------------- | ------------------------------------ |
| `items`                     | 包含卡片数据的数组                                    | `CardStackItem[]` (即 `Record<string, any>[]`) | `[]`                                 |
| `mode`                      | 组件显示模式                                          | `enum` - `'stack'\| 'carousel'\| 'peek'`       | `'stack'`                            |
| `active-index`              | 当前激活卡片的索引 (支持 `v-model`)                   | `number`                                       | `0`                                  |
| `size`                      | 预定义卡片尺寸                                        | `enum` - `'small'\| 'medium'\| 'large'`        | `'medium'`                           |
| `card-width`                | 自定义卡片宽度（像素或 CSS 单位）                     | `number \| string`                             | `undefined`                          |
| `card-height`               | 自定义卡片高度（像素或 CSS 单位）                     | `number \| string`                             | `undefined`                          |
| `stack-offset`              | [stack] 卡片扇形展开时的水平偏移量                    | `number`                                       | `80`                                 |
| `stack-rotate`              | [stack] 卡片扇形展开时的旋转角度                      | `number`                                       | `6`                                  |
| `stack-extracted-offset`    | [stack] 被选中卡片向上抽出的垂直偏移量                | `number`                                       | `60`                                 |
| `peek-offset`               | [peek] 两侧窥视卡片的水平偏移量（百分比）             | `number`                                       | `60`                                 |
| `peek-scale`                | [peek] 两侧窥视卡片的缩放比例                         | `number`                                       | `0.85`                               |
| `loop`                      | 是否循环播放 (carousel/peek)                          | `boolean`                                      | `true`                               |
| `autoplay`                  | 是否自动播放 (carousel/peek)                          | `boolean`                                      | `false`                              |
| `autoplay-interval`         | 自动播放间隔时间（毫秒）                              | `number`                                       | `3000`                               |
| `pause-on-hover`            | 鼠标悬停时是否暂停自动播放                            | `boolean`                                      | `true`                               |
| `show-indicators`           | [peek] 是否显示底部导航圆点                           | `boolean`                                      | `false` (默认在 Peek 中启用时才显示) |
| `show-carousel-go-to-first` | [carousel, 非循环] 是否在最后一项显示“回到第一项”按钮 | `boolean`                                      | `true`                               |

## Events

| Name                 | Description                                      | Type                                                              |
| -------------------- | ------------------------------------------------ | ----------------------------------------------------------------- |
| `update:activeIndex` | `v-model` 更新当前激活卡片索引时触发             | `(index: number) => void`                                         |
| `click`              | 点击卡片时触发，返回点击事件、卡片数据和索引     | `(event: MouseEvent, item: CardStackItem, index: number) => void` |
| `hover`              | 鼠标进入卡片时触发，返回鼠标事件、卡片数据和索引 | `(event: MouseEvent, item: CardStackItem, index: number) => void` |

## Slots

| Name    | Description                                                               |
| ------- | ------------------------------------------------------------------------- |
| default | 默认插槽，用于自定义卡片内容，提供 `item`, `index`, `isActive` 作用域数据 |

## Expose

| Name        | Description      | Type                      |
| ----------- | ---------------- | ------------------------- |
| `setActive` | 设置激活卡片索引 | `(index: number) => void` |
| `next`      | 切换到下一张卡片 | `() => void`              |
| `prev`      | 切换到上一张卡片 | `(() => void)`            |

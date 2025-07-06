---
title: SuDataform

description: SuDataform组件文档

next:
  link: /components/next-component
  text: 下一个组件

prev:
  link: /components/dragdrop
  text: DragDrop 拖拽
---

# SuDataform 表单面板

一个功能强大的、支持多表单切换、分步验证和灵活布局的复合表单组件。

## 基础用法

`SuDataform
` 的核心是 `sections` 属性，它定义了面板中包含的所有表单。每个表单可以是简单的单步提交表单，也可以是复杂的多步流程表单。

- 通过顶部的导航按钮可以在不同的表单之间切换。
- 组件内置了按需验证（当输入框失去焦点时触发）和提交时验证。
- 顶部的错误提示栏会自动显示验证错误，并在 3 秒后自动消失。

::: preview
demo-preview=../demo/dataform/Basic.vue
:::

## 布局方向与尺寸

通过 `direction` 属性可以控制组件是垂直布局 (`vertical`) 还是水平布局 (`horizontal`)。

通过 `size` 属性可以调整组件的整体大小，支持 `'small'`, `'medium'`, `'large'`。

::: preview
demo-preview=../demo/dataform/Direction.vue
:::

## 自定义背景

使用 `background-image` 属性可以为组件设置一个背景图片，以增强视觉效果。

::: preview
demo-preview=../demo/dataform/Background.vue
:::

## SuDataform API

### Props

| Name              | Description                  | Type                             | Default      |
| ----------------- | ---------------------------- | -------------------------------- | ------------ |
| `sections`        | 定义面板中所有表单的配置数组 | `FormSection[]`                  | `[]`         |
| `initialForm`     | 初始显示的表单的 `title`     | `string`                         | 第一个表单   |
| `direction`       | 组件的布局方向               | `'vertical' \| 'horizontal'`     | `'vertical'` |
| `size`            | 组件的整体尺寸               | `'small' \| 'medium' \| 'large'` | `'medium'`   |
| `backgroundImage` | 组件的背景图片 URL           | `string`                         | `''`         |

### Events

| Name     | Description                                  | Type                                                    |
| -------- | -------------------------------------------- | ------------------------------------------------------- |
| `submit` | 当表单（或分步表单的最后一步）成功提交时触发 | `(formType: string, data: Record<string, any>) => void` |
| `close`  | 当用户点击“关闭”按钮时触发                   | `() => void`                                            |

### Expose

| Name        | Description                          | Type         |
| ----------- | ------------------------------------ | ------------ |
| `resetForm` | 重置当前表单的所有字段和状态到初始值 | `() => void` |

---

## 核心类型定义 (Types)

为了方便您构建 `sections` 数据，以下是核心的类型接口定义。

### FormField

```typescript
interface FormField {
  id: string // 字段唯一标识
  label: string // 字段标签
  type: 'text' | 'password' | 'email' | 'number' // 输入框类型
  placeholder?: string
  required?: boolean // 是否为必填项，默认为 false
  rules?: ValidationRule[] // 其他验证规则，如 'email', { name: 'minLength', length: 6 }
}
```

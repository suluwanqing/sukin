---
search: false
next:
  link: /components/button
  text: Button 按钮
---

# 最新 Vue3 + TS 高仿 ElementPlus 打造自己的组件库

## 安装

```bash
npm i sukin --save
```

## 开始使用

**全局使用**

```js
// 引入所有组件
import Sukin from 'sukin'
// 引入样式
import 'sukin/dist/main.css'

import App from './App.vue'
// 全局使用
createApp(App).use(Sukin).mount('#app')
```

```vue
<template>
  <su-button>我是 Button</su-button>
</template>
```

**单个导入**

Sukin 提供了基于 ES Module 的开箱即用的 Tree Shaking 功能。

```vue
<template>
  <su-button>我是 Button</su-button>
</template>
<script>
import { SuButton } from 'sukin'
export default {
  components: { SuButton }
}
</script>
```


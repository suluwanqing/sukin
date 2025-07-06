import type { App } from 'vue'
import DefaultTheme from 'vitepress/theme'
import { ElementPlusContainer } from '@vitepress-demo-preview/component'
import '@vitepress-demo-preview/component/dist/style.css'
import Sukin from 'sukin'
import "sukin/theme/main.css"
import SuColor from "../../demo/color/Layout.vue"
import SuColorItem from "../../demo/color/Item.vue"


export default {
    ...DefaultTheme,
    enhanceApp({ app }: { app: App }) {
        app.component('demo-preview', ElementPlusContainer)
        app.use(Sukin)
        app.component('SuColor', SuColor)
        app.component('SuColorItem', SuColorItem)
    }
}
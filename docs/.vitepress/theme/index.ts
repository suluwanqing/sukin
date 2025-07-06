import type { App } from 'vue'
import DefaultTheme from 'vitepress/theme'
import { ElementPlusContainer} from '@vitepress-demo-preview/component'
import '@vitepress-demo-preview/component/dist/style.css'
import Sukin from 'sukin'
import "sukin/theme/main.css"


export default {
    ...DefaultTheme,
    enhanceApp({ app }: { app: App }) {
        app.component('demo-preview', ElementPlusContainer)
        app.use(Sukin)
    }
}
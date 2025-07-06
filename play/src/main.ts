import { createApp } from 'vue'
import App from './App.vue'
import sukin from "sukin"
const app = createApp(App)
import "sukin/theme/main.css"
app.use(sukin)
app.mount('#app')

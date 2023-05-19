import { createApp } from 'vue'
import './style/index.scss'
import App from './App.vue'
import router from '@/routers/index'
import pinia from '@/stort'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import 'virtual:uno.css'
const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(router)
app.use(pinia)
app.mount('#app')

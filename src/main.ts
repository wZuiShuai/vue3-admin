import { createApp } from 'vue'
import App from './App.vue'
import router from '@/routers/index'
import pinia from '@/stort'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import './styles/index.scss'
import 'virtual:uno.css'
const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(router)
app.use(pinia)
app.mount('#app')

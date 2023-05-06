import { createApp } from 'vue'
import './style/index.scss'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from '@/routers/index'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import 'virtual:uno.css'
const pinia = createPinia()
const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(pinia)
app.use(router)
app.mount('#app')

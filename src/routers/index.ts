import { createRouter, createWebHashHistory } from 'vue-router'
import { errorRouter, staticRouter } from './modules/staticRouter'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [...staticRouter, ...errorRouter],
    strict: false,
    scrollBehavior: () => ({ left: 0, top: 0 }),
})

export default router

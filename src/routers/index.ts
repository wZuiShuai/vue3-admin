import { createRouter, createWebHashHistory } from 'vue-router'
import { errorRouter, staticRouter } from './modules/staticRouter'

import { main } from '@/stort/modules/main'


const router = createRouter({
    history: createWebHashHistory(),
    routes: [...staticRouter, ...errorRouter],
    strict: false,
    scrollBehavior: () => ({ left: 0, top: 0 }),
})

// 路由拦截
router.beforeEach(async (to, from, next) => {
    const mainStore = main()

    // 输入 url 地址进行跳转,有 token 就当前页面,没 token 跳转至登录页面
    if (to.path.toLocaleLowerCase() === import.meta.env.LOGIN_URL && mainStore.$state.token) {
        next()
    } else {
        
    }
})

export default router

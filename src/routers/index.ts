import { createRouter, createWebHashHistory } from 'vue-router'
import { errorRouter, staticRouter } from './modules/staticRouter'

import { main } from '@/stort/modules/main'
import { auth } from '@/stort/modules/auth'

import { initDynamicRouter } from './modules/dynamicRouter'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [...staticRouter, ...errorRouter],
    strict: false,
    scrollBehavior: () => ({ left: 0, top: 0 }),
})

// 路由拦截
router.beforeEach(async (to, from, next) => {
    const mainStore = main()
    const authStore = auth()

    // 输入 url 地址进行跳转登录页面有 token 不进行跳转,重置路由跳转至登录页面
    if (to.path.toLocaleLowerCase() === import.meta.env.VITE_LOGIN_URL) {
        if (mainStore.token && router.hasRoute(from.fullPath)) {
            return next(from.fullPath)
        }
        return next()
    }

    // 判断是否有 token 没有重定向到 login 页面
    if (!mainStore.token) return next({ path: import.meta.env.VITE_LOGIN_URL, replace: true })

    // 没有菜单列表，就重新请求菜单列表并添加动态路由
    if (!authStore.authMenuList.length) {
        await initDynamicRouter()
        return next({ ...to, replace: true })
    }

    next()
})

export default router
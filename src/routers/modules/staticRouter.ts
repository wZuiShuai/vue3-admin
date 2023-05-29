import type { RouteRecordRaw } from 'vue-router'

/**
 * staticRouter(静态路由)
 */
export const staticRouter: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: import.meta.env.VITE_LOGIN_URL,
    },
    {
        path: import.meta.env.VITE_LOGIN_URL,
        name: 'login',
        component: () => import('@/views/login/index.vue'),
        meta: {
            title: '登录',
        },
    },
    {
        path: '/layout',
        name: 'layout',
        component: () => import('@/layout/index.vue'),
        redirect: '/home/index',
        children: [],
    },
]

/**
 * errorRouter(错误页面路由)
 */
export const errorRouter = [
    {
        path: '/:pathMatch(.*)*',
        component: import('@/views/errorPages/notFound.vue'),
    },
]

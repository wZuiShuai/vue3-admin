import type { RouteRecordRaw } from 'vue-router'

/**
 * staticRouter(静态路由)
 */
export const staticRouter: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: { name: 'login' },
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/index.vue'),
        meta: {
            title: '登录',
        },
    },
    // {
    //     path: '/',
    //     name: 'layout',
    //     component: () => import('@/layouts/index.vue'),
    //     redirect: { name: 'home' },
    //     children: [
    //         {
    //             path: 'home',
    //             name: 'home',
    //             component: () => import('@/views/home/index.vue'),
    //             meta:{
    //                 icon:'HomeFilled',
    //                 title:'首页',
    //             }
    //         },
    //         {
    //             path: 'ho',
    //             name: 'home222',
    //             component: () => import('@/views/home/index.vue'),
    //             meta:{
    //                 icon:'EditPen',
    //                 title:'首页123',
    //             },
    //             redirect: { name: 'home3333' },
    //             children: [
    //                 {
    //                     path: 'h',
    //                     name: 'home3333',
    //                     component: () => import('@/views/home/index.vue'),
    //                     meta:{
    //                         icon:'HomeFilled',
    //                         title:'首页22',
    //                     }
    //                 },
    //                 {
    //                     path: 'h44',
    //                     name: 'home44444',
    //                     component: () => import('@/views/home/index.vue'),
    //                     meta:{
    //                         icon:'HomeFilled',
    //                         title:'首页2244',
    //                     }
    //                 },
    //             ]
    //         }
    //     ],
    // },
]

/**
 * errorRouter(错误页面路由)
 */
export const errorRouter = [
    // {
    //     path: '/:pathMatch(.*)*',
    //     redirect: { name: 'NotFound' },
    // },
]

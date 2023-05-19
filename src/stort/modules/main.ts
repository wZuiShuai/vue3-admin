import { defineStore } from 'pinia'

import { loginApi } from '@/api/modules/login'
import type { Login } from '@/api/modules/login'

import { router } from '@/stort/modules/router'
const routerStore = router()

export const main = defineStore('main', {
    // state: 返回对象的函数
    state: () => ({
        token: '',
        userInfo: {},
        // 国际化
        i18n: 'zh_CN',
        // 侧边栏是否展开
        isExpand: true,
    }),
    getters: {},
    actions: {
        async LoginIn(loginInfo: Login.ReqLoginForm) {
            const res = await loginApi(loginInfo)
            this.$state.token = res.data.token
            routerStore.SetAsyncRouter()
        },
    },
    persist: [
        {
            key: 'msg',
            storage: localStorage,
            paths: ['token', 'userInfo', 'i18n'],
        },
        {
            key: 'isExpand',
            storage: sessionStorage,
            paths: ['isExpand'],
        },
    ],
})
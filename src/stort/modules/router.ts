import { defineStore } from 'pinia'
import { menuApi } from '@/api/modules/system'

export const router = defineStore('router', {
    state: () => ({
    }),
    actions: {
        async SetAsyncRouter() {
            const res = await menuApi()
            const asyncRouter = res.data.menus
            asyncRouter && asyncRouter.push({
                
            })
        },
    },
    // persist: [
    //     {
    //         key: 'msg',
    //         storage: localStorage,
    //         paths: ['token', 'userInfo', 'i18n'],
    //     },
    //     {
    //         key: 'isExpand',
    //         storage: sessionStorage,
    //         paths: ['isExpand'],
    //     },
    // ],
})
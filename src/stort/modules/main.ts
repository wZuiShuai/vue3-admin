import { defineStore } from 'pinia'

export const main = defineStore('main', {
    // state: 返回对象的函数
    state: () => ({
        token: '' as string,
        userInfo: {},
        // 国际化
        i18n: 'zh_CN' as string,
        // 侧边栏是否展开
        isExpand: true as boolean,
        // 主题
        subject: false as boolean,
    }),
    getters: {},
    actions: {
    
    },
    persist: [
        {
            key: 'msg',
            storage: localStorage,
            paths: ['token', 'userInfo', 'i18n'],
        },
        {
            key: 'system',
            storage: sessionStorage,
            paths: ['isExpand'],
        },
    ],
})
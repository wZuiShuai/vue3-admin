import { createPinia, defineStore } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)


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
    actions: {},
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

export default pinia

import { defineStore } from 'pinia'
import { getMenuWidth } from '@/utils/tabs'

const isSmallWidth = document.body.clientWidth < 1000
export const main = defineStore('main', {
    // state: 返回对象的函数
    state: () => ({
        token: '' as string,
        userInfo: {},
        // 国际化
        i18n: 'zh_CN' as string,
        // 侧边栏是否展开
        isExpand: isSmallWidth ? false : true as boolean,
        isSmallWidth: isSmallWidth as boolean,
        // 主题
        subject: false as boolean,
    }),
    getters: {
        menuWidth: state => getMenuWidth(state.isExpand, state.isSmallWidth),
    },
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
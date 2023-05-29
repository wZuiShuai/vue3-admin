import { defineStore } from 'pinia'
import { getKeepAliveList } from '@/utils/tabs'

export interface TabsMenuProps {
    title: string
    path: string
    name: string
    keepAlive: string
}
  
/* TabsState */
export interface TabsState {
    tabsMenuList: TabsMenuProps[]
}
  

export const tabs = defineStore('tabs', {
    // state: 返回对象的函数
    state: (): TabsState => ({
        tabsMenuList: [],
    }),
    getters: {
        KeepAliveList: state => getKeepAliveList(state.tabsMenuList) as string,
    },
    actions: {},
    persist: [
        {
            key: 'tabsMenuValue',
            storage: sessionStorage,
            paths: ['tabsMenuList'],
        },
    ],
})
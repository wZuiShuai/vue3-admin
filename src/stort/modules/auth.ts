import { defineStore } from 'pinia'

import { menuApi } from '@/api/modules/system'
import { getAllBreadcrumbList, getFlatMenuList, getShowMenuList } from '@/utils/menu'


export const auth = defineStore('auth', {
    // state: 返回对象的函数
    state: () => ({
        // 菜单权限列表
        authMenuList: [],
        // 当前页面的 router name，用来做按钮权限筛选
        routeName: '',
    }),
    getters: {
        // 菜单权限列表 ==> 扁平化之后的一维数组菜单，主要用来添加动态路由
        flatMenuListGet: state => getFlatMenuList(state.authMenuList),
        // 菜单权限列表 ==> 左侧菜单栏渲染，需要剔除 isHide == true
        showMenuListGet: state => getShowMenuList(state.authMenuList),
        // 递归处理后的所有面包屑导航列表
        breadcrumbListGet: state => getAllBreadcrumbList(state.authMenuList),
    },
    actions: {
        async getAuthMenuList() {
            const res = await menuApi()
            this.authMenuList = res.data.menus as any
        },
    },
})
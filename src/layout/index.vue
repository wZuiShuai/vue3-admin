<template>
    <el-container class="layoutcontainer full">
        <el-aside
            style="border-right: 1px solid #e4e7ed;" 
            :style="{ width: `${mainStore.menuWidth}px` }"
            class="z-999 hfull bg-white duration-100"
            :class="{ fixed: mainStore.isSmallWidth }"
        >
            <div class="h-full flex flex-col">
                <div class="h60px flex-center">
                    <img class="w38px object-contain" src="@/assets/logo.svg" alt="logo">
                    <span v-show="mainStore.isExpand" class="ml1.5 whitespace-nowrap text-5.375 font-bold">
                        {{ title }}
                    </span>
                </div>

                <el-scrollbar>
                    <el-menu
                        :default-active="activeMenu" class="overflow-hidden !border-r-none"
                        :collapse="!mainStore.isExpand" :router="false" unique-opened :collapse-transition="false"
                    >
                        <SubMenu :menu-list="menuList" />
                    </el-menu>
                </el-scrollbar>
            </div>
        </el-aside>
        <el-container>
            <el-header style="border-bottom: 1px solid #e4e7ed;">
                <ToolBar />
            </el-header>
            <Tabs />
            <el-main class="relative">
                <div v-if="mainStore.isSmallWidth && mainStore.isExpand" class="absolute bottom-0 left-0 right-0 top-0 z-998 bg-black op-30" @click="changeShaadow" />
                <RouterView v-slot="props">
                    <Transition mode="out-in" name="fade-transform">
                        <!-- 这里缓存二级路由 -->
                        <KeepAlive :include="tabsStore.KeepAliveList">
                            <component :is="props.Component" :key="props.route.fullPath" />
                        </KeepAlive>
                    </Transition>
                </RouterView>
            </el-main>
        </el-container>
    </el-container>
</template>

<script setup lang="ts" name="Layout">
import SubMenu from './components/Menu.vue'
import ToolBar from './components/ToolBar.vue'
import Tabs from './components/Tabs.vue'

import { computed } from '@vue/reactivity'
import { auth } from '@/stort/modules/auth'
const authStore = auth()

import { main } from '@/stort/modules/main'
const mainStore = main()

import { tabs } from '@/stort/modules/tabs'
const tabsStore = tabs()

import { useRoute } from 'vue-router'
const route = useRoute()

const title: string = import.meta.env.VITE_TITLE
const menuList = computed(() => authStore.showMenuListGet)
const activeMenu = computed(() => (route.meta.activeMenu ? route.meta.activeMenu : route.path) as string)

const changeShaadow = () => {
    mainStore.isExpand = false
}

// 判断浏览器宽度
let func: ReturnType<typeof setTimeout> | null 
window.onresize = () => {
    if (func) return
    func = setTimeout(() => {
        const clientWidth = document.body.clientWidth
        if (clientWidth < 1000) {
            mainStore.isSmallWidth = true
        } else {
            mainStore.isSmallWidth = false
        }
        func = null
    }, 200)
}
</script>

<style lang="scss">
.layoutcontainer {
    .el-scrollbar {
        height: calc(100% - 60px);
    }

    .el-menu {
        height: 100%;
        background: transparent;
    }

    .el-menu--collapse {
        width: 54px;

        li {

            .el-tooltip__trigger,
            .el-sub-menu__title {
                padding: 0px 15px !important;
            }
        }

    }
}
</style>
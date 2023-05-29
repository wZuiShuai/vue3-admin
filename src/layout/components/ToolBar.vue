<!-- eslint-disable vue/require-component-is -->
<template>
    <div class="full flex-between">
        <div class="flex-center">
            <el-icon class="mr5 cursor-pointer" @click="changeIsExpand">
                <component :is="!mainStore.isExpand ? 'DArrowRight' : 'DArrowLeft'" />
            </el-icon>
            <el-breadcrumb separator="/">
                <transition-group name="breadcrumb">
                    <el-breadcrumb-item v-for="item in breadcrumbList" :key="item.path">
                        {{ item.meta.title }}
                    </el-breadcrumb-item>
                </transition-group>
            </el-breadcrumb>
        </div>
        <div class="flex-center">
            <i class="mr6 cursor-pointer" :class="[isFullscreen ? 'i-system-uicons-minimise' : 'i-system-uicons-capture']" @click="toggle" />
            <el-icon class="mr6 cursor-pointer" @click="subjectChange">
                <component :is="mainStore.subject ? 'Moon' : 'Sunny'" />
            </el-icon>

            <el-dropdown trigger="click">
                <el-avatar
                    :size="30"
                    :src="avatar"
                />
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>
                            个人信息
                        </el-dropdown-item>
                        <el-dropdown-item divided>
                            退出登录
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script setup lang="ts" name="ToolBar">
import avatar from '@/assets/views/avatar.jpg'

import mittBus from '@/utils/mittBus'
import { useFullscreen } from '@vueuse/core'
import { main } from '@/stort/modules/main'
import { useRoute } from 'vue-router'
import { auth } from '@/stort/modules/auth'
import { computed } from '@vue/reactivity'
const authStore = auth()
const mainStore = main()
const route = useRoute()

const breadcrumbList = computed(() => {
    return authStore.breadcrumbListGet[route.matched[route.matched.length - 1].path] ?? []
})

const changeIsExpand = () => {
    mainStore.isExpand = !mainStore.isExpand
}

// 全屏
const { toggle, isFullscreen } = useFullscreen()
// 主题
const subjectChange = () => {
    mittBus.emit('toggleDark')
}
</script>

<style lang="scss">

</style>
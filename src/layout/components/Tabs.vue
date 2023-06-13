<template>
    <div class="tabs relative">
        <el-tabs
            v-model="tabsMenuValue"
            type="card"
            :closable="tabsStore.tabsMenuList.length > 1"
            @tab-click="tabClick"
            @tab-remove="tabRemove"
            @contextmenu.prevent="openContextMenu"
        >
            <el-tab-pane
                v-for="item in tabsMenuList"
                :key="item.path"
                :label="item.title"
                :name="item.path"
            >
                <template #label>
                    <span :class="tabsMenuValue === item.path ? 'text-primary' : 'text-#333'">
                        <i class="mr8px inline-block h9px w9px rounded-full" :class="[tabsMenuValue === item.path ? 'bg-primary' : 'bg-#ddd']" />
                        {{ item.title }}
                    </span>
                </template>
            </el-tab-pane>
        </el-tabs>

        <!-- 自定义右键菜单栏 -->
        <ul
            v-show="contextMenuVisible"
            style="box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.2);"
            :style="{ left: `${contextMenuStyle.left}px`, top: `${contextMenuStyle.top}px` }"
            class="absolute z-9999 w100px list-none border border-#ccc border-solid bg-#fff py5px"
        >
            <li class="cursor-pointer px16px py7px text-14px text-#333 hover:bg-#f2f2f2">
                关闭所有
            </li>
            <li class="cursor-pointer px16px py7px text-14px text-#333 hover:bg-#f2f2f2">
                关闭左侧
            </li>
            <li class="cursor-pointer px16px py7px text-14px text-#333 hover:bg-#f2f2f2">
                关闭右侧
            </li>
            <li class="cursor-pointer px16px py7px text-14px text-#333 hover:bg-#f2f2f2">
                关闭其他
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts" name="Tabs">
import { computed, reactive, ref, watch } from 'vue'
import type { TabPaneName, TabsPaneContext } from 'element-plus'

import { main } from '@/stort/modules/main'
const mainStore = main()

import { tabs } from '@/stort/modules/tabs'
const tabsStore = tabs()

import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()

const tabsMenuValue = ref('')
const tabsMenuList = computed(() => tabsStore.tabsMenuList)

watch(() => route.fullPath, () => {
    tabsMenuValue.value = route.fullPath

    // 判断是否重复
    const isRepeat = tabsStore.tabsMenuList.some(e => e.path === route.fullPath)
    if (isRepeat) return

    const tabsParams = {
        title: route.meta.title as string,
        path: route.fullPath,
        name: route.name as string,
        keepAlive: route.meta.keepAlive as string,
    }
    tabsStore.tabsMenuList.push(tabsParams)
    
}, { immediate: true })

const tabClick = (tabItem: TabsPaneContext) => {
    const fullPath = tabItem.props.name as string
    router.push(fullPath)
}

const tabRemove = (fullPath: TabPaneName) => {
    if (tabsStore.tabsMenuList.length <= 1) return
    tabsStore.tabsMenuList = tabsStore.tabsMenuList.filter(item => item.path !== fullPath)
    router.push(tabsStore.tabsMenuList[tabsStore.tabsMenuList.length - 1])
}


// 右键打开菜单
const contextMenuVisible = ref(false)
const contextMenuStyle = reactive({
    top: 0,
    left: 0,
})
const openContextMenu = (e: any) => {
    // if (tabsMenuList.value.length <= 1) return false
    let id = ''
    if (e.srcElement.nodeName === 'SPAN') { // 获取 span 元素
        id = e.srcElement.offsetParent.id
    } else { // 获取 div 元素
        id = e.srcElement.id
    }
    
    if (id) {
        // 鼠标右键点击位置减去菜单栏宽度
        contextMenuStyle.left = e.clientX - mainStore.menuWidth
        contextMenuStyle.top = e.clientY - 60

        contextMenuVisible.value = true
    }
}
// 监听点击菜单栏以外
watch(() => contextMenuVisible.value, () => {
    if (contextMenuVisible.value) {
        document.body.addEventListener('click', () => {
            contextMenuVisible.value = false
        })
    } else {
        document.body.removeEventListener('click', () => {
            contextMenuVisible.value = false
        })
    }
})
</script>

<style lang="scss">
.tabs{
    .el-tabs__header{
        margin: 0;
    }
}
</style>
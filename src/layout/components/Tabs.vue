<template>
    <div>
        <el-tabs
            v-model="tabsMenuValue"
            type="card"
            :closable="tabsStore.tabsMenuList.length > 1"
            @tab-click="tabClick"
            @tab-remove="tabRemove"
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
    </div>
</template>

<script setup lang="ts" name="Tabs">
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { tabs } from '@/stort/modules/tabs'
import type { TabPaneName, TabsPaneContext } from 'element-plus'

const tabsStore = tabs()
const route = useRoute()
const router = useRouter()
const tabsMenuValue = ref('')
const tabsMenuList = computed(() => tabsStore.tabsMenuList)

watch(()=>route.fullPath, ()=>{
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
</script>

<style lang="scss">

</style>
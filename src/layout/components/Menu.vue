<template>
    <template v-for="subItem in menuList" :key="subItem.path">
        <el-sub-menu v-if="subItem.children?.length" :index="subItem.path">
            <template #title>
                <el-icon>
                    <component :is="subItem.meta.icon" />
                </el-icon>
                <span>{{ subItem.meta.title }}</span>
            </template>
            <SubMenu :menu-list="subItem.children" />
        </el-sub-menu>
        <el-menu-item v-else :index="subItem.path" @click="handleClickMenu(subItem)">
            <el-icon>
                <component :is="subItem.meta.icon" />
            </el-icon>
            <template #title>
                <span>{{ subItem.meta.title }}</span>
            </template>
        </el-menu-item>
    </template>
</template>

<script setup lang="ts" name="SubMenu">
import { useRouter } from 'vue-router'

defineProps<{
    menuList: any[]
}>()

const router = useRouter()
const handleClickMenu = (subItem: any) => {
    if (subItem.meta.isLink) return window.open(subItem.meta.isLink, '_blank')
    router.push(subItem.path)
}
</script>

<style lang="scss">

</style>
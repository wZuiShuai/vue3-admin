<template>
    <RouterView />
</template>

<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import mittBus from '@/utils/mittBus'
import { main } from '@/stort/modules/main'
const mainStore = main()

const isDark = useDark()
const toggleDark = useToggle(isDark)

mainStore.subject = isDark.value

mittBus.on('toggleDark', ()=>{
    toggleDark()
    mainStore.subject = isDark.value
})
</script>

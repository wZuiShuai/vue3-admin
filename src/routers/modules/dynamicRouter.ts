import { auth } from '@/stort/modules/auth'
// import { useRouter } from 'vue-router' // 会 warn
import router from '@/routers/index' // 


// 引入 views 文件夹下所有 vue 文件
const modules = import.meta.glob('@/views/**/*.vue')

export const initDynamicRouter = async () => {
            

    const authStore = auth()

    try {
        await authStore.getAuthMenuList()

        if (!authStore.authMenuList.length) {
            ElNotification({
                title: '无权限访问',
                message: '当前账号无任何菜单权限，请联系系统管理员',
                type: 'warning',
                duration: 3000,
            })
            router.replace(import.meta.env.VITE_LOGIN_URL)
            return Promise.reject('No permission')
        }
        
        // 3.添加动态路由
        authStore.flatMenuListGet.forEach((item: any) => {
            item.children && delete item.children
            if (item.component && typeof item.component == 'string') {
                item.component = modules[`/src/views${item.component}.vue`]
            }
            if (item.meta.isFull) {
                router.addRoute(item)
            } else {
                router.addRoute('layout', item)
            }
        })
    } catch (error) {
        
    }
}
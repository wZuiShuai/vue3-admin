/**
 * @description 使用递归扁平化菜单，方便添加动态路由
 */
export function getFlatMenuList(menuList: any[]): any[] {
    const newMenuList: any[] = JSON.parse(JSON.stringify(menuList))
    return newMenuList.flatMap((item: any) => [item, ...(item.children ? getFlatMenuList(item.children) : [])])
}

/**
 * @description 使用递归过滤出需要渲染在左侧菜单的列表 (需剔除 isHide == true 的菜单)
 * */
export function getShowMenuList(menuList: any[]) {
    const newMenuList: any[] = JSON.parse(JSON.stringify(menuList))
    return newMenuList.filter((item) => {
        item.children?.length && (item.children = getShowMenuList(item.children))
        return !item.meta?.isHide
    })
}

/**
 * @description 使用递归找出所有面包屑存储到 pinia 中
 */
export const getAllBreadcrumbList = (menuList: any, parent = [], result: { [key: string]: any } = {}) => {
    for (const item of menuList) {
        result[item.path] = [...parent, item]
        if (item.children) getAllBreadcrumbList(item.children, result[item.path], result)
    }
    return result
}
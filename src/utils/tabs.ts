/**
 * @description 使用递归扁平化菜单，方便添加动态路由
 */
export function getKeepAliveList(keepAliveList: any[]): string {
    const newKeepAliveList: any[] = JSON.parse(JSON.stringify(keepAliveList))
    const arr: any = []
    newKeepAliveList.forEach((item) => {
        if (item.keepAlive) {
            arr.push(item.name)
        }
    })
    return arr.toString()
}

/**
 * @description 使用递归扁平化菜单，方便添加动态路由
 */
export function getMenuWidth(isExpand: boolean, isSmallWidth: boolean): number {

    if (isExpand) {
        return Number(import.meta.env.VITE_MENU_LARGE)
    } else if (isSmallWidth) {
        return Number(import.meta.env.VITE_MENU_SMALL)
    } else {
        return Number(import.meta.env.VITE_MENU_DEFAULT)
    }
}

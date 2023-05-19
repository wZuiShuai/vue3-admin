

export interface Result {
    code: string
    msg: string
}

// * 请求响应参数(包含data)
export interface ResultData<T = any> extends Result {
    data: T
}

// export interface ResPages {
//     data: {
//         role: {
//             menus: []
//         }
//     }
// }


// export namespace Menu {
//     export interface MenuOptions {
//         path: string
//         name: string
//         component?: string | (() => Promise<any>)
//         meta: metaOptions
//         children?: MenuOptions[]
//     }

//     interface metaOptions {
//         icon: string
//         title: string
//     }
// }
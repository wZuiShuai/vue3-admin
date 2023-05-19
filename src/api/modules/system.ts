import http from '@/api'

export namespace Captcha {
    export interface Res {
        captchaId: string
        picPath: string
        captchaLength: number
        openCaptcha: boolean
    }
}
export const captchaApi = () => {
    return http.post<Captcha.Res>('base/captcha')
}

export namespace Menu {
    export interface Res {
        menus: any[]
    }
}
export const menuApi = () => {
    return http.post<Menu.Res>('menu/getMenu')
}
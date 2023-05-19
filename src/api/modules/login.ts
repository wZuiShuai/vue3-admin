import http from '@/api'

export namespace Login {
    export interface ReqLoginForm {
        username: string
        password: string
        captchaId: string
        captcha: string
    }
    export interface ResLogin {
        token: string
    }
}
export const loginApi = (params: Login.ReqLoginForm) => {
    return http.post<Login.ResLogin>('/base/login', params)
}
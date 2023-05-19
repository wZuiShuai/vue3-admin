import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'

import { ResultEnum } from '@/api/config/httpEnum'
import { checkStatus } from '@/api/config/checkStatus'
import { main } from '@/stort/modules/main'
import router from '@/routers'
import type { ResultData } from '@/api/interface'

const config = {
    // 默认地址请求地址，可在 .env 开头文件中修改
    baseURL: import.meta.env.VITE_API_URL as string,
    // 设置超时时间（10s）
    timeout: ResultEnum.TIMEOUT as number,
}

class RequestHttp {
    service: AxiosInstance
    public constructor(config: AxiosRequestConfig) {
        // 实例化axios
        this.service = axios.create(config)

        // 请求拦截器
        this.service.interceptors.request.use(
            (config: any) => {
                const token: string = main().$state.token
                return {
                    ...config,
                    headers: { ...config.headers, 'x-token': token },
                }
            },
            (error: AxiosError) => {
                return Promise.reject(error)
            },
        )

        // 响应拦截器
        this.service.interceptors.response.use(
            (response: AxiosResponse) => {
                const { data } = response
                // * 登陆失效
                if (data.code === ResultEnum.OVERDUE) {
                    ElMessage.error(data.msg)
                    main().$state.token = '' // 清除token
                    router.replace({ name: 'login' })
                    return Promise.reject(data)
                }
                // * 全局错误信息拦截（防止下载文件得时候返回数据流，没有code，直接报错）
                if (data.code && data.code !== ResultEnum.SUCCESS) {
                    ElMessage.error(data.msg)
                    return Promise.reject(data)
                }
                // * 成功请求（在页面上除非特殊情况，否则不用处理失败逻辑）
                return data
            },
            async (error: AxiosError) => {
                const { response } = error
                // 请求超时单独判断，因为请求超时没有 response
                if (error.message.indexOf('timeout') !== -1) {
                    ElMessage.error('请求超时！请您稍后重试')
                }
                // 根据响应的错误状态码，做不同的处理
                if (response) {
                    checkStatus(response.status)
                }
                // 服务器结果都没有返回(可能服务器错误可能客户端断网)，断网处理:可以跳转到断网页面
                if (!window.navigator.onLine) {
                    // router.replace('/500')
                    alert('500')
                }
                return Promise.reject(error)
            },
        )
    }

    // * 常用请求方法封装
    get<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
        return this.service.get(url, { params, ..._object })
    }

    post<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
        return this.service.post(url, params, _object)
    }

    put<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
        return this.service.put(url, params, _object)
    }

    delete<T>(url: string, params?: any, _object = {}): Promise<ResultData<T>> {
        return this.service.delete(url, { params, ..._object })
    }

}

export default new RequestHttp(config)
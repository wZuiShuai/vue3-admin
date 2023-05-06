import { ElMessage } from 'element-plus'

/**
 * @description: 校验网络请求状态码
 * @param {Number} status
 * @return void
 */
export const checkStatus = (status: number): void => {
    switch (status) {
        case 400:
            ElMessage.error('请求失败！请您稍后重试')
            break
        case 404:
            ElMessage.error('你所访问的资源不存在！')
            break
        case 500:
            ElMessage.error('服务异常！')
            break
        default:
            ElMessage.error('请求失败！')
    }
}

import axios from 'axios'
import type { AxiosInstance, InternalAxiosRequestConfig, AxiosError, AxiosResponse } from 'axios'
import { ElNotification } from 'element-plus'

const service: AxiosInstance = axios.create({
    baseURL: 'https://www.demo.com',
    timeout: 5000
})

// 请求拦截器
service.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    // 在发送请求之前做些什么
    return config
}, (error: AxiosError) => {
    // 对请求错误做些什么
    ElNotification({
        title: '请求错误',
        message: error.message,
        type: 'error'
    })
    return Promise.reject(error)
})
// 响应拦截器
service.interceptors.response.use((response: AxiosResponse) => {
    if (response.status !== 200) {
        ElNotification({
            title: '请求错误',
            message: response.data.message,
            type: 'error'
        })
    } else {
        return response.data
    }

}), (error: AxiosError) => {
    // 对响应错误做些什么
    ElNotification({
        title: '响应错误',
        message: error.message,
        type: 'error'
    })
    return Promise.reject(error)
}
export default service
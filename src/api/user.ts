import {post} from '@/utils/http'

const Api = {
    login: '/login',
} as const; // as const 将接口定义成常量


interface LoginParams {
    username: string
    password: string
}
function loginApi(params: LoginParams): Promise<any>{
    return post(Api.login, params)
}

export {loginApi}
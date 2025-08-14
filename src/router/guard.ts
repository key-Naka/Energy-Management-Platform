import router from './index'
import { useUserStore } from '@/store/auth'

router.beforeEach((to) => {
    const userStore = useUserStore()
    const isLogin = userStore.token
    if(!isLogin){
        if(to.path !== '/login'){
            return {path: '/login'}
        }
    }else{
        if(to.path === '/login'){
            return {path: '/'}
        }
        if(to.meta?.needAuth && to.meta.roles && Array.isArray(to.meta.roles) && !userStore.roles.some((role: string) => (to.meta.roles as string[]).includes(role))){
            return {path: '/'}
        }else{
            // 不需要权限
            
        }
}
})
import {get} from '@/utils/http'
const Api = {
    TypeList:"/document"
} as const; 
function TypeListApi() {
    return get(Api.TypeList)
}
export {
    TypeListApi
}
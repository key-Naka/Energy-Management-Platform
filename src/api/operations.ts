import {post,get} from "@/utils/http";
const Api = {
    BatchDelete :'/batchDelete',
    CityList :'/cityList'
} as const; 
function batchDeleteApi(order:string[]) {
    return post(Api.BatchDelete,{order})
}
function cityListApi() {
    return get(Api.CityList)
}
export {
    batchDeleteApi, cityListApi
}
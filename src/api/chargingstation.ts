import { post, get } from '@/utils/http'
import type { RowType } from '@/type/station'
interface ListType {
    page: number,
    pageSize: number,
    name?: string,
    id?: string,
    status: number
}
interface RevenueType {
    page: number,
    pageSize: number,
    name: string,
}
const Api = {
    List: "/stationList",
    Edit: "/station/edit",
    Delete: "/station/delete",
    RevenuChart: "/revenueChart",
    Revenue: "/revenueList",
    CurrentList:"/currentList"
} as const;

function listApi(data: ListType) {
    return post(Api.List, data);
}
function editApi(data: RowType) {
    return post(Api.Edit, data);
}
function deleteApi(id: string) {
    return post(Api.Delete, { id });
}
function chartApi() {
    return get(Api.RevenuChart);
}
function revenueApi(data:RevenueType){
    return post(Api.Revenue,data)
}

function currentListApi(data:string){
    return post(Api.CurrentList,data)
}
export { listApi, editApi, deleteApi, chartApi, revenueApi,currentListApi };
import { get } from "@/utils/http";
const Api = {
    ChartData: "/chartData",
    ChartData2: "/chartData2",
    ChartData3: "/chartData3"
} as const;

function getChartDataApi() {
    return get(Api.ChartData)
}

function chartDataApi() {
    return get(Api.ChartData2)
}
function chartDataApi3() {
    return get(Api.ChartData3)
}

export { getChartDataApi, chartDataApi, chartDataApi3 }
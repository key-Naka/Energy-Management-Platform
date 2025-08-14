// 引入echarts图表库，用于数据可视化
import * as echarts from 'echarts';
import {ref,markRaw,onBeforeUnmount,onMounted} from 'vue';
import type {Ref} from 'vue';

export const useCharts = (chartRef:Ref<HTMLElement|null>,setChartData:any) => {
    const chartInstance = ref<echarts.ECharts|null>(null);
    
    const initChart = async() => {
        if (chartRef.value) {
            chartInstance.value =markRaw(echarts.init(chartRef.value));
            const options = await setChartData()
            chartInstance.value.setOption(options);
        }
    }
    onMounted(() => {
        initChart();
        window.addEventListener('resize', () => {chartInstance.value?.resize();})
    })
    onBeforeUnmount(() => {
        window.removeEventListener('resize', () => {chartInstance.value?.resize();})
        if (chartInstance.value) {
            chartInstance.value.dispose();
        }
    })
}

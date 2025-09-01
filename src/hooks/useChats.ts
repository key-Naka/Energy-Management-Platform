import * as echarts from 'echarts';
import { ref, markRaw, onBeforeUnmount, onMounted } from 'vue';
import type { Ref } from 'vue';

export const useCharts = (chartRef: Ref<HTMLElement | null>, setChartData: any) => {
    const chartInstance = ref<echarts.ECharts | null>(null);

    // 定义resize处理函数
    const handleResize = () => {
        chartInstance.value?.resize();
    }

    const initChart = async () => {
        try {
            if (chartRef.value) {
                // 确保旧的实例被正确销毁
                if (chartInstance.value) {
                    chartInstance.value.dispose();
                }
                chartInstance.value = markRaw(echarts.init(chartRef.value));
                const options = await setChartData();
                if (chartInstance.value) {
                    chartInstance.value.setOption(options);
                }
            }
        } catch (error) {
            console.error('Chart initialization failed:', error);
        }
    }

    onMounted(() => {
        initChart();
        window.addEventListener('resize', handleResize);
    })

    onBeforeUnmount(() => {
        window.removeEventListener('resize', handleResize);
        if (chartInstance.value) {
            chartInstance.value.dispose();
            chartInstance.value = null;
        }
    })
}

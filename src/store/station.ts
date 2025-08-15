import { defineStore } from "pinia";
import type { RowType } from "@/type/station";
import { ref } from "vue";
export const useStationStore = defineStore("station",()=> {
    const rowData = ref<RowType>({
        name: '',
        id: '',
        city: '',
        fast: '',
        slow: '',
        status: 1,
        now: '',
        fault: '',
        person: '',
        tel: ''
    })
    const setRowData = (data: RowType) => {
        rowData.value = data
    }
    return {
        rowData,
        setRowData
    }
})
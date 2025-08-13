import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { MenuType } from '@/type/user/index'


export const useTapsStore = defineStore('taps', () => {
    const taps = ref<MenuType[]>([
        {
            name: "数据看板",
            url: "/dashboard",
            icon: "DataLine"
        }
    ])
    const currentTap = ref<{name: string, url: string}>({
        name: "数据看板",
        url: "/dashboard",
    })
    const addTab = (name: string, url: string, icon: string) => {
        if (!taps.value.some((tap) => tap.url == url)) {
            taps.value.push({
                name,
                url,
                icon
            })
        }
    }
    const setcurrentTap = (name: string, url: string) => {
        currentTap.value = {
            name,
            url
        }
    }
    return { taps, addTab, currentTap, setcurrentTap }
})
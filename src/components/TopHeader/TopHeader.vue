<template>
    <div class="header">
        <div class="personal">
            <el-badge :is-dot="info > 0">
                <el-icon>
                    <Bell />
                </el-icon>
            </el-badge>
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
            <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                    欢迎你，{{ username }}
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item icon="User" command="user">个人中心</el-dropdown-item>
                        <el-dropdown-item icon="SwitchButton" command="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue"
import { useUserStore } from "@/store/auth"
import { useTapsStore } from "@/store/taps"
import { storeToRefs } from "pinia"
import { useRouter, useRoute} from "vue-router"
const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const tapsStore = useTapsStore()
const { username } = storeToRefs(userStore)
const { addTab } = tapsStore
const info = ref(5)

function findObject(menu:any[], url: string) {
    for (const item of menu) {
        if (item.url === url) {
            return item
        }
        if (item.children) {
            const result:any = findObject(item.children, url)
            if (result) {
                return result
            }
        }
    }
}
const {name,url,icon} =findObject(userStore.menu,route.path)
addTab(name,url,icon)

const handleCommand = (command: string) => {
    if (command === "user") {
        router.push("/personal")
    } else {
        userStore.logout()
        router.push("/login")
    }
}
</script>
<style lang="less" scoped>
.header {
    background-color: white;
    height: 60px;
    padding: 0 20px;

    .personal {
        float: right;
        display: flex;
        height: 60px;
        align-items: center;

        .el-dropdown-link:focus-visible {
            outline: none;
        }

        .item {
            margin-top: 10px;
        }
    }
}
</style>
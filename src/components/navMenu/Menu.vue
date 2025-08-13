<template>
    <div class="logo nts">
        <img :src="logo">
        <h1>能源台</h1>
    </div>

    <el-menu class="nts" :router="true" :default-active="$route.path">
        <MenuItem v-for="item in usersStore.menu" :item="item" :key="item.url">
        </MenuItem>
    </el-menu>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store/auth'
import MenuItem from './Menuitem.vue'
import logo from '@/assets/logo.png'

const usersStore = useUserStore()
console.log(usersStore.menu)
</script>

<style scoped lang="less">
.logo {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    padding: 10px 0;

    img {
        margin-left: -10px;
        width: 50px;
        height: 50px;

        h1 {
            color: #333;
            margin-left: 10px;
            font-size: 22px;
        }
    }
}
.el-menu {
    border-right: none;
}
</style>
<template>
  <el-tabs :model-value="currentTap.name"  type="card" class="demo-tabs" closable @tab-click="handleClick" @tab-remove="remove">
    <el-tab-pane 
        v-for="item in taps" :key="item.url" :lable="item.name" :name="item.name"
    >
      <template #label>
        <span class="custom-tabs-label">
          <el-icon>
                <component :is="item.icon"></component>
          </el-icon>
          <span>&nbsp;{{ item.name }}</span>
        </span>
      </template>
    </el-tab-pane>
  </el-tabs>
  <RouterView v-slot="{Component}">
    <KeepAlive>
      <component :is="Component" :key="$route.name" v-if="$route.meta.keepAlive"/>
    </KeepAlive>
    <component :is="Component" :key="$route.name" v-if="!$route.meta.keepAlive"/>
  </RouterView>
</template>
<script setup lang="ts">
import router from '@/router'
import { useTapsStore} from '@/store/taps'
import { storeToRefs } from 'pinia'
import { KeepAlive } from 'vue'
import { RouterView } from 'vue-router'
const tapsStore = useTapsStore()
const {taps,currentTap} = storeToRefs(tapsStore)
const {setcurrentTap,removeTap} = tapsStore
const handleClick = ({index}:{index:number}) => {
    router.push(taps.value[index].url)
    setcurrentTap(taps.value[index].name, taps.value[index].url)
}
const remove = (targetName: string) => {
    removeTap(targetName)
    router.push(currentTap.value.url)
}

</script>
<style scoped lang="scss">
</style>
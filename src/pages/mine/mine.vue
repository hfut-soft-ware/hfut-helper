<script lang='ts' setup>
import { ref } from 'vue'
import Header from '@/pages/mine/header.vue'
import CommonServices from '@/pages/mine/common-services.vue'
import AccountSettings from '@/pages/mine/account-settings.vue'

type TActive = 'commonServices' | 'settings'
const active = ref<TActive>('commonServices')

function onActiveChange(event: any) {
  active.value = event.target.name
}

</script>

<template>
  <div class="relative w-[95vw] mx-[2.5vw] pb-5">
    <Header />
    <div class="mt-10 flex flex-col gap-5">
      <div class="border-box overflow-hidden rounded-xl shadow-lg">
        <div class="relative flex justify-center items-center h-[200px] overflow-hidden">
          <img class="w-full object-cover bg" src="../../assets/imgs/mine-bg.png">
          <div class="flex absolute flex-col items-center gap-2">
            <div class="w-[75px] h-[75px] border-2 border-white/50 rounded-full overflow-hidden">
              <img class="w-[75px] h-[75px]" src="../../assets/imgs/avatar.png">
            </div>
            <p class="text-white text-md font-bold">
              计算机与人工智能学院
            </p>
            <p class="text-gray-400 text-xs">
              电信科21-2班
            </p>
          </div>
        </div>
        <div class="bg-white w-full flex pt-1">
          <van-tabs class="w-full" :active="active" @change="onActiveChange">
            <van-tab title="常用服务" name="commonServices" />
            <van-tab title="账号设置" name="settings" />
          </van-tabs>
        </div>
      </div>

      <template v-if="active === 'commonServices'">
        <CommonServices />
      </template>
      <template v-else>
        <AccountSettings />
      </template>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.bg::before {
  content: '';
  @apply absolute top-0 left-0 right-0 bottom-0 bg-[#2D5A8B] bg-opacity-50;
}

</style>

<script lang='ts' setup>
import { reactive } from 'vue'

const services = reactive<{ icon: string; title: string; url: string }[]>([
  {
    icon: 'telescope',
    title: '全校课表查询',
    url: 'allCoursesSearch',
  },
  {
    icon: 'explore-planet',
    title: '一卡通',
    url: 'cardSearch',
  },
  {
    icon: 'galaxy',
    title: '我的慕课',
    url: 'mooc/mooc',
  },
  {
    icon: 'star-moon',
    title: '空教室查询',
    url: 'emptyRoomSearch',
  },
])

function onServiceClick(url: string) {
  uni.navigateTo({
    url: `/pages/mine/${url}`,
  })
}
</script>

<template>
  <div class="w-full rounded-xl card-shadow flex py-5">
    <div class="base-info-card border-r-[1px] border-r-[#E5E8EB]">
      <p class="font-semibold text-md">
        60.24
      </p>
      <p class="text-sm text-[#637381]">
        校园卡余额
      </p>
    </div>
    <div class="base-info-card">
      <p class="font-semibold text-md">
        2门
      </p>
      <p class="text-sm text-[#637381]">
        最近考试安排
      </p>
    </div>
  </div>

  <div class="flex flex-col gap-3 mt-5">
    <div
      v-for="service in services"
      :key="service.icon"
      class="card-shadow rounded-xl w-full p-5 items-center box-border flex justify-between"
      @click="onServiceClick(service.url)"
    >
      <img
        class="w-[30px] h-[30px]"
        :src="`../../assets/icons/${service.icon}.png`"
      >
      <p class="font-semibold text-sm">
        {{ service.title }}
      </p>
      <van-icon name="arrow" />
    </div>
  </div>
</template>

<style lang='scss' scoped>
.base-info-card {
  @apply flex flex-col items-center gap-1 flex-1;
}

</style>

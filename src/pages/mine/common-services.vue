<script lang='ts' setup>
import { reactive } from 'vue'

const services = reactive([
  {

  },
])
</script>

<template>
  <div class="w-full rounded-xl shadow-lg flex py-5">
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

  <div>
    1
  </div>
</template>

<style lang='scss' scoped>
.base-info-card {
  @apply flex flex-col items-center gap-1 flex-1;
}
</style>

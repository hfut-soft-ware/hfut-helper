<script lang='ts' setup>
import { ref } from 'vue'

const show = ref(false)

function onClose() {
  show.value = false
}
</script>

<template>
  <van-popup
    :show="show"
    round
    position="bottom"
    custom-style="height: 20%"
    @close="onClose"
  />
  <div class="fixed right-0 h-screen flex items-center">
    <div class="flex justify-center items-center text-lg w-[50px] h-[50px] settings rounded-full">
      <van-icon name="setting-o" />
    </div>
  </div>
</template>

<style lang='scss' scoped>
.settings {
  box-shadow: -12px 12px 32px -4px rgb(99 115 129 / 36%);
}
</style>

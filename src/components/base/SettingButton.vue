<script setup lang='ts'>
const emits = defineEmits<{
  (e: 'click'): void
}>()
</script>

<template>
  <div class="fixed top-64 right-0 z-[1]">
    <div
      class="settings bg-[#3F51B5] text-lg w-[50px] h-[50px] flex justify-center items-center text-white rounded-l-full rounded-tr-full"
      @click="emits('click')"
    >
      <van-icon class="animate-spin" name="setting-o" />
    </div>
  </div>
</template>

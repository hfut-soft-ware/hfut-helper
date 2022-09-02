<script setup lang='ts'>
type Props = {
  icon?: string
}

defineProps<Props>()
</script>

<template>
  <div class="flex px-4 rounded-full border-[#e9e8ef] border-[1px]">
    <van-icon v-if="icon" :name="icon" />
    <p class="text-base">
      <slot />
    </p>
  </div>
</template>

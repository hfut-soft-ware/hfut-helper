<script lang="ts" setup>
const emit = defineEmits<{
  (e: 'click'): void
}>()

function handleClick() {
  emit('click')
}
</script>

<template>
  <view class="container" @click="handleClick">
    <slot />
  </view>
</template>

<style lang='scss' scoped>
.container {
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
}
</style>

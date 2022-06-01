<script lang='ts' setup>
import { ref } from 'vue'

const show = ref(true)

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
</template>

<style lang='scss' scoped>

</style>

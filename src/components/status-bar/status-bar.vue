<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  bgColor: string
}
const props = defineProps<Props>()

const style = computed(() => ({
  backgroundColor: props.bgColor,
}))
</script>

<template>
  <div class="status-bar" :style="style" />
</template>

<style lang='scss' scoped>
.status-bar {
  height: var(--status-bar-height);
}
</style>

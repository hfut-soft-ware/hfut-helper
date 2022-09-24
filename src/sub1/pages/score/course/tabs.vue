<script setup lang='ts'>
type Props = {
  tabs: {
    key: string
    name: string
  }[]
  activeKey: string
}
const emits = defineEmits<{
  (e: 'update:activeKey', key: string): void
}>()
defineProps<Props>()

const changeActiveKey = (key: string) => {
  emits('update:activeKey', key)
}
</script>

<template>
  <div class="flex justify-between">
    <div
      v-for="tab in tabs"
      :key="tab.key"
      class="score-type"
      :class="activeKey === tab.key ? 'score-type-active' : ''"
      @click="changeActiveKey(tab.key)"
    >
      {{ tab.name }}
    </div>
  </div>
</template>

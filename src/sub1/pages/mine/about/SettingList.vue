<script lang='ts' setup>
interface Props {
  list: {
    title: string
    leftIcon: string
    cb: () => void
    forbidRightIcon?: boolean
  }
}

const { list } = withDefaults(defineProps<Props>(), {
  list: [] as any,
})
</script>

<template>
  <div v-if="list.length" class="list-card card-shadow text-lg flex-col bg-white rounded-lg p-3 gap-3">
    <div
      v-for="item in list"
      :key="item.title"
      class="flex justify-between items-center"
      @click="item.cb"
    >
      <div class="flex gap-2">
        <van-icon class="text-lg" :name="item.leftIcon" />
        <div class="text-sm">
          {{ item.title }}
        </div>
      </div>
      <div v-if="!item.forbidRightIcon">
        <van-icon name="arrow" />
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>

</style>

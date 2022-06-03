<script lang='ts' setup>
export type TCourseDetail = {
  icon: string
  title: string
  value: any
}

interface Props {
  detail: TCourseDetail[]
}

const props = defineProps<Props>()
</script>

<template>
  <div
    v-for="item in props.detail"
    :key="item.title"
    class="mt-5 flex gap-2"
  >
    <div class="relative">
      <van-icon :name="item.icon" class="text-[#808599] mt-1" />
    </div>
    <div>
      <div class="text-md font-bold text-[#464953]">
        {{ item.title }}
      </div>
      <div class="text-xs text-[#808599] mt-2">
        {{ item.value }}
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>

</style>

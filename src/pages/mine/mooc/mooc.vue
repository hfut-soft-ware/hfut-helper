<script lang='ts' setup>
import { storeToRefs } from 'pinia'
import { watchEffect } from 'vue'
import { useCourseListStore } from '@/store/courseList.store'

const store = useCourseListStore()

const { list } = storeToRefs(store)

watchEffect(() => {
  console.log(list.value)
})
</script>

<template>
  <div class="flex flex-col gap-3">
    <div
      v-for="mooc in list?.mooc"
      :key="mooc.id"
      class="card-shadow flex flex-col gap-2"
    >
      <p class="font-bold">
        {{ mooc.name }}
      </p>
      <div class="flex flex-col gap-2">
        <div class="flex">
          <van-icon name="coupon-o" />
          <p>学分: {{ mooc.detail.credits }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>

</style>

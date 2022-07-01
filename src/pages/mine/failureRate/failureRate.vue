<script lang='ts' setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useDebounceFn } from '@vueuse/core'
import Toast from '@vant/weapp/lib/toast/toast'
import { getFailureRateSearchRequest } from '@/server/api/score'
import { useFailureRateStore } from '@/store/failureRate.store'

const store = useFailureRateStore()

const { courseName } = storeToRefs(store)

const searchName = ref('')
const options = ref<string[]>()

const error = ref()

const onSearchClick = useDebounceFn(() => {
  Toast.loading({
    message: '加载中...',
  })
  getFailureRateSearchRequest(searchName.value).then((res) => {
    error.value = null
    options.value = res.data.data.options
  }).catch((err) => {
    error.value = (err as any).data.msg
  }).finally(() => {
    Toast.clear()
  })
}, 500)

const selectedCourse = (name: string) => {
  courseName.value = name
  uni.navigateTo({
    url: '/pages/failure-rate/failure-rate',
  })
}
</script>

<template>
  <van-toast id="van-toast" />
  <div class="w-screen min-h-screen bg-gray-100">
    <div class="w-[95vw] mx-auto py-5">
      <div class="flex gap-3 items-center box-border px-[2.5vw]">
        <div class="flex inset-y-0 left-0 items-center">
          <van-icon name="search" />
        </div>
        <input
          id="default-search"
          v-model="searchName"
          type="search"
          class="block p-4 w-full text-sm text-gray-900 bg-gray-200 rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          placeholder="请输入课程名称(支持模糊搜索)"
        >
        <button class="flex w-20 h-10 justify-center items-center text-white bg-blue-700 font-medium rounded-lg text-sm dark:bg-blue-600" @click="onSearchClick">
          搜索
        </button>
      </div>
      <div v-if="!error" class="grid gap-1 mt-5 text-black/85">
        <template v-for="item in options" :key="item">
          <div
            class="card-shadow rounded-lg bg-white px-2 py-3 flex justify-between"
            @click="selectedCourse(item)"
          >
            <p>{{ item }}</p>
            <van-icon name="arrow" />
          </div>
        </template>
      </div>
      <template v-else>
        <van-empty :description="error" />
      </template>
    </div>
  </div>
</template>

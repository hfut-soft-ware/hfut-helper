<script lang='ts' setup>
import { getFailureRateSearchRequest } from '@/server/api/score'

getFailureRateSearchRequest('高数')
</script>

<template>
  <div class="w-screen min-h-screen">
    <div class="w-[95vw] mx-auto">
      <div class="flex items-center">
        <div class="flex inset-y-0 left-0 items-center">
          <van-icon name="search" />
        </div>
        <input
          id="default-search"
          type="search"
          class="block p-4 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          placeholder="请输入课程名称(不支持模糊搜索)"
        >
        <button type="submit" class="flex h-10 justify-center items-center text-white bg-blue-700 font-medium rounded-lg text-sm px-4 dark:bg-blue-600">
          Search
        </button>
      </div>
    </div>
  </div>
</template>

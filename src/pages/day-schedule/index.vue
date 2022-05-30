<script lang='ts' setup>
import { watchEffect } from 'vue'
import Toast from '@vant/weapp/dist/toast/toast'
import { getRandomQAQ } from 'qaq-font'
import Header from './Header.vue'
import CardList from './card-list.vue'
import { useCourseRequest } from './use-courseRequest'
import { isEmptyObject } from '@/shared/utils'
import StatusBar from '@/components/status-bar/status-bar.vue'

const { isLoading, error, state } = useCourseRequest()

watchEffect(() => {
  if (isLoading.value) {
    Toast.loading({
      message: `正在获取最新的课程信息，请稍等一下\n${getRandomQAQ('happy')[0]}`,
    })
  }
  if (error.value) {
    Toast.fail(`糟糕，没有拿到最新的课程信息\n ${getRandomQAQ('sadness')[0]}`)
  }

  if (!isEmptyObject(state.value)) {
    Toast.success({
      message: `获取最新课表成功啦\n${getRandomQAQ('happy')[0]}`,
    })
  }
})
</script>

<template>
  <StatusBar />
  <div class="w-screen bg-[#F6F8FA] pt-5">
    <template v-if="state && !isLoading">
      <div class="w-[100vw]">
        <Header />
        <CardList />
      </div>
    </template>
    <van-toast id="van-toast" />
  </div>
</template>

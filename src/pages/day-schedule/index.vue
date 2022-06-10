<script lang='ts' setup>
import { onLaunch, onLoad } from '@dcloudio/uni-app'
import Dialog from '@vant/weapp/lib/dialog/dialog'
import { getRandomQAQ } from 'qaq-font'
import Toast from '@vant/weapp/lib/toast/toast'
import Header from './Header.vue'
import CardList from './card-list.vue'
import { useCourseRequest } from './use-courseRequest'
import StatusBar from '@/components/status-bar/status-bar.vue'
import { useTouchInteractive } from '@/shared/hooks/useTouchInteractive'
import { useCourseListStore } from '@/store/courseList.store'
import { usePullDownUpdateCourse } from '@/shared/hooks/use-PullDownUpdateCourse'
import { isEmptyObject } from '@/shared/utils'

const { isLoading, state } = useCourseRequest()

const store = useCourseListStore()

const { onTouchStart, onTouchEnd } = useTouchInteractive(store)

onLoad((query) => {
  if (query.refresh) {
    usePullDownUpdateCourse()
  }
})

usePullDownUpdateCourse()

const updateManager = uni.getUpdateManager()

updateManager.onUpdateReady(() => {
  Dialog.confirm({
    title: `HfutSpace更新啦~${getRandomQAQ('happy')[0]}`,
    message: '是否重启加载最新版本的HfutSpace?',

  }).then(() => {
    // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
    updateManager.applyUpdate()
  })
})

updateManager.onUpdateFailed((res) => {
  Toast.fail({
    message: `HfutSpace新版本更新失败\n${getRandomQAQ('sadness')[0]}`,
  })
})
</script>

<template>
  <van-toast id="van-toast" />
  <StatusBar :bg-color="'#F6F8FA'" />
  <div
    class="w-screen bg-[#F6F8FA] pt-5 overflow-hidden"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
  >
    <template v-if="!isEmptyObject(state) && !isLoading">
      <div class="w-[100vw]">
        <Header />
        <CardList />
      </div>
    </template>
    <van-toast id="van-toast" />
  </div>
</template>

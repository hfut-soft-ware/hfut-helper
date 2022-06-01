import { useAsyncState } from '@vueuse/core'
import { watchEffect } from 'vue'
import { getRandomQAQ } from 'qaq-font'
import Toast from '@vant/weapp/lib/toast/toast'
import { useCourseListStore } from '@/store/courseList.store'
import type { ICourse } from '@/shared/types/response/course'
import { isEmptyObject } from '@/shared/utils'

let firstUpdateCourseData = true

export function useCourseRequest(forceRefresh = false) {
  if (!firstUpdateCourseData && !forceRefresh) {
    return { state: true, error: false, isLoading: false }
  }

  const store = useCourseListStore()

  const { state, error, isLoading } = useAsyncState<ICourse>(store.getCourseList(forceRefresh), {} as any)

  watchEffect(() => {
    if (isLoading.value) {
      Toast.loading({
        duration: 0,
        message: `正在获取最新的课程信息，请稍等一下\n${getRandomQAQ('happy')[0]}`,
      })
    }
    if (error.value) {
      Toast.fail(`糟糕，没有拿到最新的课程信息\n ${getRandomQAQ('sadness')[0]}`)
      uni.stopPullDownRefresh()
      firstUpdateCourseData = false
    }

    if (!isEmptyObject(state.value)) {
      Toast.success({
        message: `获取最新课表成功啦\n${getRandomQAQ('happy')[0]}`,
      })
      firstUpdateCourseData = false
      uni.stopPullDownRefresh()
    }
  })

  return {
    state,
    error,
    isLoading,
  }
}

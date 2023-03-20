import { ref } from 'vue'
import { getRandomQAQ } from 'qaq-font'
import Toast from '@vant/weapp/lib/toast/toast'
import { onPullDownRefresh } from '@dcloudio/uni-app'
import { useCourseListStore } from '@/store/courseList.store'
import { isEmptyObject } from '@/shared/utils'

let firstUpdateCourseData = true

export function useCourseRequest() {
  const isLoading = ref(false)
  const error = ref(false)

  const store = useCourseListStore()

  const courseRequest = (forceRefresh = false) => {
    if (!firstUpdateCourseData && !forceRefresh) {
      error.value = false
      isLoading.value = false
    }
    isLoading.value = true
    error.value = false

    store.getCourseList(forceRefresh)
      .then((res) => {
        if (isEmptyObject(res)) {
          error.value = true
          Toast.fail(`糟糕，没有拿到课程信息\n ${getRandomQAQ('sadness')[0]}`)
        } else {
          Toast.success({
            message: `获取最新课表成功啦\n${getRandomQAQ('happy')[0]}`,
          })
          firstUpdateCourseData = false
        }
      }).catch(() => {
        Toast.fail(`糟糕，没有拿到最新的课程信息\n ${getRandomQAQ('sadness')[0]}`)
        firstUpdateCourseData = false
      }).finally(() => {
        isLoading.value = false
      })
  }

  onPullDownRefresh(() => {
    uni.stopPullDownRefresh()
    courseRequest(true)
  })

  return {
    isLoading,
    error,
    courseRequest,
  }
}

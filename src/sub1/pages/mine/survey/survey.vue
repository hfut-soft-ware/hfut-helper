<script setup lang='ts'>
import { ref } from 'vue'
import { getRandomQAQ } from 'qaq-font'
import { onLoad, onPullDownRefresh, onShow } from '@dcloudio/uni-app'
import Toast from '@vant/weapp/dist/toast/toast'
import { getSurveyList } from '@/server/api/survey'
import type { List } from '@/shared/types/response/survey-list'

const surveyList = ref<List[]>([])
const studentId = ref('')

let firstLoad = true
onLoad(() => {
  firstLoad = false
  requestSurveyList('加载成功')
})
onPullDownRefresh(() => requestSurveyList('刷新成功'))
onShow(() => {
  if (!firstLoad) {
    requestSurveyList('加载成功')
  }
})

const requestSurveyList = (successMsg: string) => {
  Toast.clear()
  Toast.loading({
    message: `正在加载...\n${getRandomQAQ('happy')[0]}`,
    duration: 0,
  })
  getSurveyList().then(({ data }) => {
    surveyList.value = data.data.list
    studentId.value = data.data.studentId
    Toast.clear()
    Toast.success({
      message: `${successMsg}\n${getRandomQAQ('happy')[0]}`,
    })
  }).catch((err) => {
    Toast.clear()
    Toast.fail({
      message: `加载失败\n${err.message}\n${getRandomQAQ('sadness')[0]}`,
    })
  }).finally(() => {
    uni.stopPullDownRefresh()
  })
}

const handleTaskClick = (taskId: number) => {
  uni.navigateTo({
    url: `/sub1/pages/mine/survey/question/question?taskId=${taskId}&studentId=${studentId.value}`,
  })
}
</script>

<template>
  <van-toast id="van-toast" />
  <div class="w-screen min-h-screen pt-4 pb-8 flex flex-col gap-2">
    <div v-for="survey in surveyList" :key="survey.courseName" class="w-[90vw] mx-auto p-3 card-shadow box-border rounded-lg">
      <div class="flex items-center justify-between mb-3">
        <h3 class=" flex-1 truncate">
          {{ survey.courseName }}
        </h3>
        <p class="mx-3 text-xs text-slate-500/80">
          {{ survey.endTime }}
        </p>
      </div>
      <div v-for="task in survey.surveyTasks" :key="task.id">
        <div v-if="task.submitted" class=" min-w-[70px] p-2 text-sm text-slate-500">
          {{ task.teacherName }}
        </div>
        <div v-else class=" min-w-[60px] p-2 text-sm text-blue-500" @click="handleTaskClick(task.id)">
          {{ task.teacherName }}
        </div>
      </div>
    </div>
  </div>
</template>

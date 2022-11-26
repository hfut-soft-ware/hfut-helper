<script setup lang='ts'>
import { ref } from 'vue'
import { getRandomQAQ } from 'qaq-font'
import { onLoad, onPullDownRefresh, onShow } from '@dcloudio/uni-app'
import Toast from '@vant/weapp/dist/toast/toast'
import { getSurveyList } from '@/server/api/survey'
import type { List, SurveyTask } from '@/shared/types/response/survey-list'

const surveyList = ref<(List &{ submit: boolean })[]>([])
const studentId = ref('')

let firstLoad = true
onShow(() => {
  if (!firstLoad) {
    requestSurveyList('加载成功')
  }
})
onLoad(() => {
  requestSurveyList('加载成功')
})
onPullDownRefresh(() => requestSurveyList('刷新成功'))

const requestSurveyList = (successMsg: string) => {
  Toast.clear()
  Toast.loading({
    message: `正在加载...\n${getRandomQAQ('happy')[0]}`,
    duration: 0,
  })
  getSurveyList().then(({ data }) => {
    surveyList.value = handleSurveyList(data.data.list)
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
    firstLoad = false
    uni.stopPullDownRefresh()
  })
}

const handleTaskClick = (task: SurveyTask) => {
  if (task.submitted) {
    return
  }
  uni.navigateTo({
    url: `/sub1/pages/mine/survey/question/question?taskId=${task.id}&studentId=${studentId.value}`,
  })
}

function handleSurveyList(list: List[]) {
  return list.map((item) => {
    return {
      ...item,
      submit: item.surveyTasks.every(val => val.submitted),
    }
  })
}
</script>

<template>
  <van-toast id="van-toast" />
  <template v-if="!surveyList.length">
    <van-empty :description="`暂时没有需要教评的任务噢${getRandomQAQ('happy')[0]}`" />
  </template>
  <template v-else>
    <div class="w-screen min-h-screen pt-4 pb-8 flex flex-col gap-3">
      <div v-for="survey in surveyList" :key="survey.courseName" class="w-[90vw] mx-auto p-3 card-shadow box-border rounded-lg" :class="survey.submit ? 'bg-gray-100' : ''">
        <div class="flex items-center justify-between mb-3">
          <h3 class=" flex-1 truncate">
            {{ survey.courseName }}
          </h3>
          <p class="mx-3 text-xs text-slate-500/80">
            {{ survey.timeRange }}
          </p>
        </div>
        <div class="flex">
          <div v-for="(task, index ) in survey.surveyTasks" :key="task.id" class="text-center text-sm" :class="task.submitted ? 'text-slate-500': 'text-blue-500'" @click="handleTaskClick(task)">
            {{ `${task.teacherName}${task.submitted ? '(已完成)': ''}${index === survey.surveyTasks.length - 1 ? '' : '/'}` }}
          </div>
        </div>
      </div>
    </div>
  </template>
</template>
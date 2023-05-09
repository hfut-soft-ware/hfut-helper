<script setup lang='ts'>
import { ref, watchEffect } from 'vue'
import { getRandomQAQ } from 'qaq-font'
import { onPullDownRefresh, onShow } from '@dcloudio/uni-app'
import Toast from '@vant/weapp/dist/toast/toast'
import { getSurveyList } from '@/server/api/survey'
import { handleError } from '@/shared/utils/index'
import SemestersPicker from '@/sub1/component/semesters-picker/SemestersPicker.vue'
import { useRequestSemesters } from '@/shared/hooks/useRequestSemesters'
import type { List, SurveyTask } from '@/shared/types/response/survey-list'
import type { Semester } from '@/shared/types/response/semesters'

const surveyList = ref<(List &{ submit: boolean })[]>([])
const studentId = ref('')
const semester = ref<Semester>()

const { semesters } = useRequestSemesters()

let firstLoad = true
onShow(() => {
  if (!firstLoad) {
    requestSurveyList('加载成功', semester.value?.id)
  }
})

watchEffect(() => {
  requestSurveyList('加载成功', semesters.value[0]?.id)
})

onPullDownRefresh(() => requestSurveyList('刷新成功', semester.value?.id))

const requestSurveyList = (successMsg: string, semesterId?: number) => {
  Toast.clear()
  Toast.loading({
    message: `正在加载...\n${getRandomQAQ('happy')[0]}`,
    duration: 0,
  })
  getSurveyList(semesterId).then(({ data }) => {
    surveyList.value = handleSurveyList(data.data.list)
    studentId.value = data.data.studentId
    Toast.clear()
    Toast.success({
      message: `${successMsg}\n${getRandomQAQ('happy')[0]}`,
    })
  }).catch((error) => {
    Toast.clear()
    handleError(error, '加载失败')
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

const handleClick = () => {
  requestSurveyList('加载成功', semester.value?.id)
}

</script>

<template>
  <van-toast id="van-toast" />
  <!-- <template v-if="!surveyList.length">
    <van-empty :description="`暂时没有需要教评的任务噢${getRandomQAQ('happy')[0]}`" />
  </template> -->
  <div class="w-screen min-h-screen pt-4 pb-8 flex flex-col gap-3">
    <div class="flex items-center justify-around">
      <SemestersPicker v-slot="{semester: semesterValue}" :semesters="semesters" @change="(value) => semester = value">
        <p class="py-2 px-4 rounded-full bg-zinc-50">
          {{ semesterValue.name }}
        </p>
      </SemestersPicker>
      <div class="px-4 py-2 bg-blue-400 text-white  text-center rounded-full" @click="handleClick">
        查询
      </div>
    </div>
    <div v-for="survey in surveyList" :key="survey.courseName" class="w-[90vw] mx-auto p-3 card-shadow box-border rounded-lg" :class="survey.submit ? 'bg-gray-100' : ''">
      <div class="flex items-center justify-between mb-3">
        <h3 class=" flex-1 truncate">
          {{ survey.courseName }}
        </h3>
        <p class="mx-3 text-xs text-slate-500/80">
          {{ survey.timeRange }}
        </p>
      </div>
      <div class="flex flex-wrap">
        <div v-for="(task, index ) in survey.surveyTasks" :key="task.id" class="text-center text-sm" :class="task.submitted ? 'text-slate-500': 'text-blue-500'" @click="handleTaskClick(task)">
          {{ `${task.teacherName}${task.submitted ? '(已完成)': ''}${index === survey.surveyTasks.length - 1 ? '' : '/'}` }}
        </div>
      </div>
    </div>
  </div>
</template>

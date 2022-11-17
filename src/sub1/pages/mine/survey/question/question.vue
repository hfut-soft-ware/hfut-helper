<script setup lang='ts'>
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import Toast from '@vant/weapp/lib/toast/toast'
import { getRandomQAQ } from 'qaq-font'
import { getSurvey, submitSurvey } from '@/server/api/survey'
import { handleError } from '@/shared/utils/index'
import type { BlankQuestion, RadioQuestion } from '@/shared/types/response/survey'

const radioQuestions = ref<(RadioQuestion & { check: string })[]>([])
let surveyAssoc = 0
let lessonSurveyTaskAssoc = 0
const blankQuestion = ref<BlankQuestion>({
  id: '',
  question: '',
})
const input = ref('')
const studentId = ref('')

onLoad((query) => {
  lessonSurveyTaskAssoc = +query.taskId!
  studentId.value = query.studentId!
  getSurvey(query.taskId!).then(({ data }) => {
    const res = data.data
    surveyAssoc = res.surveyAssoc
    blankQuestion.value = res.blankQuestion
    radioQuestions.value = res.radioQuestions.map((item) => {
      return {
        ...item,
        check: item.option[0],
      }
    })
  }).catch((err) => {
    handleError('加载失败', err)
  })
})

const onChange = (event: any, id: string) => {
  const option = event.detail as string
  radioQuestions.value.find(item => item.id === id)!.check = option
}

const handleSubmitClick = () => {
  const radioQuestionAnswers = radioQuestions.value.map((item) => {
    return {
      questionId: item.id,
      optionName: item.check,
    }
  })
  Toast.clear()
  Toast.loading({
    message: `正在提交...\n${getRandomQAQ('happy')[0]}`,
    duration: 0,
  })

  submitSurvey({
    studentId: studentId.value,
    radioQuestionAnswers,
    blankQuestionAnswers: [{
      questionId: blankQuestion.value.id,
      content: input.value,
    }],
    surveyAssoc,
    lessonSurveyTaskAssoc,
  }).then(({ data }) => {
    Toast.clear()
    Toast.success({
      message: data.content,
    })
    uni.navigateBack({
      delta: 1,
    })
  }).catch((err) => {
    Toast.clear()
    handleError('提交失败', err)
  })
}
</script>

<template>
  <van-toast id="van-toast" />
  <div class="w-screen min-h-screen py-4">
    <div v-if="radioQuestions.length" class="w-[90vw] mx-auto rounded-lg card-shadow box-border p-3">
      <div v-for="radioQuestion in radioQuestions" :key="radioQuestion.id" class="my-4">
        <p class="text-sm text-slate-500 mb-3">
          {{ radioQuestion.question }}
        </p>
        <div class="ml-4">
          <van-radio-group :value="radioQuestion.check" @change="(event:any) => onChange(event, radioQuestion.id)">
            <van-radio v-for="option in radioQuestion.option" :key="option" class="text-xs text-slate-400" icon-size="16px" :name="option">
              {{ option }}
            </van-radio>
          </van-radio-group>
        </div>
      </div>
      <div class="my-4">
        <p class="text-sm text-slate-500 mb-3">
          {{ blankQuestion.question }}
        </p>
        <van-field
          :value="input"
          type="textarea"
          placeholder="请输入..."
          autosize
        />
      </div>
      <div class="my-4 bg-blue-400 text-white h-12 text-center leading-[48px] rounded-lg" @click="handleSubmitClick">
        提交
      </div>
    </div>
  </div>
</template>

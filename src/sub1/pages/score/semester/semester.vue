<script lang='ts' setup>
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { onLoad, onPullDownRefresh } from '@dcloudio/uni-app'
import Toast from '@vant/weapp/lib/toast/toast'
import Dialog from '@vant/weapp/lib/dialog/dialog'
import { getRandomQAQ } from 'qaq-font'
import { useScoreStore } from '@/store/score.store'
import type { Score } from '@/shared/types/response/score'
import { SURVEY_PROMPTED, scrollHeight } from '@/shared/constant'
import { getSurveyList } from '@/server/api/survey'
import { isStorageEmpty, useSyncStorage } from '@/shared/hooks/use-syncStorage'

const scoreStore = useScoreStore()
const {
  selectedSemesterData,
} = storeToRefs(scoreStore)

onPullDownRefresh(() => {
  scoreStore.getScoreStore(true)
})

onLoad(async() => {
  const [
    setSurveyStorage,
  ] = useSyncStorage(SURVEY_PROMPTED)
  if (!isStorageEmpty(SURVEY_PROMPTED)) {
    return
  }

  const { data } = await getSurveyList()
  const isNeedSurvey = !data.data.list.every((item) => {
    return item.surveyTasks.every(val => val.submitted)
  })
  setSurveyStorage(true)
  isNeedSurvey && Dialog.confirm({
    message: `检测到你有未完成的教评，\n是否前去教${getRandomQAQ('happy')[0]}`,
  }).then(() => {
    uni.navigateTo({
      url: '/sub1/pages/mine/survey/survey',
    })
  }).catch(() => {})
})

const semesterInfo = computed(() => selectedSemesterData.value.semesterInfo)
const semesterScore = computed(() => semesterInfo.value.scores)

const semesterDetailInfo = computed(() => {
  const data = selectedSemesterData.value.data
  return [
    {
      title: '我的排名',
      value: `${data.rank}/${data.total}`,
      icon: 'chart-trending-o',
    },
    {
      title: '我的成绩',
      value: parseFloat(data.score.toString()).toFixed(2),
      icon: 'user-circle-o',
    },
    {
      title: '专业平均',
      value: parseFloat(data.averageScore.toString()).toFixed(2),
      icon: 'friends-o',
    },
    {
      title: '专业前10%',
      value: parseFloat(data.top.toString()).toFixed(2),
      icon: 'fire-o',
    },
  ]
})

function handleCourseClick(item: Score) {
  if (item.gpa === null) {
    Toast('请先去教务评教')
    return
  }
  scoreStore.setCurrentSelectedCourse(item)
  uni.navigateTo({
    url: '/sub1/pages/score/course/course',
  })
}
</script>

<template>
  <van-toast id="van-toast" />
  <van-dialog id="van-dialog" />
  <div class="absolute top-0 bottom-0 left-0 right-0 bg-[#F6F7F9]">
    <div class="w-[95vw] absolute top-5 bottom-5 left-[2.5vw] mx-auto bg-white p-3 flex flex-col gap-5 w-full rounded-lg box-border">
      <h3 class="font-semibold text-xl text-center">
        {{ semesterInfo.semester }}
      </h3>
      <div class="bg-[#F5F6F9] p-2 rounded-lg flex">
        <div v-for="item in semesterDetailInfo" :key="item.icon" class="flex flex-1 gap-2">
          <van-icon :name="item.icon" />
          <div class="flex-col gap-3 text-sm justify-center items-center">
            <p class="text-gray-400 text-xs">
              {{ item.title }}
            </p>
            <p>{{ item.value }}</p>
          </div>
        </div>
      </div>

      <scroll-view
        id="scroller"
        scroll-y
        :style="`height: ${scrollHeight * 0.95}px;`"
      >
        <div class="flex flex-col gap-5">
          <div v-for="item in semesterScore" :key="item.name" class="flex justify-between" @click="handleCourseClick(item)">
            <div class="flex gap-1">
              <div
                class="h-4 w-1 rounded-lg"
                :class="item.score < 60 ? 'bg-red-500'
                  : item.score > 60 && item.score < 70 ? 'bg-yellow-500' : 'bg-green-500'"
              />
              <div class="flex flex-col gap-2">
                <p>{{ item.name }}</p>
                <div class="flex text-gray-500 text-xs gap-2">
                  <p>学分: {{ item.credit }}</p>
                  <p>GPA: {{ item.gpa }}</p>
                </div>
              </div>
            </div>
            <p class="mr-6">
              {{ item.gpa === null ? '待评教' : item.score }}
            </p>
          </div>
        </div>
      </scroll-view>
    </div>
  </div>
</template>

<style lang='scss' scoped>

</style>

<script lang='ts' setup>
import { storeToRefs } from 'pinia'
import { computed, ref, shallowRef, watchEffect } from 'vue'
import { onPullDownRefresh } from '@dcloudio/uni-app'
import Toast from '@vant/weapp/lib/toast/toast'
import { getRandomQAQ } from 'qaq-font'
import Tabs from './tabs.vue'
import { formatScore, useScoreStore } from '@/store/score.store'
import BounceBall from '@/components/BounceBall/BounceBall.vue'
import RadarUCharts from '@/sub1/pages/score/course/radar-ucharts.vue'
import { tabs } from '@/shared/constant'
import { getSingleScoreSchoolRequest } from '@/server/api/score'
import type { RankMode } from '@/shared/types'
import type { ISingleScoreSchoolData } from '@/shared/types/response/single-score-school'
import type { SingleScoreDto } from '@/shared/types/response/sing-score'

const scoreStore = useScoreStore()

const {
  currentSelectedCourse,
  currentScoreData,
  homeActive,
  selectedSemesterData,
} = storeToRefs(scoreStore)

onPullDownRefresh(() => {
  scoreStore.getSingleScoreData()
})

const headMode = ref<'head' | 'max'>('head')
const rankMode = ref<RankMode>('major')
// 初始化，防止报错
const RankItem = {
  rank: 0,
  mine: 0,
  max: 0,
  avg: 0,
  head: 0,
  actualNum: 0,
}
const schoolRank = shallowRef<ISingleScoreSchoolData>({
  details: [],
  gpa: RankItem,
  score: RankItem,
  total: 0,
})

watchEffect(() => {
  if (rankMode.value === 'school') {
    const singleScoreDto: SingleScoreDto = {
      lessonId: currentSelectedCourse.value.lessonId,
      semesterId: selectedSemesterData.value.semesterInfo.semesterId,
    }
    getSingleScoreSchoolRequest(singleScoreDto).then(({ data }) => {
      schoolRank.value = data.data
    }).catch((error) => {
      Toast.fail({
        message: `获取成绩信息失败，去交流群问问吧~\n${getRandomQAQ('sadness')[0]}\n${error.message}`,
      })
    })
  }
})

const currentCourseDetail = computed(() => {
  const data = rankMode.value === 'major'
    ? currentScoreData.value.majorRank
    : rankMode.value === 'class'
      ? currentScoreData.value.classRank
      : schoolRank.value

  if (!data) {
    return {}
  }

  const score = homeActive.value === 'average'
    ? { ...data.score, myScore: currentSelectedCourse.value.score }
    : { ...data.gpa, myScore: currentSelectedCourse.value.gpa }

  const middleItem = {
    title: '专业平均',
    value: parseFloat(score.avg.toString()).toFixed(2),
    icon: 'friends-o',
  }

  const lastItem = {
    title: '前10%',
    value: parseFloat(score.head.toString()).toFixed(2),
    icon: 'fire-o',
  }

  if (headMode.value === 'max') {
    lastItem.value = parseFloat(score.max.toString()).toFixed(2)
    if (rankMode.value === 'major') {
      lastItem.title = '专业最高'
    } else if (rankMode.value === 'class') {
      lastItem.title = '教学班最高'
    } else {
      lastItem.title = '全校最高'
    }
  }

  if (rankMode.value === 'class') {
    middleItem.title = '教学班平均'
  } else if (rankMode.value === 'school') {
    middleItem.title = '全校平均'
  }

  return {
    score,
    details: data.details,
    total: data.total,
    detailInfo: [
      {
        title: '我的成绩',
        value: formatScore(score.myScore),
        icon: 'user-circle-o',
      },
      {
        ...middleItem,
      },
      {
        ...lastItem,
      },
    ],
  }
})

scoreStore.getSingleScoreData()

function changeHeadAndMax(index: number) {
  if (index === 2) {
    if (headMode.value === 'head') {
      headMode.value = 'max'
    } else {
      headMode.value = 'head'
    }
  }
}

</script>

<template>
  <van-toast id="van-toast" />
  <div class="w-[95vw] min-h-screen mx-auto py-5 relative flex flex-col gap-5 bg-[#E8EAF6] my-5 rounded-lg box-border px-3">
    <Card>
      <div class="flex flex-col gap-3 py-1">
        <div class="w-full flex justify-between">
          <div class="text-[#9FA8DA] text-sm">
            {{ currentSelectedCourse.name }}
          </div>
          <div class="flex">
            <div
              class="score-type"
              :class="homeActive === 'average' ? 'score-type-active' : ''"
              @click="scoreStore.setHomeActive('average')"
            >
              均分
            </div>
            <div
              class="score-type"
              :class="homeActive === 'gpa' ? 'score-type-active' : ''"
              @click="scoreStore.setHomeActive('gpa')"
            >
              GPA
            </div>
          </div>
        </div>
        <h3 class="font-semibold text-2xl text-white">
          {{ currentCourseDetail.score?.rank }} / {{ currentCourseDetail.total }}
        </h3>
        <Tabs v-model:activeKey="rankMode" :tabs="tabs" />
        <div class="bg-[#3F51B5] p-2 rounded-md flex">
          <div
            v-for="(item, index) in currentCourseDetail.detailInfo"
            :key="item.icon"
            class="flex flex-1 gap-2 relative"
            @click="changeHeadAndMax(index)"
          >
            <van-icon :name="item.icon" />
            <div class="flex-col gap-3 text-sm">
              <p class="text-[#9FA8DA]">
                {{ item.title }}
              </p>
              <p>{{ item.value }}</p>

              <BounceBall v-if="index === 2" class="absolute top-0 right-2" />
            </div>
          </div>
        </div>
      </div>
    </Card>
    <div class="mt-5 flex border-[1px] border-[#D3D7EE] rounded-md px-5 py-3 flex-col bg-white">
      <div class="mt-5 flex flex-col gap-5 text-[#616161]">
        <div class="w-full flex text-xs">
          <p class="flex-1">
            成绩类型
          </p>
          <p class="flex-1 text-center">
            分数
          </p>
          <p class="flex-1 text-center">
            排名
          </p>
        </div>
        <div>
          <div
            v-for="item in currentCourseDetail.details"
            :key="(item as any).details"
          >
            <div class="w-full flex text-black/85">
              <p
                v-for="(content, index) in [item.name, item.mine, `${item.rank}/${item.actualNum}`]"
                :key="(content as any).name"
                class="flex-1"
                :class="index > 0 ? 'center':''"
              >
                {{ content }}
              </p>
            </div>
            <van-divider />
          </div>
        </div>
        <div class="py-3">
          <RadarUCharts :scoreDetail="currentCourseDetail.details" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.center {
  @apply text-center;
}
</style>

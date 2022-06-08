<script lang='ts' setup>
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import { isNumber } from 'lodash'
import { onPullDownRefresh } from '@dcloudio/uni-app'
import { useScoreStore } from '@/store/score.store'
import BounceBall from '@/components/BounceBall/BounceBall.vue'

const scoreStore = useScoreStore()

const {
  currentSelectedCourse,
  currentScoreData,
  homeActive,
} = storeToRefs(scoreStore)

onPullDownRefresh(() => {
  scoreStore.getSingleScoreData()
})

const headMode = ref<'head' | 'max'>('head')

const currentCourseDetail = computed(() => {
  const data = currentScoreData.value.majorRank

  if (!data) {
    return {}
  }

  const score = homeActive.value === 'average'
    ? { ...data.score, myScore: currentSelectedCourse.value.score }
    : { ...data.gpa, myScore: currentSelectedCourse.value.gpa }

  const lastItem = {
    title: '前10%',
    value: parseFloat(score.head.toString()).toFixed(2),
    icon: 'fire-o',
  }

  if (headMode.value === 'max') {
    lastItem.title = '专业最高'
    lastItem.value = parseFloat(score.max.toString()).toFixed(2)
  }

  return {
    score,
    details: data.details,
    total: data.total,
    detailInfo: [
      {
        title: '我的成绩',
        value: isNumber(score.myScore) ? (score.myScore.toString()).toFixed(2) : score.myScore,
        icon: 'user-circle-o',
      },
      {
        title: '专业平均',
        value: parseFloat(score.avg.toString()).toFixed(2),
        icon: 'friends-o',
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
  <div class="w-[95vw] min-h-screen mx-auto py-5 relative flex flex-col gap-5 bg-[#E8EAF6] mt-5 rounded-lg box-border px-3">
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
        <div>
          <h3 class="font-semibold text-2xl text-white">
            {{ currentCourseDetail.score?.rank }} / {{ currentCourseDetail.total }}
          </h3>
        </div>
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
            :key="item.details"
          >
            <div class="w-full flex text-black/85">
              <p
                v-for="(content, index) in [item.name, item.mine, `${item.rank}/${currentScoreData.majorRank.total}`]"
                :key="content.name"
                class="flex-1"
                :class="index > 0 ? 'center':''"
              >
                {{ content }}
              </p>
            </div>
            <van-divider />
          </div>
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

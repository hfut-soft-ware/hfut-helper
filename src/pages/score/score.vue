<script lang='ts' setup>
import { storeToRefs } from 'pinia'
import { onPullDownRefresh } from '@dcloudio/uni-app'
import { onMounted } from 'vue'
import Settings from './settings.vue'
import { scoreKey, useScoreStore } from '@/store/score.store'
import Card from '@/components/Card/Card.vue'
import { isStorageEmpty } from '@/shared/hooks/use-syncStorage'
import BounceBall from '@/components/BounceBall/BounceBall.vue'
import AreaUCharts from '@/pages/score/area-ucharts.vue'
import { onNavigateClick } from '@/shared/utils/index'

const scoreStore = useScoreStore()
const {
  homeDetailMode,
  homeDetailInfo,
  homeActive,
  homeScoreData,
  semesterScoreData,
  isLoading,
} = storeToRefs(scoreStore)

onMounted(async() => {
  if (isStorageEmpty(scoreKey)) {
    scoreStore.getScoreStore(true)
  } else {
    // 后台静默刷新，免得用户觉得我们卡
    await scoreStore.getScoreStore(true, false).catch(() => {
      scoreStore.getScoreStore(false, false)
    })
  }
})

onPullDownRefresh(() => {
  scoreStore.getScoreStore(true).catch(() => {
    scoreStore.getScoreStore(false)
  })
})

function handleSemesterOpen(index: number) {
  scoreStore.setSelectedSemester(index)
  uni.navigateTo({
    url: '/sub1/pages/score/semester/semester',
  })
}

function changeMaxOrTop() {
  if (homeDetailMode.value === 'top') {
    homeDetailMode.value = 'max'
  } else {
    homeDetailMode.value = 'top'
  }
}
</script>

<template>
  <van-toast id="van-toast" />
  <Settings />
  <div class="w-[95vw] min-h-screen mx-auto py-5 relative flex flex-col gap-5 bg-[#E8EAF6] mt-5 rounded-lg box-border px-3">
    <Card>
      <div class="flex flex-col gap-3 py-1">
        <div class="w-full flex justify-between">
          <div class="text-[#9FA8DA] text-sm">
            专业排名(所有学期的总成绩)
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
        <div class="flex items-center gap-2">
          <span class="font-semibold text-2xl text-white">
            {{ homeScoreData.rank }} / {{ homeScoreData.total }}
          </span>
          <!-- 加载图标 -->
          <template v-if="isLoading">
            <van-loading :size="20" color="#ffffff" />
          </template>
        </div>
        <div
          class="bg-[#3F51B5] p-2 rounded-md flex"
          @click="changeMaxOrTop"
        >
          <div
            v-for="item in homeDetailInfo"
            :key="item.icon"
            class="flex flex-1 gap-2"
          >
            <van-icon :name="item.icon" />
            <div class="flex-col gap-3 text-sm">
              <p class="text-[#9FA8DA]">
                {{ item.title }}
              </p>
              <p>{{ item.value }}</p>
            </div>
          </div>
          <BounceBall class="absolute right-4" />
        </div>
      </div>
    </Card>
    <div class="relative mt-5 flex border-[1px] border-[#D3D7EE] rounded-md px-5 py-3 flex-col bg-white">
      <div class="py-3 bg-white z-[0]">
        <AreaUCharts />
      </div>

      <div class="flex justify-between items-center">
        <h3 class="font-semibold">
          成绩列表
        </h3>
        <div
          class="card-shadow bg-white rounded-full py-1 px-3 flex items-center"
          @click="onNavigateClick('/sub1/pages/mine/help/help?type=score')"
        >
          <img class="w-[20px] h-[20px]" src="../../assets/icons/astronaut.png">
          <p class="ml-2 text-sm">
            帮助
          </p>
        </div>
      </div>
      <div class="mt-5">
        <div
          v-for="item in semesterScoreData"
          :key="item.semesterInfo.semester"
          class="text-xs text-[#616161]"
          @click="handleSemesterOpen(item.index)"
        >
          <div class="w-full flex justify-between">
            <p>{{ item.semesterInfo.semester }}</p>
            <p>{{ item.data.rank }}/{{ item.data.total }}</p>
          </div>
          <van-divider />
        </div>
      </div>
      <p
        class="text-center text-sm text-[#3F51B5] font-semibold"
        @click="onNavigateClick('/sub1/pages/score/custom/custom')"
      >
        自定义排名<van-icon name="arrow" />
      </p>
    </div>
    <div
      class="card-shadow bg-white rounded-full py-2 px-5 flex items-center"
      @click="onNavigateClick('/sub1/pages/mine/failureRate/failureRate')"
    >
      <img class="w-[30px] h-[30px]" src="../../assets/icons/telescope.png">
      <p class="ml-2 text-sm">
        挂科率查询
      </p>
    </div>
    <div
      class="card-shadow bg-white rounded-full py-2 px-5 flex items-center"
      @click="onNavigateClick('/sub1/pages/score/convert/convert')"
    >
      <img class="w-[30px] h-[30px]" src="../../assets/icons/galaxy.png">
      <p class="ml-2 text-sm">
        成绩换算
      </p>
    </div>
  </div>
  <div class="mt-2 w-full flex justify-center text-xs text-black/80">
    成绩信息仅供参考，一切以教务系统为准。
  </div>
</template>

<style lang="scss" scoped>

</style>

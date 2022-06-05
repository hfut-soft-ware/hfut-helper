<script lang='ts' setup>
import { storeToRefs } from 'pinia'
import { onPullDownRefresh } from '@dcloudio/uni-app'
import { useScoreStore } from '@/store/score.store'
import Card from '@/components/Card/Card.vue'

const scoreStore = useScoreStore()
const {
  homeDetailInfo,
  homeActive,
  homeScoreData,
  semesterScoreData,
} = storeToRefs(scoreStore)

scoreStore.getScoreStore()

onPullDownRefresh(() => {
  scoreStore.getScoreStore()
})

function handleSemesterOpen(index: number) {
  scoreStore.setSelectedSemester(index)
  uni.navigateTo({
    url: '/pages/score/semester/semester',
  })
}
</script>

<template>
  <van-toast id="van-toast" />
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
        <div>
          <h3 class="font-semibold text-2xl text-white">
            {{ homeScoreData.rank }} / {{ homeScoreData.total }}
          </h3>
        </div>
        <div class="bg-[#3F51B5] p-2 rounded-md flex">
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
        </div>
      </div>
    </Card>
    <div class="mt-5 flex border-[1px] border-[#D3D7EE] rounded-md px-5 py-3 flex-col bg-white">
      <h3 class="font-semibold">
        成绩列表
      </h3>
      <div class="mt-5">
        <div
          v-for="item in semesterScoreData"
          :key="item"
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
    </div>
  </div>
  <div class="absolute bottom-3 w-full flex justify-center text-xs text-black/80">
    成绩信息仅供参考，一切以教务系统为准。
  </div>
</template>

<style lang="scss" scoped>

</style>

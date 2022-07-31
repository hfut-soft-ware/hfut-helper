<script lang='ts' setup>
import { watchEffect } from 'vue'
import { useCustom } from './use-custom'
import Card from '@/components/Card/Card.vue'
import { useScoreStore } from '@/store/score.store'
import BounceBall from '@/components/BounceBall/BounceBall.vue'

const store = useScoreStore()
const {
  selectedScore,
  customData,
  homeActive,
  detailInfo,
  semesters,
  changeHeadAndMax,
  handleQueryClick,
} = useCustom(store)

watchEffect(() => {
  console.log(semesters.value)
})

function toggle(course: any) {
  const courseName = course.name as string
  const selectedScoreVal = Array.from(selectedScore.value)
  console.log(course)
  if (selectedScoreVal.includes(courseName)) {
    const idx = selectedScoreVal.findIndex(item => item === courseName)
    selectedScoreVal.splice(idx, 1)
  } else {
    selectedScoreVal.push(courseName)
  }
  selectedScore.value = selectedScoreVal
}
</script>

<template>
  <van-toast id="van-toast" />
  <div class="fixed top-64 right-0 z-[1]">
    <div
      class="settings bg-[#3F51B5] text-lg w-[50px] h-[50px] flex justify-center items-center text-white rounded-l-full rounded-tr-full"
      @click="handleQueryClick"
    >
      <van-icon name="search" />
    </div>
  </div>
  <div class="w-[95vw] min-h-screen mx-auto py-5 relative flex flex-col gap-5 bg-[#E8EAF6] mt-5 rounded-lg box-border px-3">
    <Card>
      <div class="flex flex-col gap-3 py-1">
        <div class="w-full flex justify-between">
          <div class="text-[#9FA8DA] text-sm">
            自定义排名
          </div>
          <div class="flex">
            <div
              class="score-type"
              :class="homeActive === 'average' ? 'score-type-active' : ''"
              @click="store.setHomeActive('average')"
            >
              均分
            </div>
            <div
              class="score-type"
              :class="homeActive === 'gpa' ? 'score-type-active' : ''"
              @click="store.setHomeActive('gpa')"
            >
              GPA
            </div>
          </div>
        </div>
        <div>
          <h3 class="font-semibold text-2xl text-white">
            {{ customData.score.rank }} / {{ customData.total }}
          </h3>
        </div>
        <div class="bg-[#3F51B5] p-2 rounded-md flex">
          <div
            v-for="(item, index) in detailInfo"
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

    <van-checkbox-group :value="selectedScore">
      <div class="flex flex-col gap-5 mt-5">
        <div
          v-for="item in semesters"
          :key="item.semester"
          class="flex border-[1px] border-[#D3D7EE] rounded-md px-5 py-3 flex-col bg-white"
        >
          <h2 class="font-semibold">
            {{ item.semester }}
          </h2>
          <van-cell-group>
            <div class="mt-5 flex flex-col gap-2">
              <div
                v-for="score in item.scores"
                :key="score.name"
                @click="toggle(score)"
              >
                <van-cell
                  clickable
                  :title="score.name"
                  class="flex justify-between"
                >
                  <div class="flex justify-end">
                    <van-checkbox
                      :name="score.name"
                    />
                  </div>
                </van-cell>
              </div>
            </div>
          </van-cell-group>
        </div>
      </div>
    </van-checkbox-group>
  </div>
</template>

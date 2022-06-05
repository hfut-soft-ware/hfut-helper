<script lang='ts' setup>
import { storeToRefs } from 'pinia'
import { useScoreStore } from '@/store/score.store'

const scoreStore = useScoreStore()

const {
  currentSelectedCourse,
} = storeToRefs(scoreStore)
</script>

<template>
  <div class="w-[95vw] min-h-screen mx-auto py-5 relative flex flex-col gap-5 bg-[#E8EAF6] mt-5 rounded-lg box-border px-3">
    <Card>
      <div class="flex flex-col gap-3 py-1">
        <div class="w-full flex justify-between">
          <div class="font-semibold text-2xl text-white">
            {{ currentSelectedCourse.name }}
          </div>
          <!--          <div class="flex">-->
          <!--            <div-->
          <!--              class="score-type"-->
          <!--              :class="homeActive === 'average' ? 'score-type-active' : ''"-->
          <!--              @click="scoreStore.setHomeActive('average')"-->
          <!--            >-->
          <!--              均分-->
          <!--            </div>-->
          <!--            <div-->
          <!--              class="score-type"-->
          <!--              :class="homeActive === 'gpa' ? 'score-type-active' : ''"-->
          <!--              @click="scoreStore.setHomeActive('gpa')"-->
          <!--            >-->
          <!--              GPA-->
          <!--            </div>-->
          <!--          </div>-->
        </div>
        <h3 class="text-[#9FA8DA] text-sm">
          分数: {{ currentSelectedCourse.score }}
        </h3>
      </div>
    </Card>
    <div class="mt-5 flex border-[1px] border-[#D3D7EE] rounded-md px-5 py-3 flex-col bg-white">
      <h3 class="font-semibold">
        成绩列表
      </h3>
      <div class="mt-5">
        <div
          v-for="item in currentSelectedCourse.details"
          :key="item"
          class="text-xs text-[#616161]"
        >
          <div class="w-full flex justify-between">
            <p>{{ item.type }}</p>
            <p>{{ item.score }}</p>
          </div>
          <van-divider />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>

</style>

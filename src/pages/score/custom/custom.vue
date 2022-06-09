<script lang='ts' setup>
import { storeToRefs } from 'pinia'
import { computed, ref, watchEffect } from 'vue'
import Card from '@/components/Card/Card.vue'
import { useScoreStore } from '@/store/score.store'

const store = useScoreStore()
const { scoreData } = storeToRefs(store)

const semesters = computed(() => scoreData.value?.semesters)

const selectedScore = ref([])

function onScoreSelectedChange(evt: any) {
  selectedScore.value = evt.detail
}

watchEffect(() => {
  console.log(semesters.value)
  console.log(selectedScore.value.value2)
})
</script>

<template>
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
            0 / 0
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
    <div class="flex flex-col gap-5 mt-5">
      <div
        v-for="item in semesters"
        :key="item.semester"
        class="flex border-[1px] border-[#D3D7EE] rounded-md px-5 py-3 flex-col bg-white"
      >
        <h3 class="font-semibold">
          {{ item.semester }}
        </h3>
        <div class="mt-5 flex flex-col">
          <div v-for="score in item.scores" :key="score.name">
            <van-checkbox-group :value="selectedScore" @change="onScoreSelectedChange">
              <div class="flex justify-between">
                <p>{{ score.name }}</p>
                <van-checkbox :name="score.name" />
              </div>
            </van-checkbox-group>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>

</style>

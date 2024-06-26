<script lang='ts' setup>
import { onPullDownRefresh } from '@dcloudio/uni-app'
import { storeToRefs } from 'pinia'
import { TrainPlanKey, useTrainPlanStore } from './trainPlan.store'
import PlanProgress from './plan-progress.vue'
import { isStorageEmpty } from '@/shared/hooks/use-syncStorage'
import type { ITrainPlanData } from '@/shared/types/response/train-plan'

const store = useTrainPlanStore()

const { error, planData: data } = storeToRefs(store)

if (isStorageEmpty(TrainPlanKey)) {
  store.getTrainPlan()
}

onPullDownRefresh(() => {
  store.getTrainPlan()
})

function onPlanClick(payload: ITrainPlanData) {
  store.setSelectedPlan(payload)
  uni.navigateTo({
    url: '/sub1/pages/mine/train-plan/plan-detail',
  })
}
</script>

<template>
  <van-toast id="van-toast" />
  <template v-if="error">
    <van-empty :description="error" />
  </template>
  <template v-else-if="!data.credit">
    <van-empty description="你还没有培养方案呢" />
  </template>
  <template v-else>
    <div class="min-h-screen w-screen bg-gray-100">
      <div class="grid gap-3 p-3">
        <h3 class="font-bold text-center p-2">
          {{ data.name }}
        </h3>
        <div class="flex items-center text-gray-500 text-sm">
          <div class="flex gap-2 ">
            总学分: <p class="text-[#4981F9]">
              {{ data.credit }} / {{ data.requiredCredit }}
            </p>
          </div>
        </div>
        <template v-for="item in data.planTypes" :key="item.name">
          <div
            class="grid gap-3 card-shadow bg-white px-2 py-4 rounded-lg"
            @click="onPlanClick(item)"
          >
            <div class="flex justify-between">
              <div class="text-sm">
                <p>{{ item?.name }}</p>
                <div class="text-gray-500">
                  <p class="mt-2">
                    已修学分: {{ item?.credit }}/{{ item?.requiredCredit }} 学分
                  </p>
                  <p>要求学分: {{ item?.requiredCredit }}</p>
                </div>
              </div>
              <van-icon name="arrow" />
            </div>
            <PlanProgress :progress="item.progress" />
          </div>
        </template>
      </div>
    </div>
  </template>
</template>

<script lang='ts' setup>
import { storeToRefs } from 'pinia'
import { useTrainPlanStore } from '@/pages/mine/train-plan/trainPlan.store'
import PlanProgress from '@/pages/mine/train-plan/plan-progress.vue'

const store = useTrainPlanStore()

const { selectedPlan } = storeToRefs(store)

</script>

<template>
  <div class="w-screen min-h-screen py-3 w-[95vw] mx-auto">
    <div class="grid gap-2">
      <div class="grid gap-2">
        <p>{{ selectedPlan.name }}</p>
        <div class="flex text-sm mt-2">
          <p class="flex-1">
            学分: {{ selectedPlan.requiredCredit }} / {{ selectedPlan.credit }}
          </p>
          <p class="flex-1">
            课数: {{ selectedPlan.courseCount }}门
          </p>
          <p class="flex-1">
            要求学分: {{ selectedPlan.credit }}
          </p>
        </div>
        <div class="relative w-full">
          <PlanProgress :progress="selectedPlan.progress" />
        </div>
      </div>
      <div class="grid gap-2 mt-5">
        <div class="text-sm text-gray-500 grid gap-1">
          <p>计划课程</p>
          <div class="w-full h-[1px] bg-gray-200" />
        </div>
      </div>
      <div class="grid gap-3">
        <div
          v-for="item in selectedPlan.planCourses"
          :key="item.code"
          class="flex justify-between"
        >
          <div class="grid gap-2 w-10/12 px-2">
            <p>{{ item.name }}</p>
            <div class="flex justify-between text-gray-500 text-xs">
              <p>学分: {{ item.credits }}</p>
              <p>学期: {{ item.terms[0].replace('TERM_', '') }}</p>
            </div>
          </div>
          <div
            class="flex justify-center items-center text-2xl"
            :class="item.status === 'TAKING' ? 'taking' : item.status === 'PASSED' ? 'passed' : 'feature'"
          >
            <template v-if="item.status === 'PASSED'">
              <van-icon name="passed" />
            </template>
            <template v-if="item.status === 'TAKING'">
              <van-icon name="clock-o" />
            </template>
            <template v-if="item.status === 'UNREPAIRED'">
              <van-icon name="question-o" />
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.taking {
  @apply text-amber-300;
}

.passed {
  @apply text-green-300;
}

.feature {
  @apply text-gray-300;
}
</style>

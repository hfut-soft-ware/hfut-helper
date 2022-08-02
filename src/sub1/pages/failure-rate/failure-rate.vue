<script lang='ts' setup>
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { FailureRateTable } from './constant'
import { useFailureRateStore } from '@/store/failureRate.store'

const store = useFailureRateStore()

const { failureRateData, courseName } = storeToRefs(store)

onLoad(() => {
  store.getFailureRate()
})

const computedFailureRateData = computed(() => failureRateData.value.map((item) => {
  return {
    semester: item.semesterName,
    data: [item.semesterName, item.totalCount, item.avgScore.toFixed(2), item.failCount, `${(item.failRate * 100).toFixed(2)}%`],
  }
}))
</script>

<template>
  <van-toast id="van-toast" />
  <div v-if="failureRateData.length" class="mt-3 w-[100vw]">
    <h2 class="font-bold">
      {{ courseName }}
    </h2>
    <div class="mt-5">
      <div class="not-prose relative bg-slate-50 rounded-xl overflow-hidden dark:bg-slate-800/25">
        <div class="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]" style="background-position: 10px 10px;" /><div class="relative rounded-xl overflow-auto">
          <div class="shadow-sm overflow-hidden my-8">
            <div class="table border-collapse table-auto w-full text-sm">
              <div class="table-header-group">
                <div class="table-row">
                  <div
                    v-for="item in FailureRateTable.header"
                    :key="item"
                    class="table-cell border-b dark:border-slate-600 font-medium pt-0 pb-3 text-slate-400 dark:text-slate-200 text-center"
                  >
                    {{ item }}
                  </div>
                </div>
              </div>
              <div class="table-row-group bg-white dark:bg-slate-800">
                <div
                  v-for="rateData in computedFailureRateData"
                  :key="rateData.semester"
                  class="table-row"
                >
                  <div
                    v-for="item in rateData.data"
                    :key="item" class="table-cell border-b border-slate-100 dark:border-slate-700 p-2 text-slate-500 dark:text-slate-400"
                  >
                    {{ item }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="absolute inset-0 pointer-events-none border border-black/5 rounded-xl dark:border-white/5" />
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <van-empty description="新开的课程是没有挂科率数据的哦~" />
  </div>
</template>

<style lang='scss' scoped>

</style>

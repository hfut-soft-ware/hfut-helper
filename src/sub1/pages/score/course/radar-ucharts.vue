<script setup lang='ts'>
import { computed } from 'vue'
import UCharts from '@/components/qiun-data-charts/components/qiun-data-charts/qiun-data-charts.vue'
import type { Detail } from '@/shared/types/response/sing-score'
import type { Series } from '@/shared/types/utils'

type ScoreType = keyof Detail

const props = defineProps<{
  scoreDetail: Detail[] | undefined
}>()

const chartData = computed(() => {
  const scoreDetail = props.scoreDetail!
  const categories = scoreDetail.map(item => item.name)
  const series: Series[] = []

  const getScore = (scoreType: ScoreType) => {
    return scoreDetail.map(item => item[scoreType])
  }

  series.push({
    name: '我的',
    data: getScore('mine'),
    format: 'seriesFixed',
  },
  {
    name: '平均',
    data: getScore('avg'),
    format: 'seriesFixed',
  },
  {
    name: '最高',
    data: getScore('max'),
    format: 'seriesFixed',
  })

  return {
    categories,
    series,
  }
})

const opts = {
  color: ['#1890FF', '#91CB74', '#FAC858', '#EE6666', '#73C0DE', '#3CA272', '#FC8452', '#9A60B4', '#ea7ccc'],
  padding: [5, 5, 5, 5],
  legend: {
    position: 'top',
  },
  fontSize: 10,
  extra: {
    radar: {
      gridType: 'radar',
      gridColor: '#CCCCCC',
      gridCount: 3,
      max: 100,
      border: true,
    },
  },
}
</script>

<template>
  <UCharts v-if="scoreDetail" type="radar" :opts="opts" :chartData="chartData" :loadingType="0" />
</template>

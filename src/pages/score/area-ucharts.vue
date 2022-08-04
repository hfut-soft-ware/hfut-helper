<script setup lang='ts'>
import { storeToRefs } from 'pinia'
import { ref, watchEffect } from 'vue'
import { useScoreStore } from '@/store/score.store'
import UCharts from '@/components/qiun-data-charts/components/qiun-data-charts/qiun-data-charts.vue'
import { formatSemester } from '@/shared/utils/index'
import type { Include, Series } from '@/shared/types/utils'
import type { ICompulsoryRank, Score, Semester } from '@/shared/types/response/score'

const scoreStore = useScoreStore()

const { semesterScoreData, homeDetailMode, homeScoreRankDataType, homeActive } = storeToRefs(scoreStore)

// type HomeDetailMode = Include<Score, 'max' | 'head'>
type HomeScoreRankDataType = Include<Semester, 'compulsoryRank' | 'totalRank'>
type HomeActive = Include<ICompulsoryRank, 'gpa' | 'score'>
type ScoreType = keyof Score

const chartData = ref({
  categories: [] as string [],
  series: [] as Series[],
})

const opts = {
  fontSize: 10,
  xAxis: {
    disableGrid: true,
  },
  padding: [15, 15, 0, 15],
  yAxis: {
    gridType: 'dash',
    dashLength: 2,
  },
  extra: {
    area: {
      // type: 'curve',
      opacity: 0.4,
      addLine: true,
      width: 3,
      gradient: true,
    },
    tooltip: {
      borderRadius: 5,
    },
  },
  legend: {
    position: 'top',
  },
}

const _pushSeries = (series: Series[], data: Record<'name' | 'data', string | number[]> | Record<'name' | 'data', string | number[]>[]) => {
  if (!Array.isArray(data)) {
    data = [data]
  }

  data.forEach((item) => {
    series.push({
      ...item,
      format: 'seriesFixed',
      legendShape: 'circle',
    } as Series)
  })
}

watchEffect(() => {
  const chartDataVal = chartData.value
  const homeDetailModeVal = homeDetailMode.value
  const homeScoreRankDataTypeVal = homeScoreRankDataType.value
  const homeActiveVal = homeActive.value
  chartDataVal.categories = semesterScoreData.value.map((item) => {
    return formatSemester(item.semesterInfo.semester)
  }).reverse()
  const series = [] as Series[]

  const getScore = (homeScoreRankDataType: HomeScoreRankDataType, homeActive: HomeActive, scoreType: ScoreType) => {
    return semesterScoreData.value.map(item => item.semesterInfo[homeScoreRankDataType][homeActive][scoreType]).reverse()
  }

  const pushData = (homeScoreRankDataType: HomeScoreRankDataType, homeActive: HomeActive) => {
    _pushSeries(series, [
      { name: '我的', data: getScore(homeScoreRankDataType, homeActive, 'mine') },
      { name: '平均', data: getScore(homeScoreRankDataType, homeActive, 'avg') },
    ])
    if (homeDetailModeVal === 'top') {
      _pushSeries(series, {
        name: '前10%',
        data: getScore(homeScoreRankDataType, homeActive, 'head'),
      })
    } else {
      _pushSeries(series, {
        name: '最高',
        data: getScore(homeScoreRankDataType, homeActive, 'max'),
      })
    }
  }

  if (homeScoreRankDataTypeVal === 'compulsory') {
    if (homeActiveVal === 'average') {
      pushData('compulsoryRank', 'score')
    } else if (homeActiveVal === 'gpa') {
      pushData('compulsoryRank', 'gpa')
    }
  } else {
    if (homeActiveVal === 'average') {
      pushData('totalRank', 'score')
    } else if (homeActiveVal === 'gpa') {
      pushData('totalRank', 'gpa')
    }
  }

  chartDataVal.series = series
})

</script>

<template>
  <UCharts
    type="area"
    :opts="opts"
    :chartData="chartData"
    tooltipFormat="tooltipLine"
    :loadingType="0"
  />
</template>

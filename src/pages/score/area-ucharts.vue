<script setup lang='ts'>
import { storeToRefs } from 'pinia'
import { ref, watchEffect } from 'vue'
import { useScoreStore } from '@/store/score.store'
import UCharts from '@/components/qiun-data-charts/components/qiun-data-charts/qiun-data-charts.vue'
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
  xAxis: {
    disabled: true,
    // boundaryGap: 'justify',
  },
  yAxis: {
    disableGrid: true,
    splitNumber: 3,
  },
  extra: {
    area: {
      type: 'curve',
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
  // 不显示y轴对应的数据
  dataLabel: false,
  padding: [0, 0, 10, 0],
}

watchEffect(() => {
  const chartDataVal = chartData.value
  const homeDetailModeVal = homeDetailMode.value
  const homeScoreRankDataTypeVal = homeScoreRankDataType.value
  const homeActiveVal = homeActive.value
  chartDataVal.categories = semesterScoreData.value.map(item => item.semesterInfo.semester)
  const series = [] as Series[]

  const getScore = (homeScoreRankDataType: HomeScoreRankDataType, homeActive: HomeActive, scoreType: ScoreType) => {
    return semesterScoreData.value.map(item => item.semesterInfo[homeScoreRankDataType][homeActive][scoreType]).reverse()
  }

  const pushDate = (homeScoreRankDataType: HomeScoreRankDataType, homeActive: HomeActive) => {
    series.push(
      {
        name: '我的',
        data: getScore(homeScoreRankDataType, homeActive, 'mine'),
        format: 'seriesFixed',
        legendShape: 'circle',
        pointShape: 'none',
      }, {
        name: '平均',
        data: getScore(homeScoreRankDataType, homeActive, 'avg'),
        legendShape: 'circle',
        pointShape: 'none',
        format: 'seriesFixed',
      })
    if (homeDetailModeVal === 'top') {
      series.push({
        name: '前10%',
        data: getScore(homeScoreRankDataType, homeActive, 'head'),
        legendShape: 'circle',
        pointShape: 'none',
        format: 'seriesFixed',
      })
    } else {
      series.push({
        name: '最高',
        data: getScore(homeScoreRankDataType, homeActive, 'max'),
        legendShape: 'circle',
        pointShape: 'none',
        format: 'seriesFixed',
      })
    }
  }

  if (homeScoreRankDataTypeVal === 'compulsory') {
    if (homeActiveVal === 'average') {
      pushDate('compulsoryRank', 'score')
    } else if (homeActiveVal === 'gpa') {
      pushDate('compulsoryRank', 'gpa')
    }
  } else {
    if (homeActiveVal === 'average') {
      pushDate('totalRank', 'score')
    } else if (homeActiveVal === 'gpa') {
      pushDate('totalRank', 'gpa')
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

import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import Toast from '@vant/weapp/lib/toast/toast'
import { getRandomQAQ } from 'qaq-font'
import { isNumber } from 'lodash'
import { handleError } from '@/shared/utils/index'
import { getScoreRequest, getSingleScoreRequest } from '@/server/api/score'
import { useRef } from '@/shared/hooks/useRef'
import { useSyncStorage } from '@/shared/hooks/use-syncStorage'

import type { ICompulsoryRank, IScoreData, Score5, Semester } from '@/shared/types/response/score'
import type { ISingleScoreData, SingleScoreDto } from '@/shared/types/response/sing-score'

type TScore = {
  total: number
  rank: number
  score: number
  max: number
  top: number
  averageScore: number
}

type SemesterScore = {
  semesterInfo: Semester
  data: TScore
  index: number
}

type SingleScore = ISingleScoreData

export type ScoreCardActiveType = 'average' | 'gpa' | 'max'

function createScoreDetail(rankData: ICompulsoryRank, type: ScoreCardActiveType) {
  const total = rankData.total
  const data = type === 'average' ? rankData.score : rankData.gpa
  return {
    total,
    rank: data.rank,
    averageScore: data.avg,
    score: data.mine,
    max: data.max,
    top: data.head,
  }
}

export function formatScore(score: any) {
  if (isNumber(score)) {
    return score.toFixed(2)
  } else {
    const res = parseFloat(`${score}`).toFixed(2)
    return isNaN(res as any) ? score : res
  }
}

export const scoreKey = '__SCORE__'

export const [getScoreStorage, setScoreStorage, removeScoreStorage] = useSyncStorage<IScoreData>(scoreKey)

export const useScoreStore = defineStore('scoreStore', () => {
  const scoreData = ref<IScoreData>(getScoreStorage())
  const [homeActive, setHomeActive] = useRef<ScoreCardActiveType>('average')
  const [selectedSemester, setSelectedSemester] = useRef<number>(0)
  const [currentSelectedCourse, setCurrentSelectedCourse] = useRef<Score5>({} as Score5)
  const [currentScoreData, setCurrentScoreData] = useRef<SingleScore>({} as SingleScore)
  const isLoading = ref(false)

  const homeDetailMode = ref<'max' | 'top'>('top')
  const homeDetailInfo = computed(() => {
    const data = homeScoreData.value
    return [
      {
        title: '我的成绩',
        value: parseFloat(data.score.toString()).toFixed(2),
        icon: 'user-circle-o',
      },
      {
        title: '专业平均',
        value: parseFloat(data.averageScore.toString()).toFixed(2),
        icon: 'friends-o',
      },
      {
        title: homeDetailMode.value === 'top' ? '专业前10%' : '专业最高',
        value: parseFloat(((homeDetailMode.value === 'top' ? data.top : data.max).toString())).toFixed(2),
        icon: 'fire-o',
      },
    ]
  })

  const defaultData: TScore = {
    total: 0,
    rank: 0,
    score: 0,
    max: 0,
    top: 0,
    averageScore: 0,
  }

  const homeScoreRankDataType = ref<'all' | 'compulsory'>('compulsory')
  const homeScoreRankData = computed(() => homeScoreRankDataType.value === 'all' ? scoreData.value!.totalRank : scoreData.value!.compulsoryRank)
  const homeScoreData = computed<TScore>(() => {
    if (!scoreData.value) {
      return defaultData
    }
    return createScoreDetail(homeScoreRankData.value, homeActive.value)
  })

  const semesterScoreData = computed<SemesterScore[]>(() => {
    if (!scoreData.value) {
      return [{ semesterInfo: {}, data: defaultData, index: 0 }] as SemesterScore[]
    }
    return scoreData.value.semesters.map((item, index) => ({
      semesterInfo: item,
      data: createScoreDetail(item.compulsoryRank, homeActive.value),
      index,
    }))
  })

  const selectedSemesterData = computed(() => {
    return semesterScoreData.value[selectedSemester.value]
  })

  const getScoreStore = async(refresh = false, withTip = true) => {
    isLoading.value = true

    await getScoreRequest(refresh).then((res) => {
      if (withTip) {
        Toast.clear()
        Toast.success({
          message: `获取成绩信息成功！\n${getRandomQAQ('happy')[0]}`,
        })
      }
      uni.stopPullDownRefresh()
      const data = res.data.data
      scoreData.value = data
      setScoreStorage(data)
    }).catch((error) => {
      Toast.clear()
      uni.stopPullDownRefresh()
      if (withTip) {
        handleError(error, '获取成绩信息失败，去交流群问问吧~')
      }
      throw new Error('cannot get data')
    }).finally(() => {
      isLoading.value = false
    })
  }

  const getSingleScoreData = async() => {
    const singleScoreDto: SingleScoreDto = {
      lessonId: currentSelectedCourse.value.lessonId,
      semesterId: selectedSemesterData.value.semesterInfo.semesterId,
    }

    Toast.loading({
      duration: 0,
      message: `正在获取成绩信息...\n${getRandomQAQ('happy')[0]}`,
    })

    try {
      const { data: singleScoreRes } = await getSingleScoreRequest(singleScoreDto)
      setCurrentScoreData({
        ...singleScoreRes.data,
      })

      Toast.clear()
      Toast.success({
        message: `获取成绩信息成功！\n${getRandomQAQ('happy')[0]}`,
      })
      uni.stopPullDownRefresh()
    } catch (error: any) {
      uni.stopPullDownRefresh()
      handleError(error, '获取成绩信息失败，去交流群问问吧~')
    }
  }

  return {
    scoreData,
    homeDetailMode,
    homeDetailInfo,
    homeActive,
    homeScoreRankDataType,
    homeScoreData,
    isLoading,
    setHomeActive,
    getScoreStore,
    semesterScoreData,
    selectedSemester,
    setSelectedSemester,
    selectedSemesterData,
    currentSelectedCourse,
    setCurrentSelectedCourse,
    currentScoreData,
    getSingleScoreData,
  }
})

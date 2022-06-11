import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import Toast from '@vant/weapp/lib/toast/toast'
import { getRandomQAQ } from 'qaq-font'
import { isNumber } from 'lodash'
import { getScoreRequest, getSingleScoreRequest } from '@/server/api/score'
import type { IScore, MajorRankVo, Score, Semester } from '@/shared/types/response/score'
import { useRef } from '@/shared/hooks/useRef'
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
  data: {
    total: number
    rank: number
    averageScore: number
    score: number
    max: number
    top: number
  }
  index: number
}

export type ScoreCardActiveType = 'average' | 'gpa' | 'max'

function createScoreDetail(data: MajorRankVo, type: ScoreCardActiveType) {
  if (type === 'average') {
    return {
      total: data.total,
      rank: data.scoreRank,
      averageScore: data.majorAvgScore,
      score: data.myAvgScore,
      max: data.majorMaxScore,
      top: data.majorHeadScore,
    }
  } else {
    return {
      total: data.total,
      rank: data.gpaRank,
      averageScore: data.majorAvgGpa,
      score: data.myAvgGpa,
      max: data.majorMaxGpa,
      top: data.majorHeadGpa,
    }
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

export const useScoreStore = defineStore('scoreStore', () => {
  const scoreData = ref<IScore>()
  const [homeActive, setHomeActive] = useRef<ScoreCardActiveType>('average')
  const [selectedSemester, setSelectedSemester] = useRef<number>(0)
  const [currentSelectedCourse, setCurrentSelectedCourse] = useRef<Score>({} as Score)
  const [currentScoreData, setCurrentScoreData] = useRef<ISingleScoreData>({} as ISingleScoreData)

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
        title: '专业前10%',
        value: parseFloat(data.top.toString()).toFixed(2),
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

  const homeScoreData = computed<TScore>(() => {
    if (!scoreData.value) {
      return defaultData
    }
    return createScoreDetail(scoreData.value!.majorRankVO, homeActive.value)
  })

  const semesterScoreData = computed<SemesterScore[]>(() => {
    if (!scoreData.value) {
      return [{ semesterInfo: {}, data: defaultData, index: 0 }] as SemesterScore[]
    }
    return scoreData.value.semesters.map((item, index) => ({
      semesterInfo: item,
      data: createScoreDetail(item.semesterRankVO, homeActive.value),
      index,
    }))
  })

  const selectedSemesterData = computed(() => {
    return semesterScoreData.value[selectedSemester.value]
  })

  const getScoreStore = async() => {
    Toast.loading({
      duration: 0,
      forbidClick: true,
      message: `正在获取成绩信息...\n${getRandomQAQ('happy')[0]}`,
    })
    await getScoreRequest().then((res) => {
      Toast.clear()
      Toast.success({
        message: `获取成绩信息成功！\n${getRandomQAQ('happy')[0]}`,
      })
      uni.stopPullDownRefresh()
      scoreData.value = res.data.data
    }).catch(() => {
      Toast.clear()
      uni.stopPullDownRefresh()
      Toast.fail({
        message: `获取成绩信息失败，去交流群问问吧~\n${getRandomQAQ('sadness')[0]}`,
      })
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
    await getSingleScoreRequest(singleScoreDto).then((res) => {
      Toast.clear()
      Toast.success({
        message: `获取成绩信息成功！\n${getRandomQAQ('happy')[0]}`,
      })
      uni.stopPullDownRefresh()
      setCurrentScoreData(res.data.data)
    }).catch(() => {
      Toast.clear()
      uni.stopPullDownRefresh()
      Toast.fail({
        message: `获取成绩信息失败，去交流群问问吧~\n${getRandomQAQ('sadness')[0]}`,
      })
    })
  }

  const getCustomScoreData = async() => {}

  return {
    scoreData,
    homeDetailInfo,
    homeActive,
    homeScoreData,
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

import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import Toast from '@vant/weapp/lib/toast/toast'
import { getRandomQAQ } from 'qaq-font'
import { useDebounceFn } from '@vueuse/core'
import { handleError } from '@/shared/utils/index'
import { getCustomScoreRequest } from '@/server/api/score'
import { formatScore } from '@/store/score.store'
import type { ICustomScoreData } from '@/shared/types/response/score-custom'
import type { useScoreStore } from '@/store/score.store'
import type { Score5 as Score } from '@/shared/types/response/score'

export const CUSTOM_SCORE_DEFAULT_DATA = {
  avg: 0,
  head: 0,
  max: 0,
  mine: 0,
  rank: 0,
}

export function useCustom(store: ReturnType<typeof useScoreStore>) {
  // 存课程 id
  const selectedScore = ref<string[]>([])
  const queryData = ref<ICustomScoreData>()

  const headMode = ref<'head' | 'max'>('head')

  const { homeActive, scoreData } = storeToRefs(store)

  const lessons = computed(() => {
    const lessons: Score[] = []
    scoreData.value.semesters.forEach((semester) => {
      semester.scores.forEach((lesson) => {
        lessons.push(lesson)
      })
    })
    return lessons
  })

  const getCustomData = async() => {
    Toast.loading({
      duration: 0,
      message: `正在加载自定义排名数据中....\n${getRandomQAQ('happy')[0]}`,
    })
    const lessonIds = selectedScore.value.map(item => lessons.value.find(lesson => lesson.lessonId === item)!.lessonId)
    // const lessonNames = selectedScore.value.map(item => lessons.value.find(lesson => lesson.lessonId === item)!.name)
    await getCustomScoreRequest(lessonIds).then((res) => {
      queryData.value = res.data.data

      Toast.success({
        message: `加载成功！\n${getRandomQAQ('happy')[0]}`,
      })
    }).catch((error) => {
      handleError(error, '加载失败')
    }).finally(() => {
      setTimeout(() => {
        Toast.clear()
      }, 2000)
    })
  }

  const detailInfo = computed(() => {
    const data = customData.value

    const lastItem = {
      title: '前10%',
      value: parseFloat(data.score.head.toString()).toFixed(2),
      icon: 'fire-o',
    }

    if (headMode.value === 'max') {
      lastItem.title = '专业最高'
      lastItem.value = parseFloat(data.score.max.toString()).toFixed(2)
    }

    return [
      {
        title: '我的成绩',
        value: formatScore(data.score.mine),
        icon: 'user-circle-o',
      },
      {
        title: '专业平均',
        value: parseFloat(data.score.avg.toString()).toFixed(2),
        icon: 'friends-o',
      },
      {
        ...lastItem,
      },
    ]
  })

  const customData = computed(() => {
    if (!queryData.value) {
      return {
        score: CUSTOM_SCORE_DEFAULT_DATA,
        total: 0,
      }
    }

    const data = queryData.value!

    const res = {
      score: data.score || CUSTOM_SCORE_DEFAULT_DATA,
      total: data.total || 0,
    }

    if (homeActive.value === 'gpa') {
      res.score = data.gpa
    }

    return res
  })

  // 获取 semesters 并初始化，selectedScore
  const semesters = computed(() => {
    const semesters = scoreData.value?.semesters
    const payload: string[] = []

    semesters!.forEach((item) => {
      item.scores.forEach((score) => {
        if (score.lessonId.endsWith('B') || score.lessonId.endsWith('0X')) {
          payload.push(score.lessonId)
        }
      })
    })

    selectedScore.value = payload

    return semesters
  })

  const debouncedFn = useDebounceFn(() => {
    getCustomData()
  }, 300)

  const handleQueryClick = () => {
    if (!selectedScore.value.length) {
      Toast('请至少选择一个自定义课程')
      return
    }
    debouncedFn()
  }

  function changeHeadAndMax(index: number) {
    if (index === 2) {
      if (headMode.value === 'head') {
        headMode.value = 'max'
      } else {
        headMode.value = 'head'
      }
    }
  }

  return {
    selectedScore,
    customData,
    homeActive,
    detailInfo,
    semesters,
    changeHeadAndMax,
    handleQueryClick,
  }
}

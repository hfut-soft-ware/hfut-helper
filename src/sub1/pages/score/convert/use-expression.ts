import { ref, shallowRef, watch } from 'vue'
import Toast from '@vant/weapp/lib/toast/toast'
import { getRandomQAQ } from 'qaq-font'
import Fuse from 'fuse.js'
import { getTokenTips } from '@/server/api/score'

import type { Course } from '@/shared/types/response/token-tips'

const courseReg = /[\p{L}\w]+(（.+）)*(\(.+\))*/gu
const fuseOptions: Fuse.IFuseOptions<Course> = {
  keys: ['name'],
}

export function useExpression() {
  const expression = ref('')
  const tipList = shallowRef<Fuse.FuseResult<Course>[]>([])
  const tipShow = ref(false)

  let trainPlansFuse: Fuse<Course> | null = null
  let mineFuse: Fuse<Course> | null = null
  let prevMatchRes: RegExpMatchArray | null = null
  let tipClick = false
  let matchChangeIndex = 0

  watch(expression, (newVal: string) => {
    if (!trainPlansFuse || !mineFuse) {
      return
    }
    // 当点击提示按钮时，不进行提示
    if (tipClick) {
      tipClick = false
      return
    }
    const matchRes = newVal.match(courseReg)
    if (!matchRes) {
      return
    }
    // 匹配减少一项
    if (prevMatchRes && prevMatchRes.length > matchRes.length) {
      return
    }
    // 符号过滤
    if (prevMatchRes && isRegMatchEqual(prevMatchRes, matchRes)) {
      return
    }

    if (matchRes.length === 1) {
      tipList.value = trainPlansFuse.search(matchRes[0]).splice(0, 5)
    } else {
      if (!prevMatchRes) {
        return
      }
      const index = getCompareIndex(prevMatchRes, matchRes)
      matchChangeIndex = index
      tipList.value = mineFuse.search(matchRes[index]).splice(0, 5)
    }
    tipShow.value = true
    prevMatchRes = matchRes
  })

  getTokenTips().then(({ data }) => {
    trainPlansFuse = new Fuse(data.data.trainPlans, fuseOptions)
    mineFuse = new Fuse(data.data.mine, fuseOptions)
  }).catch(() => {
    Toast.fail(`糟糕，没有拿到信息\n ${getRandomQAQ('sadness')[0]}`)
  })

  const handleTipClick = (courseName: string) => {
    tipClick = true
    tipShow.value = false
    expression.value = strReplace(expression.value, prevMatchRes![matchChangeIndex], courseName)
  }

  const handleSymbolClick = (symbol: string) => {
    expression.value += symbol
  }

  const inputClear = () => {
    prevMatchRes = null
    matchChangeIndex = 0
    tipShow.value = false
  }

  const handleConfirm = () => {

  }

  return {
    expression,
    tipList,
    tipShow,
    tipClick,
    handleTipClick,
    handleSymbolClick,
    inputClear,
    handleConfirm,
  }
}

function getCompareIndex(prev: RegExpMatchArray, current: RegExpMatchArray): number {
  let res = 0
  current.forEach((value, index) => {
    if (value !== prev[index]) {
      res = index
    }
  })
  return res
}

function isRegMatchEqual(prev: RegExpMatchArray, current: RegExpMatchArray) {
  return current.every((value, index) => value === prev[index])
}

function strReplace(str: string, searchVal: string, replaceVal: string) {
  const index = str.indexOf(searchVal)
  const left = str.slice(0, index)
  const right = str.slice(index + searchVal.length)
  return left + replaceVal + right
}
